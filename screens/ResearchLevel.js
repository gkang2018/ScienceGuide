import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addLevel } from "../actions/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'
import Snackbar from "react-native-snackbar";


class ResearchLevel extends Component {

  constructor(props) {
    super(props)
    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  checkUserStatus = () => {
    if (!this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("DirectoryPage")
    }
  };


  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () =>
      this.checkUserStatus()
    );
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back")
    })
    RNLocalize.addEventListener('change', this.handleLocalizationChange)

  }
  componentWillUnmount() {
    this.unsubscribe()
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)

  }


  handleLocalizationChange = () => {
    this.localize.setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      })
  }

  render() {
    this.checkUserStatus()

    return (
      <View style={styles.mainContainer}>


        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.localize.translate("researchLevel.title")}</Text>
          <Text style={styles.descriptionText}>
            {this.localize.translate("researchLevel.description")}
          </Text>
        </View>


        <View style={styles.formContainer}>
          <View style={styles.researchLevelContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.addLevel("Beginner");
                this.props.navigation.navigate("Interests");
              }}
            >
              <Text style={styles.formText}>
                {this.localize.translate("researchLevel.beginnerInput")}
              </Text>
            </TouchableOpacity>
          </View>


          <View style={styles.researchLevelContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.addLevel("Intermediate");
                this.props.navigation.navigate("Interests");
              }}
            >
              <Text style={styles.formText}>
                {this.localize.translate("researchLevel.mediumInput")}
              </Text>
            </TouchableOpacity>
          </View>


          <View style={styles.researchLevelContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.addLevel("Experienced");
                this.props.navigation.navigate("Interests");
              }}
            >
              <Text style={styles.formText}>
                {this.localize.translate("researchLevel.advancedInput")}
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLevel: level => dispatch(addLevel(level))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchLevel);
