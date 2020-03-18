import React, { Component } from "react";

import {
  View,
  StyleSheet,
  useState,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

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
    this.props.interests.forEach(interest => {
      console.log(interest.interest, this.props.interest);
      if (interest.interest === this.props.interest) {
        this.props.delete(this.props.interest, this.props.id);
        this.props.toggle(this.props.interest, this.props.id);
        addToArray = false;
      }
    });
    if (addToArray) {
      this.props.add(this.props.interest, this.props.id);
    }
  };

  render() {
    return (
      <View
        style={
          this.props.interests.includes(this.props.interest)
            ? styles.overlay
            : styles.defaultSquare
        }
      >
        <TouchableOpacity onPress={this.handleSelect}>
          <Text>{this.props.interest}</Text>
          <View>
            <Image source={{ uri: this.props.image }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
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
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    width: 100,
    height: 100,
    borderWidth: 1,
    margin: 10
  },

  defaultSquare: {
    width: 100,
    height: 100,
    borderWidth: 1,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestsCard);
