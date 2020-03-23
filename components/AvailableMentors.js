import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import DatabaseService from "../config/firebase";
import MentorCard from "./MentorCard";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const dbb = new DatabaseService();
    // let data = dbb.getAllMentors();
    // console.log(data);
  }

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Available Mentors</Text>
          <Text style={styles.subHeading}>Select one to proceed</Text>
        </View>
        <View style={styles.mentors}>
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
          />
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
          />
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
          />
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
