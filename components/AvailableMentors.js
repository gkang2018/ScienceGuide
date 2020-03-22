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
          <Text>AvailableMentors</Text>
          <Text>Select one to proceed</Text>
        </View>
        <View style={styles.mentors}>
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
          />
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
          />
          <MentorCard
            name={"Gagandeep Kang"}
            job={"Software Developer"}
            expertise={"Technology"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 140,
    marginBottom: 20,
    marginLeft: 125
  },
  mentors: {}
});

export default AvailableMentors;
