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
          <DirectoryCard
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
        <View style={styles.mainContainer}>
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
      <View style={styles.mainContainer}>
       <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.title}>{this.localize.translate("directoryScreen.title")}</Text>
        </View>
        <View style={styles.mentors}>{this.renderAllMentors()}</View>
         </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  heading: {
    height: '15%',
    // flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 75,
    //alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: 'blue'
  },
  title: {
    fontSize: RFPercentage(3.75),
    //marginTop: 100,
    fontWeight: "700",
    //textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: "50%",
    justifyContent: "center",
    flexDirection: "column",
  },
  mentors: {
    height: '85%',
    //flex: 3.2,
    //paddingTop: '5%',
    alignItems: "center",
    justifyContent: 'center',
    //backgroundColor: 'yellow'
    marginLeft: "3%"
  }
});

export default DirectoryScreen;
