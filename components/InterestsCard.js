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

    let shouldKeepStyle = "";
  }

  state = {
    isSelected: false
  };

  handleSelect = () => {
    let addToArray = true;
    this.props.interests.forEach(interest => {
      if (interest.interest === this.props.interest) {
        this.props.delete(this.props.interest, this.props.id);
        addToArray = false;
        this.setState({
          isSelected: false
        });
      }
    });
    if (addToArray) {
      this.props.add(this.props.interest, this.props.id);
      this.setState({
        isSelected: true
      });
    }
  };

  componentDidMount() {
    console.log(this.props.interests);
    this.props.interests.forEach(val => {
      if (val.interest === this.props.interest) {
        this.setState({ isSelected: true });
      }
    });
  }

  render() {
    return (
      <View
        style={this.state.isSelected ? styles.overlay : styles.defaultSquare}
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
  return {
    interests: state.interests.selectedInterests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: (interests, id) => dispatch(addInterest(interests, id)),
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
