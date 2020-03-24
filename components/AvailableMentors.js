import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import "@firebase/firestore";
import DatabaseService from "../config/firebase";
import MentorCard from "./MentorCard";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorData: undefined
    };
  }

  componentDidMount() {
    const db = new DatabaseService();
    let resp = db.fetchMentors();
    resp.then(value => {
      console.log(value);
      this.setState({ mentorData: value });
    });
  }

  renderMentors() {
    return this.state.mentorData.map(m => {
      return (
        <MentorCard
          navigation={this.props.navigation}
          key={m.email}
          name={m.name}
          email={m.email}
          expertise={m.researchArea}
          imageUri={"https://reactnative.dev/img/tiny_logo.png"}
        />
      );
    });
  }

  render() {
    const { mentorData } = this.state;
    if (mentorData == undefined) {
      return <Spinner visible={true} textContent={"Loading..."} />;
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
  heading: {
    marginTop: 90,
    marginBottom: 50,
    marginLeft: 80
  },
  title: {
    fontSize: 30,
    fontWeight: "600"
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray"
  }
});

const mapStateToProps = state => {
  return {
    mentor: state.mentorName.mentor
  };
};

export default connect(mapStateToProps, null)(AvailableMentors);
