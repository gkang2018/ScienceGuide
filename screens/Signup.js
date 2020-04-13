import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import { signup } from "../actions/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Formik } from "formik";
import * as Yup from "yup";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.FormValidationSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email.").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long!")
        .required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .test(
          "confirm-password-test",
          "Password and confirm password should match",
          function (value) {
            return value === this.parent.password;
          }
        ),
    });
  }

  // componentDidMount() {
  //   this.props.navigation.setOptions({
  //     headerRight: () => (
  //       <Button title="Next" onPress={this.handleSignup}></Button>
  //     )
  //   });
  // }

  handleSignup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      this.props
        .signup(
          email,
          password,
          name,
          this.props.researchLevel,
          this.props.researchAreas,
          this.props.englishSpeaker,
          this.props.mentorName,
          this.props.mentorId
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
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
            confirmPassword: "",
          }}
          validationSchema={this.FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleSignup(values.email, values.password, values.name)
              .then(() => {
                console.log("successful");
                Snackbar.show({
                  text: "Successfully signed up",
                  backgroundColor: "green",
                  duration: Snackbar.LENGTH_LONG,
                });
                this.props.navigation.navigate("Dashboard");
              })
              .catch((error) => {
                Snackbar.show({
                  text: error.message,
                  backgroundColor: "red",
                  duration: Snackbar.LENGTH_LONG,
                });
              })
              .finally(() => {
                actions.setSubmitting(false);
              })
          }
        >
          {(props) => {
            return (
              <View style={styles.container}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Sign Up</Text>
                </View>
                <View style={styles.formContainer}>
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
                    <View style={styles.buttonContainer}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={props.handleSubmit}>
                        <Text style={styles.startingButton}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {<Text style={{ color: "red" }}>{props.errors.general}</Text>}
                </View>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1.5,
    width: "90%",
    marginTop: "7.5%",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'blue'
  },
  formContainer: {
    flex: 3,
    width: "90%",
    alignItems: "center",
    //justifyContent: 'center',
    paddingTop: "5%",
    //backgroundColor: 'yellow'
  },
  title: {
    fontSize: RFPercentage(5),
    marginTop: "15%",
    fontWeight: "700",
    //backgroundColor: 'red'
  },
  inputStyle: {
    width: "80%",
    borderWidth: 1.75,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    //backgroundColor: 'red',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  startingButton: {
    width: 250,
    fontSize: RFPercentage(2.6),
    borderWidth: 1.75,
    borderRadius: 33,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 18,
    paddingBottom: 18,
    textAlign: "center",
    borderColor: "black",
    //backgroundColor: 'blue'
  },
  buttonContainer: {
    height: "35%",
    width: "100%",
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    researchLevel: state.level.level,
    researchAreas: state.interests.selectedInterests,
    mentorName: state.mentorName.mentor,
    mentorId: state.mentorName.id,
    user: state.user.user,
    englishSpeaker: state.englishSpeaker.englishSpeaker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (
      email,
      password,
      name,
      researchLevel,
      researchAreas,
      englishSpeaker,
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
          englishSpeaker,
          mentorName,
          mentorId
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
