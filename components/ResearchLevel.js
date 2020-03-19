import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addLevel } from "../actions/actions";

class ResearchLevel extends Component {
  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Research Level</Text>
          <Text style={styles.descriptionText}>
            Please select what level of research you have previously done.
          </Text>
        </View>
        <View style={styles.form}>
          <TouchableOpacity
            onPress={() => {
              this.props.addLevel("Beginner");
              this.props.navigation.navigate("Interests");
            }}
          >
            <Text style={styles.formText}>I am a beginner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.addLevel("Intermediate");
              this.props.navigation.navigate("Interests");
            }}
          >
            <Text style={styles.formText}>I have some experience</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.addLevel("Experienced");
              this.props.navigation.navigate("Interests");
            }}
          >
            <Text style={styles.formText}>I am very experienced</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 50
  },
  titleText: {
    fontSize: 40,
    marginBottom: 35
  },
  descriptionText: {
    fontSize: 20
  },
  form: {
    paddingLeft: 95,
    marginTop: 200
  },
  formText: {
    fontSize: 20,
    paddingBottom: 25
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addLevel: level => dispatch(addLevel(level))
  };
};

export default connect(null, mapDispatchToProps)(ResearchLevel);
