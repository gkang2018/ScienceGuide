import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  Button,
  View,
  Alert,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import Snackbar from "react-native-snackbar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";
//Get screen width using Dimensions component
var { width } = Dimensions.get("window");

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  componentDidMount() {
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
      <View style={styles.Container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-main-360.png")}
          />
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Level")}
            >
              <Text style={styles.startingButton}>
                {this.localize.translate("landing.startingButton")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.smallTextContainer}>
            <Text style={styles.smallText}>
              {this.localize.translate("landing.haveAccount")}
            </Text>

            <Text
              style={styles.smallTextLinks}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              {this.localize.translate("landing.signIn")}
            </Text>

            <Text style={styles.smallText}>
              {this.localize.translate("landing.mentor")}
            </Text>

            <Text
              style={styles.smallTextLinks}
              onPress={() =>
                Linking.openURL(
                  "https://mailchi.mp/c6ef6c29c029/mi-guia-a-la-ciencia"
                )
              }
            >
              {this.localize.translate("landing.contact")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    overflow: "visible",
    height: "60%",
    width: "90%",
    marginTop: "25%",
  },
  lowerContainer: {
    height: "35%",
    alignItems: "center",
  },
  buttonContainer: {
    height: "30%",
    width: "100%",
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  smallTextContainer: {
    height: "60%",
    width: "100%",
    paddingTop: "1%",
    alignItems: "center",
  },
  smallText: {
    marginTop: 20,
    fontSize: RFValue(18),
  },
  smallTextLinks: {
    textDecorationLine: "underline",
    fontSize: RFValue(18),
  },
  startingButton: {
    width: 300,
    fontSize: RFPercentage(2.8),
    borderWidth: 1.75,
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
    borderColor: "black",
    //backgroundColor: 'blue'
  },
});

export default LandingPage;
