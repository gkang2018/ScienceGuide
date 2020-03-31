import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";

import { signup } from "../actions/actions";

import { Formik } from "formik";
import * as Yup from "yup";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.FormValidationSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid Email.")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long!")
        .required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .test(
          "confirm-password-test",
          "Password and confirm password should match",
          function(value) {
            return value === this.parent.password;
          }
        )
    });
  }

  state = {
    error: null
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button title="Next" onPress={this.handleSignup}></Button>
      )
    });
  }

  handleSignup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      this.props
        .signup(
          email,
          password,
          name,
          this.props.researchLevel,
          this.props.researchAreas,
          this.props.mentorName,
          this.props.mentorId
        )
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={this.FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleSignup(values.email, values.password, values.name)
              .then(() => {
                console.log("successful");
                this.props.navigation.navigate("Dashboard");
              })
              .catch(error => {
                actions.setFieldError("general", error.message);
              })
              .finally(() => {
                actions.setSubmitting(false);
              })
          }
        >
          {props => {
            return (
              <View style={styles.container}>
                <View style={styles.inputStyle}>
                  <TextInput
                    placeholder="Name"
                    value={props.values.name}
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                  />
                </View>

                <Text style={{ color: "red" }}>
                  {props.touched.name && props.errors.name}
                </Text>
                <View style={styles.inputStyle}>
                  <TextInput
                    placeholder="Email"
                    value={props.values.email}
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                  />
                </View>

                <Text style={{ color: "red" }}>
                  {props.touched.email && props.errors.email}
                </Text>
                <View style={styles.inputStyle}>
                  <TextInput
                    placeholder="Password"
                    value={props.values.password}
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    secureTextEntry={true}
                  />
                </View>

                <Text style={{ color: "red" }}>
                  {props.touched.password && props.errors.password}
                </Text>
                <View style={styles.inputStyle}>
                  <TextInput
                    placeholder="Confrim Password"
                    value={props.values.confirmPassword}
                    onChangeText={props.handleChange("confirmPassword")}
                    onBlur={props.handleBlur("confirmPassword")}
                    secureTextEntry={true}
                  />
                </View>
                <Text style={{ color: "red" }}>
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </Text>
                {props.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Button onPress={props.handleSubmit} title="Submit" />
                )}
                {<Text style={{ color: "red" }}>{props.errors.general}</Text>}
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
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
  inputStyle: {
    padding: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "black"
  }
});

const mapStateToProps = state => {
  return {
    researchLevel: state.level.level,
    researchAreas: state.interests.selectedInterests,
    mentorName: state.mentorName.mentor,
    mentorId: state.mentorName.id,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (
      email,
      password,
      name,
      researchLevel,
      researchAreas,
      mentorName,
      mentorId
    ) =>
      dispatch(
        signup(
          email,
          password,
          name,
          researchLevel,
          researchAreas,
          mentorName,
          mentorId
        )
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
