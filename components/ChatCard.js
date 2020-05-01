import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";

class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
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
  getMentorPic = (name) => {
    switch(name) {
      case "Juan Rivera": 
        return require("../assets/juan_rivera.jpg")
      case "Rosalinda Flores": 
        return require("../assets/rosalinda_flores.jpg")
      case "Alexandra Gómez": 
        return require("../assets/alexandra_gomez.jpg")
      case "Roberto Ramírez": 
        return require("../assets/roberto_ramirez.jpg")
      case "Angela Pérez": 
        return require("../assets/angela_perez.jpg")
      default: 
        return require("../assets/default-avatar.png")
    }
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
              <Text style={styles.matched}>{this.localize.translate("chatCard.matched")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
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
              source={this.getMentorPic(this.props.recipientName)}
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
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    //marginBottom: 5,
    //backgroundColor: 'yellow'
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    borderWidth: 0.5,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 10,
    //backgroundColor: 'green'
  },
  details: {
    flex: 1,
    //marginLeft: "10%",
    paddingTop: 20,
    //backgroundColor: 'pink'
  },
  recipient: {
    fontSize: RFPercentage(2.8),
    fontFamily: 'Montserrat',
    fontWeight: "400",
    paddingBottom: "5%",
    //backgroundColor: 'green'
  },
  lastMessage: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Montserrat',
    //width: '80%',
    //backgroundColor: 'blue'
  },
  matched: {
    fontWeight: '600',
    fontFamily: 'Montserrat-Italic',
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ChatCard);
