import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet, useState } from "react-native";

import { connect } from "react-redux";

import { addInterest, toggleInterest } from "../actions/actions";

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
              props.add(props.interest, props.id);
              props.toggle(props.interest, props.id);
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
    add: (interests, id) => dispatch(addInterest(interests, id)),
    toggle: (interests, id) => dispatch(toggleInterest(interests, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestsCard);
