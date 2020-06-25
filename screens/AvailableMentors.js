import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";
import "@firebase/firestore";
import DatabaseService from "../config/firebase";
import MentorCard from "../components/MentorCard";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import matchMentor from "../actions/actions";
import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorData: undefined,
    };

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back"),
    });
    const { researchAreas, researchLevel, englishSpeaker } = this.props;
    if (!this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("DirectoryPage");
    }

    const db = new DatabaseService();
    let resp = db.getCuratedMentors(
      englishSpeaker,
      researchAreas,
      researchLevel
    );
    resp
      .then((value) => {
        this.setState({ mentorData: value });
      })
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorFetchingMentors"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  getMentorPic = () => {
      return require("../assets/default-avatar.png")
  }


  renderMentors() {
    return this.state.mentorData.map((m) => {
      // only for demo day: 
      let mentorPic = this.getMentorPic()
      return (
        <MentorCard
          navigation={this.props.navigation}
          id={m.id}
          key={m.email}
          name={m.name}
          email={m.email}
          job={m.job}
          expertise={m.researchAreas}
          imageUri={mentorPic}
          props={this.props}
        />
      );
    });
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

  render() {
    const { mentorData } = this.state;
    if (mentorData == undefined) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" animating={true} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            {this.localize.translate("availableMentors.title")}
          </Text>
          <Text style={styles.subHeading}>
            {this.localize.translate("availableMentors.subheading")}
          </Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.mentors}>{this.renderMentors()}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  heading: {
    height: "30%",
    // flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    height: "70%",
    //flex: 3.2,
    //paddingTop: '5%',
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'yellow'
  },
  title: {
    fontSize: RFPercentage(5),
    fontFamily: 'Montserrat',
    //marginTop: 100,
    fontWeight: "500",
    textAlign: "center",
  },
  subHeading: {
    fontSize: RFPercentage(2.75),
    marginTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontFamily: 'Montserrat',
    //marginLeft: 15,
    //marginRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mentors: {
    flex: 1,
    paddingTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    researchLevel: state.level.level,
    researchAreas: state.interests.selectedInterests,
    mentorName: state.mentorName.mentor,
    mentorId: state.mentorName.id,
    user: state.user.user,
    englishSpeaker: state.englishSpeaker.englishSpeaker,
  };
};

export default connect(mapStateToProps, null)(AvailableMentors);
