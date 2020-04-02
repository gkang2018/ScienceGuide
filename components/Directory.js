import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import DatabaseService from "../config/firebase";
import MentorCard from "../components/MentorCard";

class Directory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryMentors: undefined
    };
    this.db = new DatabaseService();
  }

  componentDidMount() {
    let mentorsFetched = this.db.fetchMentors();
    mentorsFetched.then(vals => {
      this.setState({ directoryMentors: vals });
    });
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
            expertise={item.researchArea}
            imageUri={"https://reactnative.dev/img/tiny_logo.png"}
            props={this.props}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  }

  render() {
    if (this.state.directoryMentors == undefined) {
      return (
        <View>
          <View style={styles.heading}>
            <Text style={styles.title}>Science Guide Directory</Text>
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
          <Text style={styles.title}>Science Guide Directory</Text>
        </View>
        <View>{this.renderAllMentors()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  }
});

export default Directory;
