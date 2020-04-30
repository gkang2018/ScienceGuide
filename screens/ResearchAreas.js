import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { connect } from "react-redux";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";
import Snackbar from "react-native-snackbar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class ResearchAreas extends Component {
  constructor(props) {
    super(props);

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  state = {
    firstInterest: "",
    secondInterest: "",
    thirdInterest: "",
  };

  componentDidMount() {
    this.setInterests();
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

  // take our interests from redux store and populate them in our research area page

  setInterests() {
    this.props.interests.forEach((interest, index) => {
      switch (index) {
        case 0:
          this.setState({ firstInterest: interest });
          break;
        case 1:
          this.setState({ secondInterest: interest });
          break;
        case 2:
          this.setState({ thirdInterest: interest });
          break;
      }
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            {this.localize.translate("researchAreas.title")}
          </Text>
        </View>

        <View style={styles.areasContainer}>
          <ImageBackground
            style={styles.image}
            source={require("../assets/black.png")}
          >
            <View style={styles.firstArea}>
              <Text style={styles.firstInterest}>
                {this.state.firstInterest}
              </Text>
            </View>

            <View style={styles.secondArea}>
              <Text style={styles.secondInterest}>
                {this.state.secondInterest}
              </Text>
            </View>

            <View style={styles.thirdArea}>
              <Text style={styles.thirdInterest}>
                {this.state.thirdInterest}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AvailableMentors")}
            >
              <View style={styles.matchButton}>
                <Text style={styles.matchText}>
                  {this.localize.translate("researchAreas.findMentor")}
                </Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.interests.selectedInterests,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    flex: 1,
    marginTop: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  title: {
    fontSize: RFPercentage(5),
    marginTop: "10%",
    fontWeight: "700",
    textAlign: "center",
  },
  areasContainer: {
    flex: 3,
    flexDirection: "row",
    //backgroundColor: 'red',
    justifyContent: "center",

    //alignItems: 'center',
  },

  firstArea: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: 100,
    height: 100,
    borderWidth: 8,
    borderRadius: 115 / 2,
    borderColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  secondArea: {
    position: "absolute",
    top: "70%",
    //left: '38%',
    width: 100,
    height: 100,
    borderWidth: 8,
    borderRadius: 115 / 2,
    borderColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  thirdArea: {
    position: "absolute",
    top: "10%",
    right: "10%",
    width: 100,
    height: 100,
    borderWidth: 8,
    borderRadius: 115 / 2,
    borderColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  matchButton: {
    //position: 'absolute',
    top: "35%",
    //left: '35%',
    width: 125,
    height: 125,
    borderWidth: 8,
    borderRadius: 125 / 2,
    borderColor: "yellow",
    //marginLeft: 115,
    //marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  firstInterest: {
    fontSize: RFPercentage(1.4),
    textAlign: "center",
  },
  secondInterest: {
    fontSize: RFPercentage(1.4),
    textAlign: "center",
  },
  thirdInterest: {
    fontSize: RFPercentage(1.4),
    textAlign: "center",
  },
  matchText: {
    fontSize: RFValue(15),
    fontWeight: "700",
    textAlign: "center",
  },
  image: {
    flex: 1,
    //resizeMode: "cover",
    flexDirection: "row",
    overflow: "visible",
    //backgroundColor: 'red',
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, null)(ResearchAreas);
