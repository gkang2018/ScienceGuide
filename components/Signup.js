import React, { Component } from "react";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import DatabaseService from "../config/firebase";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.db = new DatabaseService();
  }

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Next"
          onPress={() => {
            // add navigation
            this.db.signUpUserWithEmail(
              this.state.email,
              this.state.password,
              this.state.name,
              "Intermediate",
              ["Mathematics", "Chemistry"]
            );
          }}
        ></Button>
      )
    });
  }

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
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    margin: 25,
    height: 40,
    width: 260
  }
});

export default Signup;
