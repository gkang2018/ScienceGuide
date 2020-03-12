import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import InterestsCard from "./InterestsCard";

import { connect } from "react-redux";

import { addInterest } from "../actions/actions";

const ResearchInterests = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [isSelected, changeIsSelected] = useState(false);

  // const handleAddLevel = selectedLevel => {
  //   setSelectedLevels(oldArray => [
  //     ...oldArray,
  //     { id: Math.random().toString(), value: selectedLevel }
  //   ]);
  // };

  // const checkAddLevel = levelToCheck => {
  //   // check if the level to check is within
  //   let length = selectedLevels.length;
  //   for (let i = 0; i < length; i++) {
  //     if (selectedLevels[i].value === levelToCheck) {
  //       changeIsSelected(false);
  //       console.log(isSelected);
  //       console.log(selectedLevels);
  //     }
  //   }

  //   if (isSelected != true && length < 3) {
  //     handleAddLevel(levelToCheck);
  //     changeIsSelected(true);
  //     console.log(isSelected);
  //     console.log(selectedLevels);
  //   }
  // };

  const interestsData = [
    { interest: "math", image: "../assets/icon.png" },
    { interest: "science", image: "../assets/icon.png" },
    { interest: "physics", image: "../assets/icon.png" },
    { interest: "biology", image: "../assets/icon.png" }
  ];

  return (
    <View>
      <Text h1>Research Interests</Text>
      <Text h4> </Text>
      <FlatList
        data={interestsData}
        renderItem={({ item }) => (
          <InterestsCard interest={item.interest} image={item.image} />
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
