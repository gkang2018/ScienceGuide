import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet, useState } from "react-native";

import { connect } from "react-redux";

import { addInterest } from "../actions/actions";

const InterestsCard = (props, { navigation }) => {
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: props.image }} />
        <Card.Title title={props.interest} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button
            onPress={() => {
              props.add(props.interest);
            }}
          >
            Select
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    interests: state.interests.selectedInterests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: interests => dispatch(addInterest(interests))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestsCard);
