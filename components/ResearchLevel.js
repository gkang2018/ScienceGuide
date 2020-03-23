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
            <Text style={styles.formText}>
              I want to make my first research project!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.addLevel("Intermediate");
              this.props.navigation.navigate("Interests");
            }}
          >
            <Text style={styles.formText}>
              I won at my school but want to win nationally!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.addLevel("Experienced");
              this.props.navigation.navigate("Interests");
            }}
          >
            <Text style={styles.formText}>
              I won nationally and want to further the impact of my research!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 50,
    textAlign: "center"
  },
  titleText: {
    fontSize: 40,
    marginTop: 100,
    fontWeight: "700"
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 20
  },
  form: {
    paddingLeft: 95,
    marginTop: 100
  },
  formText: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 15,
    textAlign: "center",
    marginRight: 90,
    marginBottom: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addLevel: level => dispatch(addLevel(level))
  };
};

export default connect(null, mapDispatchToProps)(ResearchLevel);
