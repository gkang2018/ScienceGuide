import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'

class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)

  }

  handleLocalizationChange = () => {
    this.localize.setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      })
  }

  render() {

    if (this.props.user.type === "Mentor" && this.props.lastMessage === "") {
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
              <Text>{this.localize.translate("chatCard.matched")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    else {
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ChatCard);
