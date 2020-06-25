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
import errorHandler from "../util/errorHandler";
import { Formik } from "formik";
import * as Yup from "yup";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();

    this.FormValidationSchema = Yup.object().shape({
      name: Yup.string().required(this.localize.translate("forms.required")),
      email: Yup.string()
        .email(this.localize.translate("forms.invalidEmail"))
        .required(this.localize.translate("forms.required")),
      password: Yup.string()
        .min(6, this.localize.translate("forms.passwordMin"))
        .required(this.localize.translate("forms.required")),
      confirmPassword: Yup.string()
        .required(this.localize.translate("forms.required"))
        .test(
          "confirm-password-test",
          this.localize.translate("forms.confirmMatch"),
          function (value) {
            return value === this.parent.password;
          }
        ),
    });
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back"),
    });
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    this.localize
      .setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
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
            this.props
              .signup(
                values.email,
                values.password,
                values.name,
                this.props.researchLevel,
                this.props.researchAreas,
                this.props.englishSpeaker,
                this.props.mentorName,
                this.props.mentorId
              )
              .then(() => {
                Snackbar.show({
                  text: this.localize.translate("snackbar.successSignup"),
                  backgroundColor: "green",
                  duration: Snackbar.LENGTH_LONG,
                });
                this.props.navigation.navigate("Dashboard");
              })
              .catch((error) => {
                // call the error wrapper to see which error to display
                let errorMessage = errorHandler(error, "Signup");
                Snackbar.show({
                  text: this.localize.translate(errorMessage),
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
                  <Text style={styles.title}>
                    {this.localize.translate("signup.title")}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {this.localize.translate("signup.description")}
                  </Text>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.inputStyle}>
                    <TextInput
                      placeholder={this.localize.translate("signup.name")}
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
                      placeholder={this.localize.translate("signup.email")}
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
                      placeholder={this.localize.translate("signup.password")}
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
                      placeholder={this.localize.translate(
                        "signup.confirmPassword"
                      )}
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

                  <View style={{ height: "5%" }}></View>
                  {props.isSubmitting ? (
                    <View style={styles.buttonContainer}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={props.handleSubmit}>
                        <Text style={styles.startingButton}>
                          {this.localize.translate("signup.confirmButton")}
                        </Text>
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
    fontFamily: 'Montserrat',
    marginTop: "15%",
    fontWeight: "500",
    //backgroundColor: 'red'
  },
  descriptionText: {
    fontSize: RFPercentage(2.75),
    fontFamily: 'Montserrat',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    //marginLeft: 15,
    //marginRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    width: "80%",
    borderWidth: 1.75,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    //backgroundColor: 'red',
    fontFamily: 'Montserrat',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  startingButton: {
    width: 250,
    fontSize: RFPercentage(2.6),
    fontFamily: 'Montserrat',
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
    height: 60,
    width: 240,
    //textAlignVertical: 'center',
    //borderColor: "black",
    //borderWidth: 1.5,
    //borderRadius: 30,
    paddingLeft: 100,
    paddingRight: 100,
    //paddingBottom: 20,
    //paddingTop: 20,
    //fontSize: 15,
    //textAlign: "center",
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'yellow',
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
