import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

class ChatCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ChatRoom", {
            recipientName: this.props.recipientName,
            recipientID: this.props.recipientID,
          })
        }
      >
        <View style={styles.container}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.profileImage }}
          />
          <View style={styles.details}>
            <Text style={styles.recipient}>{this.props.recipientName}</Text>
            <Text style={styles.lastMessage}>{this.props.lastMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
  details: {
    marginLeft: 35,
    paddingTop: 20,
    marginRight: 125,
  },
  container: {
    borderWidth: 2,
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
  },
});

export default ChatCard;
