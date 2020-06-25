import React, { Component } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";
import Snackbar from "react-native-snackbar";
import { connect } from "react-redux";

Ionicons.loadFont();

import DirectoryScreen from "./DirectoryScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

class DirectoryPage extends Component {
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
    if (this.props.user.type === "Mentor") {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let img;
              if (route.name === this.localize.translate("icons.messages")) {
                img = focused
                  ? require("../assets/Inbox2.png")
                  : require("../assets/Inbox1.png");
              } else if (
                route.name === this.localize.translate("icons.profile")
              ) {
                img = focused
                  ? require("../assets/Profile2.png")
                  : require("../assets/Profile1.png");
              }

              // You can return any component that you like here!
              return <Image style={{ width: 35, height: 35 }} source={img} />;
            },
          })}
        >
          <Tab.Screen
            name={this.localize.translate("icons.messages")}
            component={MessagesScreen}
          />
          <Tab.Screen
            name={this.localize.translate("icons.profile")}
            component={ProfileScreen}
          />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let img;
              if (route.name === this.localize.translate("icons.directory")) {
                img = focused
                  ? require("../assets/Directory2.png")
                  : require("../assets/Directory1.png");
              } else if (
                route.name === this.localize.translate("icons.messages")
              ) {
                img = focused
                  ? require("../assets/Inbox2.png")
                  : require("../assets/Inbox1.png");
              } else if (
                route.name === this.localize.translate("icons.profile")
              ) {
                img = focused
                  ? require("../assets/Profile2.png")
                  : require("../assets/Profile1.png");
              }

              // You can return any component that you like here!
              return <Image style={{ width: 35, height: 35 }} source={img} />;
            },
          })}
        >
          <Tab.Screen
            name={this.localize.translate("icons.directory")}
            component={DirectoryScreen}
          />
          <Tab.Screen
            name={this.localize.translate("icons.messages")}
            component={MessagesScreen}
          />
          <Tab.Screen
            name={this.localize.translate("icons.profile")}
            component={ProfileScreen}
          />
        </Tab.Navigator>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(DirectoryPage);
