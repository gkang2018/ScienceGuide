import React, { Component } from "react";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatCard from "./ChatCard";

class MessagesScreen extends Component {
  constructor(props) {
    super(props);

    // pull the chatrooms that the user currently has
    this.state = {
      userChatRooms: ["", "", "", ""]
    };
  }

  render() {
    if (this.state.userChatRooms == undefined) {
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
              <ChatCard recipient={"Gagan"} lastMessage={"Hello World "} />
            )}
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

export default MessagesScreen;
