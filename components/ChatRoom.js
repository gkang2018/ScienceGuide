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
  }

  componentDidMount() {
    this.db
      .getMessages(this.props.userID, "huFEL1uRzxFcNJYWMjS9")
      .then(val => {
        val.map(message => {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message)
          }));
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // figure out how to hold mentor IDs,
  // manually send it now

  onSend(messages) {
    this.db.sendMessage(messages, this.props.userID, "huFEL1uRzxFcNJYWMjS9");
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
