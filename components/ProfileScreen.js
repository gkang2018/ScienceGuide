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
} from "react-native";

import { updateProfileInformation } from "../actions/actions";

import { connect } from "react-redux";
import { logout } from "../actions/actions";
import { Formik } from "formik";
import * as Yup from "yup";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

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
  }

  handleSignout = () => {
    this.props
      .logout()
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Unable to log out. Please try again" });
      });
  };
  handleNameModal = () => {
    this.setState((previousState) => ({ nameModal: !previousState.nameModal }));
  };

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <Modal animationType={"slide"} visible={this.state.nameModal}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Button title="cancel" onPress={this.handleNameModal} />

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
                    this.setState({ nameModal: false });
                  })
                  .catch((error) => {
                    actions.setFieldError("general", error.message);
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
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
        <Text>{this.props.user.name}</Text>
        <Button title="Logout" onPress={this.handleSignout} />
        <View>
          <TouchableOpacity onPress={this.handleNameModal}>
            <Text>Change Name</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Change Password</Text>
        </View>
        <View>
          <Text>Change Profile Image</Text>
        </View>
        <View>
          <Text>Change Research Interests</Text>
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
    justifyContent: "center",
  },
  inputStyle: {
    padding: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "black",
  },
  heading: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
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
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateProfileInformation: (user, type, changedInfo) =>
      dispatch(updateProfileInformation(user, type, changedInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
