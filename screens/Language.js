import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { englishSpeaker } from "../actions/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";
import Snackbar from "react-native-snackbar";

class Language extends Component {
  constructor(props) {
    super(props);

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back"),
    });
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    this.localize
      .setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            {this.localize.translate("language.title")}
          </Text>
          <Text style={styles.descriptionText}>
            {this.localize.translate("language.question")}
          </Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.formElement}>
            <TouchableOpacity
              onPress={() => {
                this.props.englishSpeaker(true);
                this.props.navigation.navigate("Areas");
              }}
            >
              <View style={styles.formText}>
                <Text style={styles.formTextInner}>
                  {this.localize.translate("language.yes")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formElement}>
            <TouchableOpacity
              onPress={() => {
                this.props.englishSpeaker(false);
                this.props.navigation.navigate("Areas");
              }}
            >
              <View style={styles.formText}>
                <Text style={styles.formTextInner}>
                  {" "}
                  {this.localize.translate("language.no")}
                </Text>
              </View>
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
    backgroundColor: "white",
  },
  headerContainer: {
    height: "35%",
    // flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    height: "65%",
    //flex: 3.2,
    //paddingTop: '5%',
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'yellow'
  },
  titleText: {
    fontSize: RFPercentage(5),
    //marginTop: 100,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Montserrat"
  },
  descriptionText: {
    fontSize: RFPercentage(2.75),
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    //marginLeft: 15,
    //marginRight: 15,
    fontFamily: "Montserrat",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  formElement: {
    height: "20%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    //backgroundColor: 'red'
  },
  formText: {
    height: 60,
    width: 240,
    //textAlignVertical: 'center',
    //borderColor: "black",
    //borderWidth: 1.5,
    borderRadius: 30,
    paddingLeft: 100,
    paddingRight: 100,
    //paddingBottom: 20,
    //paddingTop: 20,
    //fontSize: 15,
    //textAlign: "center",
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffdd00",
  },
  formTextInner: {
    //flex: 1,
    //height: 90,
    width: 250,
    fontSize: RFPercentage(3.3),
    fontFamily: "Montserrat",
    marginTop: 10,
    marginBottom: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
    textAlign: "center",
    //alignItems: 'center',
    //justifyContent: 'center',
    //textAlignVertical: 'bottom',

    //backgroundColor: 'green'
  },
});

const mapStateToProps = (state) => {
  return {
    englishSpeaker: state.englishSpeaker,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    englishSpeaker: (proficient) => dispatch(englishSpeaker(proficient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
