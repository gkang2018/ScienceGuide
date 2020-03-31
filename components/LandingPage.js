import React, { Component } from "react";
import { StyleSheet, Image, Text, Button, View, Alert } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import DatabaseService from "../config/firebase";
import {
  addInterest,
  addLevel,
  selectMentor,
  update
} from "../actions/actions";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.db = new DatabaseService();

    this.compMounted = false;
  }

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.compMounted = true;
    this.db.auth.onAuthStateChanged(user => {
      if (user) {
        // TODO: determine if credentials are for user or mentor
        // checks if redux store is empty
        if (this.props.selectedInterests.length == 0) {
          let resp = this.db.getStudentWithID(user.uid);
          resp
            .then(student => {
              // populate the redux store with database
              let update = {
                uid: user.uid,
                email: user.email
              };
              this.props.update(update);
              this.populateReduxStore(student);
              this.props.navigation.navigate("Dashboard");

              // only set state if the component is mounted
              if (this.compMounted) {
                this.setState({ isLoading: false });
              }
            })
            .catch(error => {
              console.log("Unable to fetch student credentials");
            });
        }
      } else {
        if (this.compMounted) {
          this.setState({ isLoading: false });
        }
      }
    });
  }

  componentWillUnmount() {
    this.compMounted = false;
  }

  populateReduxStore(student) {
    // check to see that our store doesn't already have these values populated
    if (this.props.selectedInterests.length == 0) {
      for (let i = 0; i < student.researchAreas.length; i++) {
        this.props.addInterest(student.researchAreas[i]);
      }
      this.props.addLevel(student.skillLevel);
      this.props.selectMentor(student.mentorName);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner visible={this.state.isLoading} textContent={"Loading..."} />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Science Guide</Text>
        <Image
          style={{ width: 250, height: 250, marginBottom: 80 }}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        />
        <View style={styles.smallTextContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Level")}
          >
            <Text style={styles.startingButton}>Let's get started!</Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>Already have an account?</Text>
          <Text
            style={styles.signIn}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  smallTextContainer: {
    marginBottom: 60,
    alignItems: "center"
  },
  smallText: {
    marginTop: 20
  },
  title: {
    flex: 1,
    marginTop: 60,
    fontWeight: "bold",
    fontSize: 30,
    color: "black"
  },
  signIn: {
    textDecorationLine: "underline"
  },
  startingButton: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    selectedInterests: state.interests.selectedInterests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addInterest: interest => dispatch(addInterest(interest)),
    addLevel: level => dispatch(addLevel(level)),
    selectMentor: mentor => dispatch(selectMentor(mentor)),
    update: user => dispatch(update(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
