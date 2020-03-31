import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { login, clear } from "../actions/actions";
import { Formik } from "formik";
import * as Yup from "yup";

class Login extends Component {
  constructor(props) {
    super(props);

    this.FormValidationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid Email.")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long!")
        .required("Required")
    });
  }

  componentDidMount() {
    this.props.clear();
  }

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      this.props
        .login(email, password)
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
            email: "",
            password: ""
          }}
          validationSchema={this.FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleLogin(values.email, values.password)
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
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    clear: () => dispatch(clear())
  };
};

export default connect(null, mapDispatchToProps)(Login);
