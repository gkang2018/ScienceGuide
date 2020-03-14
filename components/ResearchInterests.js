import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Title, Subheading } from "react-native-paper";
import InterestsCard from "./InterestsCard";

import { connect } from "react-redux";

import { addInterest } from "../actions/actions";

const ResearchInterests = props => {
  const interestsData = [
    { id: 0, interest: "math", image: "../assets/icon.png" },
    { id: 1, interest: "science", image: "../assets/icon.png" },
    { id: 2, interest: "physics", image: "../assets/icon.png" },
    { id: 3, interest: "biology", image: "../assets/icon.png" }
  ];

  // render text

  let subText = "";

  switch (props.interests.length) {
    case 1:
      subText = "Select two more research areas you are interested in";
    case 2:
      subText = "Select one more research area you are interested in";
    case 3:
      subText = "You may review your selections in the next screen";
    default:
      subText = "Select up to three research areas you are interested in";
  }

  return (
    <View>
      <View style={styles.title}>
        <Title>Research Interests</Title>
      </View>
      <Subheading>{subText}</Subheading>
      <FlatList
        style={{ width: "100%" }}
        data={interestsData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <InterestsCard
              interest={item.interest}
              id={item.id}
              image={item.image}
            />
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    interests: state.interests.selectedInterests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: interests => dispatch(addInterest(interests))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchInterests);

const styles = StyleSheet.create({
  title: {
    marginRight: 100
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  }
});
