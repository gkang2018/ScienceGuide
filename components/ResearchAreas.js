import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { connect } from "react-redux";

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

  render() {
    return (
      <View>
        <Text>{this.state.firstInterest}</Text>
        <Text>{this.state.secondInterest}</Text>
        <Text>{this.state.thirdInterest}</Text>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate("AvailableMentors")}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    interests: state.interests.selectedInterests
  };
};

export default connect(mapStateToProps, null)(ResearchAreas);
