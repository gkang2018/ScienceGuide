import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import DatabaseService from "../config/firebase";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.props.navigation.setOptions({
      headerTitle: this.props.route.params.recipient,
      headerTransparent: true
    });

    // initialize db
    this.db = new DatabaseService();

    // initialize the unsubscribe function to be accessed later
  }

  componentDidMount() {
    let chatID = this.db.getChatRoom(this.props.userID, "huFEL1uRzxFcNJYWMjS9");

    this.unsubscribe = this.db.fire
      .collection("chats")
      .doc(chatID)
      .collection("messages")
      .onSnapshot(snapshot => {
        let parse = [];
        snapshot.forEach(doc => {
          parse.push({
            _id: doc.id,
            text: doc.data().text,
            time: new Date(doc.data().time),
            user: { _id: doc.data().from }
          });
        });
        parse.map(message => {
          console.log(message);
          // check that message id doesn't match others in state
          const shouldAdd = this.checkMessageDuplicate(message);
          if (shouldAdd) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message)
            }));
          }
        });
      });

    // this.db
    //   .getMessages(this.props.userID, "huFEL1uRzxFcNJYWMjS9")
    //   .then(val => {
    //     val.map(message => {
    //       this.setState(previousState => ({
    //         messages: GiftedChat.append(previousState.messages, message)
    //       }));
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
    this.db.sendMessage(messages, this.props.userID, "huFEL1uRzxFcNJYWMjS9");
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => this.onSend(message)}
        user={{ _id: this.props.userID }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.user.uid
  };
};

export default connect(mapStateToProps)(ChatRoom);
