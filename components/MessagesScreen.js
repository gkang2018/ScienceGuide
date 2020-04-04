import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import DatabaseService from "../config/firebase";
import ChatCard from "./ChatCard";
import { connect } from "react-redux";

class MessagesScreen extends Component {
  constructor(props) {
    super(props);

    // pull the chatrooms that the user currently has
    this.state = {
      userChatRooms: []
    };

    this.db = new DatabaseService();
  }

  componentDidMount() {
    // fetch the mentors that the user will chat with
    this.db
      .getUsersChatRooms(this.props.user.uid)
      .then(chatRooms => {
        // we are going to populate our state with mentor name, mentor id, and last message between them if it exists
        chatRooms.forEach(id => {
          let split = id.split("-");
          // determine which is the user's id
          let otherUser = split[0] === this.props.user.id ? split[1] : split[0];
          this.db
            .lastMessageSent(this.props.user.uid, otherUser)
            .then(val => {
              let chat = {
                timestamp: val.timeStamp,
                lastMessage: val.lastMessage,
                recipientName: val.status,
                recipientID: val.recipientID
              };
              console.log(this.state.userChatRooms.length);
              if (this.state.userChatRooms.length === 0) {
                console.log("here");
                this.setState({
                  userChatRooms: [chat]
                });
              } else {
                this.setState(previousState => ({
                  userChatRooms: [previousState.userChatRooms, chat]
                }));
              }

              console.log(this.state.userChatRooms);
            })
            .catch(error => {
              // unable to fetch last message
              console.log(error);
            });
          // sort our state array
          let toSort = [...this.state.userChatRooms];
          toSort.sort((a, b) => b.timestamp - a.timestamp);
          this.setState({
            userChatRooms: toSort
          });
        });
      })
      .catch(error => {
        // unable to fetch available mentors
        console.log(error);
      });
  }

  render() {
    if (this.state.userChatRooms == []) {
      return (
        <View>
          <View style={styles.heading}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" animating={true} />
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Messages</Text>
        </View>
        <View>
          <FlatList
            data={this.state.userChatRooms}
            renderItem={({ item }) => (
              <ChatCard
                navigation={this.props.navigation}
                recipientName={item.recipientName}
                recipientID={item.recipientID}
                lastMessage={item.lastMessage}
                props={this.props}
              />
            )}
            keyExtractor={item => item.recipientID}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 50
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    mentor: state.mentorName,
    user: state.user
  };
};

export default connect(mapStateToProps, null)(MessagesScreen);
