import React, { useState, Component, useLayoutEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { Title, Subheading } from "react-native-paper";
import InterestsCard from "./InterestsCard";
import { interestsData } from "../interestData";

import { connect } from "react-redux";

class ResearchInterests extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Confirm"
          onPress={() => {
            this.props.navigation.navigate("Areas");
          }}
        ></Button>
      )
    });
  }

  render() {
    return (
      <View>
        <View style={styles.title}>
          <Title>Research Interests</Title>
        </View>
        <Subheading>{this.subText}</Subheading>
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
