import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import DatabaseService from "../config/firebase";
import MentorCard from "./MentorCard";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorData: {},
    };
  }

  componentDidMount() {
    this.fetchMentorData().done();
  }

  async fetchMentorData() {
    const firebase = new DatabaseService();
    const response = await firebase.getAllMentors();
    console.log(response);
    this.setState({mentorData: response});
  }

  renderMentors() {
    return this.state.mentorData.map((m) => {
      return (
        <MentorCard
            name={m.name}
            email={m.email}
            expertise={m.researchArea}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
        />
      );
    });
  }

  render() {
    
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Available Mentors</Text>
          <Text style={styles.subHeading}>Select one to proceed</Text>
        </View>
        <View style={styles.mentors}>
        </View>
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

export default AvailableMentors;
