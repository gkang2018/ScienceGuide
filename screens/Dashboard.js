import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { logout } from "../actions/actions";
import { connect } from "react-redux";
import Video from "react-native-video";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  state = {
    error: null,
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      gestureEnabled: false,
      headerTitle: "",
      headerTransparent: true,
      headerLeft: null,
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
      <Video
        source={require("../assets/welcome-animation.mp4")}
        playInBackground={true}
        onError={(error) => {
          Snackbar.show({
            text: this.localize.translate("dashboard.video"),
            backgroundColor: "red",
            duration: Snackbar.LENGTH_LONG,
          });
        }}
        style={styles.backgroundVideo}
        onEnd={() => this.props.navigation.navigate("DirectoryPage")}
      />
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
