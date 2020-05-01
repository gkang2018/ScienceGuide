import React, { Component } from "react";

import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import { addInterest, deleteInterest } from "../actions/actions";

class InterestsCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    // whether the user has selected this interest
    isSelected: false
  };

  handleSelect = () => {
    // determine if the user has already selected this interest, if so, remove from redux state, or add to redux state

    let addToArray = true;
    this.props.interests.forEach(interest => {
      if (interest === this.props.interest) {
        this.props.delete(this.props.interest);
        // local variable indicates whether we need to add to our redux selected interests array
        addToArray = false;
        this.setState({
          isSelected: false
        });
      }
    });
    if (addToArray) {
      this.props.add(this.props.interest);
      this.setState({
        isSelected: true
      });
    }
  };

  componentDidMount() {
    // checks if the user has pressed the back button without de-selecting interests
    this.props.interests.forEach(val => {
      if (val === this.props.interest) {
        this.setState({ isSelected: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.squareContainer}>
        <TouchableOpacity style={styles.squareTouchable}
          disabled={
            this.props.interests.length >= 3 && !this.state.isSelected
              ? true
              : false
          }
          onPress={this.handleSelect}
        >
          {/* <View style={this.state.isSelected ? styles.overlay : styles.defaultSquare}>
            <View>
              <Image source={this.props.image} />
            </View>
          </View> */}
          <Image style={this.state.isSelected ? styles.overlay : styles.defaultSquare} source={this.props.image} />
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
    add: interests => dispatch(addInterest(interests)),
    delete: interests => dispatch(deleteInterest(interests))
  };
};

const styles = StyleSheet.create({
  squareContainer: {
    //flex: 1,
    height: 180,
    width: 180,
    margin: 10,
    //backgroundColor: 'red',
    //flexDirection: 'row',
    justifyContent: 'center',
    //alignContent: 'center'
  },
  defaultSquare: {
    width: '98%',
    height: '98%',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    //backgroundColor: 'black'
    //marginLeft: 27,
    //marginBottom: 15
  },
  overlay: {
    borderColor: "#ffdd00",
    borderWidth: "1",
    //backgroundColor: 'red',
    width: '98%',
    height: '98%',
    borderWidth: 7,
    borderRadius: 20,
    //marginLeft: 27,
    //marginBottom: 15
  },
  squareTouchable: {
    height: '100%',
    width: '100%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
  // interestText: {
  //   //alignItems: "flex-end",
  //   //margin: '10%',
  //   marginLeft: 2,
  //   backgroundColor: 'yellow'
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestsCard);
