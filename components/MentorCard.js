import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class MentorCard extends Component {
  constructor(props) {
    super(props);
  }

  selectMentor() {
    console.log("selected", this.props.name);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.selectMentor()}>
        <View style={styles.container}>
          <Image
            style={styles.imageStyle}
            source={{ uri: this.props.imageUri }}
          />
          <View style={styles.details}>
            <Text style={styles.text}>{this.props.name}</Text>
            <Text style={styles.text}>{this.props.job}</Text>
            <Text style={styles.text}>Expertise: {this.props.expertise}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15
  },
  imageContainer: {},
  details: {
    marginLeft: 35,
    paddingTop: 20,
    marginRight: 125
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10
  },
  text: {
    fontSize: 15,
    paddingBottom: 5
  }
});

export default MentorCard;
