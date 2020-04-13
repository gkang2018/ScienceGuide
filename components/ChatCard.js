import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
            source={require("../assets/default-avatar.png")}
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
    marginLeft: "10%",
    paddingTop: 20,
  },
  recipient: {
    fontSize: RFPercentage(2.8),
    textAlign: "center",
    borderColor: "black",
    paddingBottom: "5%",
  },

  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
  },
});

export default ChatCard;
