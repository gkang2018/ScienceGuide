import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import {
  logout,
  updateProfileInformation,
  updatePassword,
} from "../actions/actions";

import { Formik } from "formik";
import * as Yup from "yup";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;

    this.state = {
      nameModal: false,
      passwordModal: false,
      imageModal: false,
      interestsModal: false,
    };

    this.nameFormValidation = Yup.object().shape({
      name: Yup.string()
        .min(1, "Name must be at least one character long")
        .max(256, "Name can not be longer than 256 characters")
        .required("Required"),
    });
    this.passwordFormValidation = Yup.object().shape({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(6, "Your password must have at least 6 characters")
        .required("Required"),
      confirmNewPassword: Yup.string()
        .required("Required")
        .test(
          "confirm-password-test",
          "Your new password and new confirm password should match",
          function (value) {
            return value === this.parent.newPassword;
          }
        ),
    });
  }

  handleSignout = () => {
    this.props
      .logout()
      .then(() => {
        Snackbar.show({
          text: "Successfully signed out",
          backgroundColor: "green",
          duration: Snackbar.LENGTH_LONG,
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Snackbar.show({
          text: "Unable to log out",
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };
  handleNameModal = (visible) => {
    this.setState({ nameModal: visible });
  };

  handlePasswordModal = (visible) => {
    this.setState({ passwordModal: visible });
  };

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <Modal animationType={"slide"} visible={this.state.nameModal}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Button
              title="cancel"
              onPress={() => this.handleNameModal(false)}
            />

            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={this.nameFormValidation}
              onSubmit={(values, actions) =>
                this.props
                  .updateProfileInformation(
                    this.props.user,
                    "Name",
                    values.name
                  )
                  .then(() => {
                    console.log("successful");
                    Snackbar.show({
                      text: "Successfully updated name",
                      backgroundColor: "green",
                      duration: Snackbar.LENGTH_LONG,
                    });
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
                    this.handleNameModal(false);
                  })
              }
            >
              {(props) => {
                return (
                  <View style={styles.container}>
                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder="Name"
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        onBlur={props.handleBlur("name")}
                        style={styles.inputColor}
                      />
                    </View>

                    <Text style={{ color: "red" }}>
                      {props.touched.name && props.errors.name}
                    </Text>
                    {props.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button onPress={props.handleSubmit} title="Submit" />
                    )}
                    {
                      <Text style={{ color: "red" }}>
                        {props.errors.general}
                      </Text>
                    }
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </Modal>
        <Modal animationType={"slide"} visible={this.state.passwordModal}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Button
              title="cancel"
              onPress={() => this.handlePasswordModal(false)}
            />

            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              }}
              validationSchema={this.passwordFormValidation}
              onSubmit={(values, actions) =>
                this.props
                  .updatePassword(
                    this.props.user,
                    values.currentPassword,
                    values.newPassword,
                    values.confirmNewPassword
                  )
                  .then(() => {
                    console.log("successful");
                    Snackbar.show({
                      text: "Successfully updated password",
                      backgroundColor: "green",
                      duration: Snackbar.LENGTH_LONG,
                    });
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
                    this.handlePasswordModal(false);
                  })
              }
            >
              {(props) => {
                return (
                  <View style={styles.container}>
                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder="Current Password"
                        value={props.values.currentPassword}
                        onChangeText={props.handleChange("currentPassword")}
                        onBlur={props.handleBlur("currentPassword")}
                        style={styles.inputColor}
                        secureTextEntry={true}
                      />
                    </View>

                    <Text style={{ color: "red" }}>
                      {props.touched.currentPassword &&
                        props.errors.currentPassword}
                    </Text>
                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder="New Password"
                        value={props.values.newPassword}
                        onChangeText={props.handleChange("newPassword")}
                        onBlur={props.handleBlur("newPassword")}
                        style={styles.inputColor}
                        secureTextEntry={true}
                      />
                    </View>

                    <Text style={{ color: "red" }}>
                      {props.touched.newPassword && props.errors.newPassword}
                    </Text>
                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder="Confirm New Password"
                        value={props.values.confirmNewPassword}
                        onChangeText={props.handleChange("confirmNewPassword")}
                        onBlur={props.handleBlur("confirmNewPassword")}
                        style={styles.inputColor}
                        secureTextEntry={true}
                      />
                    </View>

                    <Text style={{ color: "red" }}>
                      {props.touched.confirmNewPassword &&
                        props.errors.confirmNewPassword}
                    </Text>
                    {props.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button onPress={props.handleSubmit} title="Submit" />
                    )}
                    {
                      <Text style={{ color: "red" }}>
                        {props.errors.general}
                      </Text>
                    }
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          animationType={"slide"}
          visible={this.state.interestsModal}
        ></Modal>
        <View>
          <Image
            style={styles.avatar}
            source={require("../assets/default-avatar.png")}
          />
          <Text>{this.props.user.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.handleNameModal(true)}>
            <Text>Change Name</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.handlePasswordModal(true)}>
            <Text>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Interests")}
          >
            <Text>Change Research Interests</Text>
          </TouchableOpacity>
        </View>
        <Button title="Logout" onPress={this.handleSignout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
  avatarContainer: {
    flex: 1,
  },

  inputStyle: {
    padding: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "black",
  },
  heading: {
    marginTop: "12%",
    marginLeft: "2%",
    paddingBottom: "2%",
    marginBottom: "5%",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
  },
  inputColor: {
    color: "black",
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateProfileInformation: (user, type, changedInfo) =>
      dispatch(updateProfileInformation(user, type, changedInfo)),
    updatePassword: (user, currentPassword, newPassword, confirmNewPassword) =>
      dispatch(
        updatePassword(user, currentPassword, newPassword, confirmNewPassword)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
