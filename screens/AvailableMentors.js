import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";
import "@firebase/firestore";
import DatabaseService from "../config/firebase";
import MentorCard from "../components/MentorCard";
import matchMentor from "../actions/actions";
import { connect } from "react-redux";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorData: undefined,
    };
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentDidMount() {
    if (!this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("DirectoryPage");
    }
    const { researchAreas, researchLevel } = this.props;
    const { englishSpeaker } = this.props.route.params;

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
          text: error.message,
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  renderMentors() {
    return this.state.mentorData.map((m) => {
      return (
        <MentorCard
          navigation={this.props.navigation}
          id={m.id}
          key={m.email}
          name={m.name}
          email={m.email}
          job={m.job}
          expertise={m.researchAreas}
          imageUri={"https://reactnative.dev/img/tiny_logo.png"}
          props={this.props}
        />
      );
    });
  }

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
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Available Mentors</Text>
          <Text style={styles.subHeading}>Select one to proceed</Text>
        </View>
        <View style={styles.mentors}>{this.renderMentors()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  heading: {
    marginTop: 90,
    marginBottom: 50,
    marginLeft: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray",
  },
});

const mapStateToProps = (state) => {
  return {
    researchLevel: state.level.level,
    researchAreas: state.interests.selectedInterests,
    mentorName: state.mentorName.mentor,
    mentorId: state.mentorName.id,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(AvailableMentors);
