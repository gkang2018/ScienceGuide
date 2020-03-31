import React, { Component } from "react";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

import { signup } from "../actions/actions";

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button title="Next" onPress={this.handleSignup}></Button>
      )
    });
  }

  handleSignup = () => {
    this.props
      .signup(
        this.state.email,
        this.state.password,
        this.state.name,
        this.props.researchLevel,
        this.props.researchAreas,
        this.props.mentorName
      )
      .then(() => {
        console.log("successful");
        this.props.navigation.navigate("Dashboard");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: "Unable to sign in" });
      });
  };
  handleName = text => {
    this.setState({ name: text });
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  handleNext = () => {
    this.setState({ password: "", confirmPassword: "" });
  };

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subHeading}>
            Before you can learn more and chat with a mentor, we need a little
            more information
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={this.handleName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={this.handleConfirmPassword}
          />
        </View>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 90,
    marginBottom: 50,
    marginLeft: 80
  },
  title: {
    fontSize: 30,
    fontWeight: "600"
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray"
  },
  form: {
    textAlign: "center",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 55,
    marginBottom: 15,
    height: 40,
    width: 260
  }
});

const mapStateToProps = state => {
  return {
    researchLevel: state.level.level,
    researchAreas: state.interests.selectedInterests,
    mentorName: state.mentorName.mentor,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (email, password, name, researchLevel, researchAreas, mentorName) =>
      dispatch(
        signup(email, password, name, researchLevel, researchAreas, mentorName)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
