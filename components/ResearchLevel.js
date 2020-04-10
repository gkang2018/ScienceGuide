import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addLevel } from "../actions/actions";


class ResearchLevel extends Component {
  render() {
    return (
      <View style= {styles.mainContainer}>


        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Research Level</Text>
          <Text style={styles.descriptionText}>
            Please select what level of research you have previously done.
          </Text>
        </View>
        

        <View style={styles.form}>
          <View style = {styles.researchLevelContainer}>
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
          </View>


          <View style = {styles.researchLevelContainer}>
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
          </View>


          <View style = {styles.researchLevelContainer}>
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


      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  titleContainer: {
  },
  researchLevelContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  titleText: {
    fontSize: 40,
    marginTop: 100,
    fontWeight: "700",
    textAlign: 'center'
  },
  descriptionText: {
    fontSize: 17,
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    //paddingLeft: 95,
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
    //marginRight: 90,
    //marginBottom: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addLevel: level => dispatch(addLevel(level))
  };
};

export default connect(null, mapDispatchToProps)(ResearchLevel);
