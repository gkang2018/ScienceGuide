import React, { useState, useLayoutEffect, Component } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { Title, Subheading } from "react-native-paper";
import InterestsCard from "./InterestsCard";

import { connect } from "react-redux";

class ResearchInterests extends Component {
  state = {
    subText: "Select up to three research areas you are interested in"
  };

  // fix rendering the subtext

  componentDidMount() {
    this.changeSubText();
  }
  componentDidUpdate(prevProps) {
    if (this.props.interests.length != prevProps.interests.length) {
      this.changeSubText();
    }
  }

  changeSubText() {
    switch (this.props.interests.length) {
      case 1:
        this.setState({
          subText: "Select two more research areas you are interested in"
        });
      case 2:
        this.setState({
          subText: "Select one or more research area you are interested in"
        });
      case 3:
        this.setState({
          subText: "You may review your selections in the next screen"
        });
      default:
        this.setState({
          subText: "Select up to three research areas you are interested in"
        });
    }
  }

  render() {
    const interestsData = [
      { id: 0, interest: "math", image: "../assets/icon.png" },
      { id: 1, interest: "science", image: "../assets/icon.png" },
      { id: 2, interest: "physics", image: "../assets/icon.png" },
      { id: 3, interest: "biology", image: "../assets/icon.png" }
    ];
    return (
      <View>
        <View style={styles.title}>
          <Title>Research Interests</Title>
        </View>
        <Subheading>{this.subText}</Subheading>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate("Areas")}
        />
        <FlatList
          style={{ width: "100%" }}
          data={interestsData}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <InterestsCard
                interest={item.interest}
                id={item.id}
                image={item.image}
              />
            </View>
          )}
          numColumns={2}
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

const styles = StyleSheet.create({
  title: {
    paddingRight: 100
  }
});

export default connect(mapStateToProps, null)(ResearchInterests);
