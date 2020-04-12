import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addLevel } from "../actions/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
        

        <View style={styles.formContainer}>
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
    flex: 1,
    backgroundColor: 'white'
  },
  titleContainer: {
    flex: 1.5,
    marginTop: '5%',
    justifyContent: 'center',
    //backgroundColor: 'blue'
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: '5%',
    //backgroundColor: 'yellow'
  },
  researchLevelContainer: {
    alignItems: "center",
    height: '20%',
    width: '83%',
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: '7%',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  titleText: {
    fontSize: RFPercentage(5),
//    fontSize: 40,
    marginTop: '10%',
    fontWeight: "700",
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
  },
  formText: {
    fontSize: RFPercentage(2.75),
    textAlign: "center",
    //backgroundColor: 'green',
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addLevel: level => dispatch(addLevel(level))
  };
};

export default connect(null, mapDispatchToProps)(ResearchLevel);
