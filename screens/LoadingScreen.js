import React, { Component } from "react";
import DatabaseService from "../config/firebase";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'
import { connect } from "react-redux";
import {
  addInterest,
  addLevel,
  selectMentor,
  update,
  englishSpeaker,
} from "../actions/actions";
import Snackbar from "react-native-snackbar";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.db = new DatabaseService();
    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }


  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)

    this.db.auth.onAuthStateChanged((user) => {
      if (user) {
        // TODO: determine if credentials are for user or mentor
        // checks if redux store is empty

        if (this.props.selectedInterests.length == 0) {
          let resp = this.db.getUserData(user.uid);
          resp
            .then((userData) => {
              // populate the redux store with database
              let update = {
                uid: user.uid,
                email: user.email,
                name: userData.name,
                type: userData.type,
              };
              this.props.update(update);
              this.populateReduxStore(userData);
              this.props.navigation.navigate("DirectoryPage");
            })
            .catch((error) => {
              console.log(error);
              console.log("Unable to fetch student credentials");
              Snackbar.show({
                text: this.localize.translate("snackbar.failedUserCredentials"),
                backgroundColor: "red",
                duration: Snackbar.LENGTH_LONG,
              });
            });
        }
      } else {
        this.props.navigation.navigate("Home");
      }
    });
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

  populateReduxStore(student) {
    // check to see that our store doesn't already have these values populated
    if (this.props.selectedInterests.length == 0 && student.type !== "Mentor") {
      for (let i = 0; i < student.researchAreas.length; i++) {
        this.props.addInterest(student.researchAreas[i]);
      }
      this.props.selectMentor(student.mentorName, student.mentorId);
      this.props.addLevel(student.skillLevel);
      let englishSpeaker = student.englishSpeaker === true ? true : false;
      this.props.englishSpeaker(englishSpeaker);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedInterests: state.interests.selectedInterests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInterest: (interest) => dispatch(addInterest(interest)),
    addLevel: (level) => dispatch(addLevel(level)),
    englishSpeaker: (proficiency) => dispatch(englishSpeaker(proficiency)),
    selectMentor: (mentor, id) => dispatch(selectMentor(mentor, id)),
    update: (user) => dispatch(update(user)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
