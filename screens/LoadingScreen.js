import React, { Component } from "react";
import DatabaseService from "../config/firebase";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  addInterest,
  addLevel,
  selectMentor,
  update,
} from "../actions/actions";
import Snackbar from "react-native-snackbar";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.db = new DatabaseService();
  }

  componentDidMount() {
    this.db.auth.onAuthStateChanged((user) => {
      if (user) {
        // TODO: determine if credentials are for user or mentor
        // checks if redux store is empty

        if (this.props.selectedInterests.length == 0) {
          let resp = this.db.getUserData(user.uid);
          resp
            .then((userData) => {
              // populate the redux store with database
              let update = {
                uid: user.uid,
                email: user.email,
                name: userData.name,
                type: userData.type,
              };
              this.props.update(update);
              this.populateReduxStore(userData);
              this.props.navigation.navigate("DirectoryPage");
            })
            .catch((error) => {
              console.log(error);
              console.log("Unable to fetch student credentials");
              Snackbar.show({
                text: error.message,
                backgroundColor: "red",
                duration: Snackbar.LENGTH_LONG,
              });
            });
        }
      } else {
        this.props.navigation.navigate("Home");
      }
    });
  }

  populateReduxStore(student) {
    // check to see that our store doesn't already have these values populated
    if (this.props.selectedInterests.length == 0 && student.type !== "Mentor") {
      for (let i = 0; i < student.researchAreas.length; i++) {
        this.props.addInterest(student.researchAreas[i]);
      }
      this.props.selectMentor(student.mentorName, student.mentorId);
      this.props.addLevel(student.skillLevel);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedInterests: state.interests.selectedInterests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInterest: (interest) => dispatch(addInterest(interest)),
    addLevel: (level) => dispatch(addLevel(level)),
    selectMentor: (mentor, id) => dispatch(selectMentor(mentor, id)),
    update: (user) => dispatch(update(user)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
