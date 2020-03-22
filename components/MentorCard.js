import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class MentorCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image />
        </View>
        <View style={styles.details}>
          <Text>{this.props.name}</Text>
          <Text>{this.props.job}</Text>
          <Text>{this.props.expertise}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flexDirection: "row"
  },
  imageContainer: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2
  },
  details: {
    marginLeft: 100,
    paddingTop: 20
  }
});

export default MentorCard;
