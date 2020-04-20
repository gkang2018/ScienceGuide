import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { login, clear } from "../actions/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import Snackbar from "react-native-snackbar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import errorHandler from "../errorHandler"
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'

class Login extends Component {
  constructor(props) {
    super(props);
    this.localize = new LocalizationService()
    this.localize.setI18nConfig()


    this.FormValidationSchema = Yup.object().shape({
      email: Yup.string().email(this.localize.translate("forms.invalidEmail")).required(this.localize.translate("forms.required")),
      password: Yup.string()
        .min(6, this.localize.translate("forms.passwordMin"))
        .required(this.localize.translate("forms.required")),
    });

  }

  componentDidMount() {
    this.props.clear();
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back")
    })
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
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

  handleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      this.props
        .login(email, password)
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
            email: "",
            password: "",
          }}
          validationSchema={this.FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleLogin(values.email, values.password)
              .then(() => {
                Snackbar.show({
                  text: this.localize.translate("snackbar.successLogin"),
                  backgroundColor: "green",
                  duration: Snackbar.LENGTH_LONG,
                });
                this.props.navigation.navigate("DirectoryPage");
              })
              .catch((error) => {
                // call the error wrapper to see which error to display  
                let errorMessage = errorHandler(error, "Login")
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
                  <Text style={styles.title}>{this.localize.translate("login.title")}</Text>
                </View>

                <View style={styles.formContainer}>
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
                      placeholder={this.localize.translate("login.password")}
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
                      secureTextEntry={true}
                    />
                  </View>

                  <Text style={{ color: "red" }}>
                    {props.touched.password && props.errors.password}
                  </Text>

                  {props.isSubmitting ? (
                    <View style={styles.buttonContainer}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={props.handleSubmit}>
                          <Text style={styles.startingButton}>{this.localize.translate("login.confirm")}</Text>
                        </TouchableOpacity>
                      </View>
                      // <Button onPress={props.handleSubmit} title="Submit" />
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
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'blue'
  },
  formContainer: {
    flex: 3,
    width: "90%",
    alignItems: "center",
    //justifyContent: 'center',
    paddingTop: "15%",
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
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    clear: () => dispatch(clear()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
