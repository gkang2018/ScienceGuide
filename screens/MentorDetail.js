import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";
import DatabaseService from "../config/firebase";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'


class MentorDetail extends Component {
  constructor(props) {
    super(props);

    this.db = new DatabaseService();
    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back")
    })

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


  // checks if javascript object is empty
  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  onPress(id, name) {
    if (this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("Signup");
    } else {
      // check if chat already exists
      this.db
        .chatExists(this.props.user.uid, id)
        .then((resp) => {
          console.log(resp);
          if (resp !== true) {
            this.db
              .createChatRoom(this.props.user.uid, id)
              .then(() => {
                this.db.appendChatToUser(this.props.user.uid, id);
                this.props.navigation.navigate("ChatRoom", {
                  recipientName: name,
                  recipientID: id,
                });
              })
              .catch((error) => {
                Snackbar.show({
                  text: this.localize.translate("snackbar.errorStartChat"),
                  backgroundColor: "red",
                  duration: Snackbar.LENGTH_LONG,
                });
                console.log(error);
              });
          }
          this.props.navigation.navigate("ChatRoom", {
            recipientName: name,
            recipientID: id,
          });
        })
        .catch((error) => {
          console.log("unable to determine chat existence");
          Snackbar.show({
            text: this.localize.translate("snackbar.errorStartChat"),
            backgroundColor: "red",
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
  }

  renderResearchAreas() {
    let { expertise } = this.props.route.params;
    // expertise = expertise.split(",");
    return expertise.map((e) => {
      return (
        <View key={e} style={styles.researchArea}>
          <Text style={styles.researchText}>{e}</Text>
        </View>
      );
    });
  }

  render() {
    const {
      name,
      job,
      email,
      expertise,
      imageUri,
      id,
    } = this.props.route.params;
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>{this.localize.translate("mentorDetail.title")}</Text>
        </View>

        <View style={styles.details}>
          <Image style={styles.imageStyle} source={{ uri: imageUri }} />
          <View style={styles.generalInfo}>
            <Text style={styles.subHeading}>{name}</Text>
            <Text style={styles.text}>{job}</Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => this.onPress(id, name)}>
            <Text style={styles.button}>{this.localize.translate("mentorDetail.chat")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.researchAreas}>
          <Text style={styles.subHeading2}>{this.localize.translate("mentorDetail.areas")}:</Text>
          {this.renderResearchAreas()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 80,
  },
  buttonView: {
    marginLeft: 155,
    marginRight: 40,
    paddingTop: 66,
  },
  subHeading: {
    fontSize: 20,
  },
  subHeading2: {
    fontSize: 20,
    paddingBottom: 15,
  },
  researchAreas: {
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  researchArea: {
    marginBottom: 30,
    borderWidth: 1,
  },
  researchText: {
    fontSize: 15,
    paddingBottom: 12,
    paddingTop: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  generalInfo: {
    marginTop: 20,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 35,
    paddingBottom: 10,
    marginRight: 125,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
  button: {
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(MentorDetail);
