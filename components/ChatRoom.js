import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import DatabaseService from "../config/firebase";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

    this.props.navigation.setOptions({
      headerTitle: this.props.route.params.recipientName,
      headerTransparent: true,
    });

    this.recipientName = this.props.route.params.recipientName;
    this.recipientID = this.props.route.params.recipientID;

    // initialize db
    this.db = new DatabaseService();

    // grab user name
    this.userName = "";
    // initialize the unsubscribe function to be accessed later
    this.unsubscribe = undefined;
  }

  componentDidMount() {
    let chatID = this.db.getChatRoom(this.props.user.uid, this.recipientID);
    let fetchName = this.db
      .getRecipientName(this.props.user.uid)
      .then((val) => {
        this.userName = val;
        this.unsubscribe = this.db.fire
          .collection("chats")
          .doc(chatID)
          .collection("messages")
          .onSnapshot((snapshot) => {
            let parse = [];
            snapshot.forEach((doc) => {
              if (doc.data().time != null) {
                let userName =
                  doc.data().from === this.props.user.uid
                    ? this.userName
                    : this.recipientName;
                parse.push({
                  _id: doc.id,
                  text: doc.data().text,
                  createdAt: doc.data().time.toDate(),
                  user: { _id: doc.data().from, name: this.userName },
                });
              }
            });
            parse.map((message) => {
              // check that message id doesn't match others in state
              const shouldAdd = this.checkMessageDuplicate(message);

              if (shouldAdd) {
                this.setState((previousState) => ({
                  messages: GiftedChat.append(previousState.messages, message),
                }));
                // sorted the array of messages

                const { messages } = this.state;
                messages.sort((a, b) => b.createdAt - a.createdAt);
                this.setState({
                  messages: messages,
                });
              }
            });
          });
      })
      .catch((error) => {
        console.log("Unable to fetch the current user's name");
      });
  }

  checkMessageDuplicate(message) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i]._id === message._id) {
        return false;
      }
    }
    return true;
  }

  // figure out how to hold mentor IDs,
  // manually send it now

  onSend(messages) {
    this.db.sendMessage(messages, this.props.user.uid, this.recipientID);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => this.onSend(message)}
        user={{ _id: this.props.user.uid }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatRoom);
