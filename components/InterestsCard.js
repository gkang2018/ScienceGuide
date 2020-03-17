import React, { Component } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet, useState } from "react-native";

import { connect } from "react-redux";

import {
  addInterest,
  toggleInterest,
  deleteInterest
} from "../actions/actions";

class InterestsCard extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect = () => {
    let addToArray = true;
    this.props.interests.forEach((isCompleted, thisID) => {
      if (thisID === this.props.id) {
        if (isCompleted) {
          this.props.delete(this.props.interest, thisID);
          this.props.toggle(this.props.interest, thisID);
          addToArray = false;
        }
      }
    });
    if (addToArray) {
      this.props.add(this.props.interest, this.props.id);
      this.props.toggle(this.props.interest, this.props.id);
    }
  };

  render() {
    return (
      <View style={this.props.interests[this.props.id] ? styles.overlay : null}>
        <Card>
          <Card.Cover source={{ uri: this.props.image }} />
          <Card.Title title={this.props.interest} />
          <Card.Actions>
            <Button onPress={this.handleSelect}>Select</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

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
