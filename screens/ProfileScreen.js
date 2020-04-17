import React, { Component } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
      passwordModal: true,
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
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <Modal animationType={"slide"} visible={this.state.nameModal}>
          <KeyboardAvoidingView style={{ flex: 1, paddingTop: 40 }} behavior="padding">

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
                <View style={styles.ChangeScreenContainer}>
                    <View style={styles.backButtonContainer}>
                      <Button
                        title="Back"
                        onPress={() => this.handleNameModal(false)}
                      />
                    </View>

                    <View style={styles.ChangeHeadingContainer}>
                      <Text style={styles.changeTitle}>Change Name</Text>
                    </View>

                    <View style={styles.Spacing}>
                    </View>

                    <View style={styles.inputTypeTextContainer}> 
                      <Text style={styles.inputTypeText}>New Name</Text>
                    </View>

                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder="Name"
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        onBlur={props.handleBlur("name")}
                        style={styles.inputColor}
                      />
                    </View>

                    <View style={styles.smallerSpacing}></View>

                  <View style= {styles.submitButton}>
                    <Text style={{ color: "red" }}>
                      {props.touched.name && props.errors.name}
                    </Text>
                    {props.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button onPress={props.handleSubmit} title="Confirm" />
                    )}
                    {
                      <Text style={{ color: "red" }}>
                        {props.errors.general}
                      </Text>
                    }
                  </View>

                </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </Modal>


        <Modal animationType={"slide"} visible={this.state.passwordModal}>
          <KeyboardAvoidingView style={{ flex: 1, paddingTop: 40 }} behavior="padding">

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







                  <View style={styles.ChangeScreenContainer}>

                    <View style={styles.backButtonContainer}>
                      <Button
                        title="back"
                        onPress={() => this.handlePasswordModal(false)}
                      />
                    </View>

                    <View style={styles.ChangeHeadingContainer}>
                      <Text style={styles.changeTitle}>Change Password</Text>
                    </View>

                    <View style={styles.smallerSpacing}>
                    </View>

                    
                    <View style={styles.inputTypeTextContainer}> 
                      <Text style={styles.inputTypeText}>Current Password</Text>
                    </View>

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


                    <View style={styles.inputTypeTextContainer}> 
                      <Text style={styles.inputTypeText}>New Password</Text>
                    </View>

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

                    <View style={styles.inputTypeTextContainer}> 
                      <Text style={styles.inputTypeText}>Confirm Password</Text>
                    </View>

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

                    <View style={styles.smallerSpacing}></View>

                    <View style= {styles.submitButton}>
                    <Text style={{ color: "red" }}>
                      {props.touched.confirmNewPassword &&
                        props.errors.confirmNewPassword}
                    </Text>
                    {props.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button onPress={props.handleSubmit} title="Confirm" />
                    )}
                    {
                      <Text style={{ color: "red" }}>
                        {props.errors.general}
                      </Text>
                    }
                    </View>
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

        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require("../assets/default-avatar.png")}
          />
          <Text style={styles.avatarText}>{this.props.user.name}</Text>
        </View>

        <View style={styles.changeSectionContainer}>
            <View style={styles.changeContainer}>
              <TouchableOpacity onPress={() => this.handleNameModal(true)}>
                <Text style={styles.changeText}>Change Name</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.changeContainer}>
              <TouchableOpacity onPress={() => this.handlePasswordModal(true)}>
                <Text style={styles.changeText}>Change Password</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.changeContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Interests")}
              >
                <Text style={styles.changeText}>Change Research Interests</Text>
              </TouchableOpacity>
            </View>
        </View >

            
        <View style={styles.spacing}>

        </View>
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity onPress={this.handleSignout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    //backgroundColor: 'red',
    alignItems: 'center'
  },
  headingContainer: {
    height: '15%',
    //backgroundColor: 'blue',
    justifyContent: 'center',
    width: '90%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: "12%",  
  },
  avatarContainer: {
    height: '30%',
    alignItems: 'center',
    //backgroundColor: 'green',
    justifyContent: 'center'
  },
  changeSectionContainer: {
    height: '20%',
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    paddingTop: 30
  },
  changeContainer: {
    //flex: 1,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'pink'
  },
  spacing: {
    height: '10%'
  },
  logoutButtonContainer: {
    height: '10%',
    width: '100%',
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: 'center',
  },
  title: {
    paddingTop: 50,
    paddingBottom: 50,
    fontSize: RFValue(35),
    fontWeight: "700",
    //backgroundColor: 'white'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    margin: 10,
  },
  avatarText: {
    fontSize: RFPercentage(2.5),
  },
  changeText: {
    fontSize: RFPercentage(2.4),
  },
  logoutText: {
    //height: 100,
    width: 200,
    fontSize: RFPercentage(2.3),
    borderWidth: 1.75,
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderColor: "black",
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputColor: {
    color: "black",
  },
  ChangeScreenContainer: {
    flex: 1,
    //backgroundColor: "purple",
    alignItems: "center",
    //justifyContent: "center",
  },
  ChangeHeadingContainer: {
    height: '15%',
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '10%',
    marginRight: '10%',
    //marginTop: "12%",  
  },
  changeTitle: {
    //paddingTop: 50,
    //paddingBottom: 50,
    fontSize: RFValue(35),
    fontWeight: "700",
    //backgroundColor: 'white'
  },
  inputTypeTextContainer: {
    //height: '%',
    //backgroundColor: 'blue',
    justifyContent: 'center',
    //alignItems: 'center',
    width: '70%',
    marginLeft: '10%',
    marginRight: '10%',
    //backgroundColor: 'green'
  },
  inputTypeText: {
    fontSize: RFValue(18),
    paddingBottom: '3%',
    //backgroundColor: 'yellow',
  },
  inputStyle: {
    //height: '10%',
    padding: 10,
    width: "70%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    //backgroundColor: 'red'
  },
  submitButton: {
    height: '7%',
    width: 180,
    fontSize: RFPercentage(2),
    borderWidth: 1.75,
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    //paddingTop: 10,
    //paddingBottom: 10,
    textAlign: "center",
    borderColor: "black",
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonContainer: {
    width: '100%',
    marginLeft: '5%',
    //marginTop: '12%',
    alignItems: 'flex-start',
    //backgroundColor: 'red'
  },
  smallerSpacing: {
    height: '5%'
  }

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
