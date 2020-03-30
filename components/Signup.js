import React, { Component } from "react";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

import { signup } from "../actions/actions";
import Spinner from "react-native-loading-spinner-overlay";

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Next"
          onPress={() => {
            // set loading to true
            this.setState({ loading: true });

            // parse research interests:
            let researchAreas = [];
            for (let i = 0; i < this.props.researchAreas.length; i++) {
              researchAreas.push(this.props.researchAreas[i]["interest"]);
            }

            // add navigation

            this.props.signup(
              this.state.email,
              this.state.password,
              this.state.name,
              this.props.researchLevel,
              researchAreas,
              this.props.mentorName
            );

            this.setState({ loading: false });
            this.props.navigation.navigate("Dashboard");
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
    if (this.state.loading) {
      return (
        <Spinner visible={this.state.loading} textContent={"Loading..."} />
      );
    }
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
