import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { Button } from "react-native-paper";

class ResearchAreas extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    firstInterest: "",
    secondInterest: "",
    thirdInterest: ""
  };

  componentDidMount() {
    this.setInterests();
  }

  // take our interests from redux store and populate them in our research area page

  setInterests() {
    this.props.interests.forEach((interest, index) => {
      switch (index) {
        case 0:
          this.setState({ firstInterest: interest.interest });
          break;
        case 1:
          this.setState({ secondInterest: interest.interest });
          break;
        case 2:
          this.setState({ thirdInterest: interest.interest });
          break;
      }
    });
  }

  matchMentors() {
    // retrieve database queries based on our three selected interests and the research level
    console.log("here");
  }

  render() {
    return (
      <View>
        <View style={styles.interestsContainer}>
          <Text>{this.state.firstInterest}</Text>
          <Text>{this.state.secondInterest}</Text>
          <Text>{this.state.thirdInterest}</Text>
          <Button onPress={this.matchMentors}>Match New Mentors</Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    interests: state.interests.selectedInterests
  };
};

const styles = StyleSheet.create({
  interestsContainer: {
    marginLeft: 20
  }
});

export default connect(mapStateToProps, null)(ResearchAreas);
