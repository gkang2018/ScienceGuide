import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import DatabaseService from "../config/firebase";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();

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
    RNLocalize.addEventListener("change", this.handleLocalizationChange);

    this.props.navigation.setOptions({
      headerTitle: this.recipientName,
      headerTransparent: true,
      headerBackTitle: this.localize.translate("icons.back"),
    });

    let chatID = this.db.getChatRoom(this.props.user.uid, this.recipientID);
    this.userName = this.props.user.name;
    // set the user name in our redux store so we have it

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
              user: { _id: doc.data().from, name: userName },
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
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    this.unsubscribe();
  }

  handleLocalizationChange = () => {
    this.localize
      .setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

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
