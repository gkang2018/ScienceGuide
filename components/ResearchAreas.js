import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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

  // take our interests from redux store and populate them in our research area page

  setInterests() {
    this.props.interests.forEach((interest, index) => {
      switch (index) {
        case 0:
          this.setState({ firstInterest: interest });
          break;
        case 1:
          this.setState({ secondInterest: interest });
          break;
        case 2:
          this.setState({ thirdInterest: interest });
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
          <View style={styles.heading}>
            <Text style={styles.title}>Top 3</Text>
            <Text style={styles.subheading}>Research Areas</Text>
          </View>
          <View style={styles.areasContainer}>
            <View style={styles.firstArea}>
              <Text style={styles.firstInterest}>
                {this.state.firstInterest}
              </Text>
            </View>
            <View style={styles.secondArea}>
              <Text style={styles.secondInterest}>
                {this.state.secondInterest}
              </Text>
            </View>

            <View style={styles.thirdArea}>
              <Text style={styles.thirdInterest}>
                {this.state.thirdInterest}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AvailableMentors")}
          >
            <View style={styles.matchButton}>
              <Text style={styles.matchText}>Match New Mentors</Text>
            </View>
          </TouchableOpacity>
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
  },
  heading: {
    marginTop: 75,
    marginLeft: 120,
    marginBottom: 60
  },
  title: {
    fontSize: 30,
    fontWeight: "600"
  },
  subheading: {
    fontSize: 20,
    fontWeight: "500"
  },
  areasContainer: {
    flexDirection: "row"
  },
  firstArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2
  },
  secondArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2
  },
  thirdArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2
  },
  firstInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },
  secondInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },
  thirdInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },
  matchButton: {
    width: 125,
    height: 125,
    borderWidth: 1,
    borderRadius: 125 / 2,
    marginLeft: 115,
    marginTop: 25
  },
  matchText: {
    paddingLeft: 20,
    paddingTop: 50,
    fontSize: 15,
    fontWeight: "700"
  }
});

export default connect(mapStateToProps, null)(ResearchAreas);
