import React, { Component } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import DatabaseService from "../config/firebase";
import DirectoryCard from "../components/DirectoryCard";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";

class DirectoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryMentors: undefined,
    };
    this.db = new DatabaseService();

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    let mentorsFetched = this.db.fetchAllMentors();
    mentorsFetched
      .then((vals) => {
        this.setState({ directoryMentors: vals });
      })
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorDirectoryFetch"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
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

  getMentorPic = (name) => {
    switch(name) {
      case "Juan Rivera": 
        return require("../assets/juan_rivera.jpg")
      case "Rosalinda Flores": 
        return require("../assets/rosalinda_flores.jpg")
      case "Alexandra Gómez": 
        return require("../assets/alexandra_gomez.jpg")
      case "Roberto Ramírez": 
        return require("../assets/roberto_ramirez.jpg")
      case "Angela Pérez": 
        return require("../assets/angela_perez.jpg")
      default: 
        return require("../assets/default-avatar.png")
    }
  }


  renderAllMentors() {
    return (
      <FlatList
        data={this.state.directoryMentors}
        renderItem={({ item }) => (
          <DirectoryCard
            navigation={this.props.navigation}
            id={item.id}
            key={item.id}
            name={item.name}
            email={item.email}
            job={item.job}
            expertise={item.researchAreas}
            imageUri={this.getMentorPic(item.name)}
            props={this.props}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }

  render() {
    if (this.state.directoryMentors == undefined) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.heading}>
            <Text style={styles.title}>
              {this.localize.translate("directoryScreen.title")}
            </Text>
          </View>

          <View style={styles.mentors}>
            <ActivityIndicator size="large" color="#0000ff" animating={true} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            {this.localize.translate("directoryScreen.title")}
          </Text>
        </View>

        {/* <ScrollView> */}
        <View style={styles.mentors}>{this.renderAllMentors()}</View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    height: "20%",
    // flex: 1,
    //paddingRight: 20,
    paddingLeft: 20,
    paddingTop: "3%",
    //alignItems: "center",
    justifyContent: "flex-end",
    //backgroundColor: 'blue'
  },
  title: {
    fontSize: RFPercentage(5),
    width: "70%",
    //marginTop: 100,
    fontWeight: "500",
    fontFamily: 'Montserrat',
    //textAlign: "center",
    //backgroundColor: 'red'
  },
  mentors: {
    height: "80%",
    //flex: 3.2,
    paddingLeft: 10,
    paddingBottom: "0%",
    //alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'yellow',
    marginLeft: "3%",
  },
});

export default DirectoryScreen;
