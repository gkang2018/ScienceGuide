import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import DatabaseService from "../config/firebase";
import MentorCard from "../components/MentorCard";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'

class DirectoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryMentors: undefined,
    };
    this.db = new DatabaseService();

    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
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


  renderAllMentors() {
    return (
      <FlatList
        data={this.state.directoryMentors}
        renderItem={({ item }) => (
          <MentorCard
            navigation={this.props.navigation}
            id={item.id}
            key={item.id}
            name={item.name}
            email={item.email}
            job={item.job}
            expertise={item.researchAreas}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
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
        <View>
          <View style={styles.heading}>
            <Text style={styles.title}>{this.localize.translate("directoryScreen.title")}</Text>
          </View>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" animating={true} />
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>{this.localize.translate("directoryScreen.title")}</Text>
        </View>
        <View>{this.renderAllMentors()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: "12%",
    marginLeft: "2%",
    paddingBottom: "2%",
    marginBottom: "5%",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default DirectoryScreen;
