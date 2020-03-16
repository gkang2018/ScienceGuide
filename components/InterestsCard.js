import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet, useState } from "react-native";

import { connect } from "react-redux";

import {
  addInterest,
  toggleInterest,
  deleteInterest
} from "../actions/actions";

const InterestsCard = (props, { navigation }) => {
  const handleSelect = () => {
    let addToArray = true;
    props.interests.forEach((isCompleted, thisID) => {
      if (thisID === props.id) {
        if (isCompleted) {
          props.delete(props.interest, thisID);
          props.toggle(props.interest, thisID);
          addToArray = false;
        }
      }
    });
    if (addToArray) {
      props.add(props.interest, props.id);
      props.toggle(props.interest, props.id);
    }
  };

  return (
    <View style={props.interests[props.id] ? styles.overlay : null}>
      <Card>
        <Card.Cover source={{ uri: props.image }} />
        <Card.Title title={props.interest} />
        <Card.Actions>
          <Button onPress={handleSelect}>Select</Button>
        </Card.Actions>
      </Card>
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
    add: (interests, id) => dispatch(addInterest(interests, id)),
    toggle: (interests, id) => dispatch(toggleInterest(interests, id)),
    delete: (interests, id) => dispatch(deleteInterest(interests, id))
  };
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestsCard);
