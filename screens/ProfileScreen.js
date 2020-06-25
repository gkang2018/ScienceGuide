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
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";
import errorHandler from "../util/errorHandler";

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

    this.localize = new LocalizationService();
    this.localize.setI18nConfig();

    this.nameFormValidation = Yup.object().shape({
      name: Yup.string()
        .min(1, this.localize.translate("forms.nameMin"))
        .max(256, this.localize.translate("forms.nameMax"))
        .required(this.localize.translate("forms.required")),
    });
    this.passwordFormValidation = Yup.object().shape({
      currentPassword: Yup.string().required(
        this.localize.translate("forms.required")
      ),
      newPassword: Yup.string()
        .min(6, this.localize.translate("forms.passwordMin"))
        .required(this.localize.translate("forms.required")),
      confirmNewPassword: Yup.string()
        .required(this.localize.translate("forms.required"))
        .test(
          "confirm-password-test",
          this.localize.translate("forms.confirmMatch"),
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
          text: this.localize.translate("snackbar.successLogout"),
          backgroundColor: "green",
          duration: Snackbar.LENGTH_LONG,
        });
        // this.props.navigation.reset({
        //   routes: [{ name: "Loading" }],
        // });
        this.props.navigation.popToTop();
      })
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLogout"),
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

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
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
    let interestView = <View></View>;
    if (this.props.user.type === "Student") {
      interestView = (
        <View style={styles.changeContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UpdatingInterests")}
          >
            <Text style={styles.changeText}>
              {this.localize.translate("profileScreen.interestsChangeTitle")}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>
            {this.localize.translate("profileScreen.title")}
          </Text>
        </View>

        <Modal animationType={"slide"} visible={this.state.nameModal}>
          <KeyboardAvoidingView
            style={{ flex: 1, paddingTop: 40 }}
            behavior="padding"
          >
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
                    Snackbar.show({
                      text: this.localize.translate(
                        "snackbar.successUpdatedName"
                      ),
                      backgroundColor: "green",
                      duration: Snackbar.LENGTH_LONG,
                    });
                  })
                  .catch((error) => {
                    Snackbar.show({
                      text: this.localize.translate(
                        "snackbar.errorUpdatedName"
                      ),
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
                        title={this.localize.translate("icons.back")}
                        onPress={() => this.handleNameModal(false)}
                      />
                    </View>

                    <View style={styles.ChangeHeadingContainer}>
                      <Text style={styles.changeTitle}>
                        {this.localize.translate(
                          "profileScreen.nameChangeTitle"
                        )}
                      </Text>
                    </View>

                    <View style={styles.Spacing}></View>
                    <View style={styles.inputTypeTextContainer}>
                      <Text style={styles.inputTypeText}>
                        {this.localize.translate(
                          "profileScreen.nameInputTitle"
                        )}
                      </Text>
                    </View>

                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder={this.localize.translate(
                          "profileScreen.nameInputPlaceholder"
                        )}
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        onBlur={props.handleBlur("name")}
                        style={styles.inputColor}
                      />
                    </View>

                    <View style={styles.smallerSpacing}></View>

                    <View style={styles.submitButton}>
                      <Text style={{ color: "red" }}>
                        {props.touched.name && props.errors.name}
                      </Text>
                      {props.isSubmitting ? (
                        <ActivityIndicator />
                      ) : (
                        <Button
                          onPress={props.handleSubmit}
                          title={this.localize.translate(
                            "profileScreen.confirm"
                          )}
                        />
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
          <KeyboardAvoidingView
            style={{ flex: 1, paddingTop: 40 }}
            behavior="padding"
          >
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
                    Snackbar.show({
                      text: this.localize.translate(
                        "snackbar.successUpdatedPassword"
                      ),
                      backgroundColor: "green",
                      duration: Snackbar.LENGTH_LONG,
                    });
                  })
                  .catch((error) => {
                    let errorMessage = errorHandler(error, "changePassword");
                    Snackbar.show({
                      text: this.localize.translate(errorMessage),
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
                        title={this.localize.translate("icons.back")}
                        onPress={() => this.handlePasswordModal(false)}
                      />
                    </View>

                    <View style={styles.ChangeHeadingContainer}>
                      <Text style={styles.changeTitle}>
                        {this.localize.translate(
                          "profileScreen.passwordChangeTitle"
                        )}
                      </Text>
                    </View>

                    <View style={styles.smallerSpacing}></View>

                    <View style={styles.inputTypeTextContainer}>
                      <Text style={styles.inputTypeText}>
                        {this.localize.translate(
                          "profileScreen.currentPassword"
                        )}
                      </Text>
                    </View>

                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder={this.localize.translate(
                          "profileScreen.currentPassword"
                        )}
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
                      <Text style={styles.inputTypeText}>
                        {this.localize.translate("profileScreen.newPassword")}
                      </Text>
                    </View>

                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder={this.localize.translate(
                          "profileScreen.newPassword"
                        )}
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
                      <Text style={styles.inputTypeText}>
                        {this.localize.translate(
                          "profileScreen.confirmPassword"
                        )}
                      </Text>
                    </View>

                    <View style={styles.inputStyle}>
                      <TextInput
                        placeholder={this.localize.translate(
                          "profileScreen.confirmPassword"
                        )}
                        value={props.values.confirmNewPassword}
                        onChangeText={props.handleChange("confirmNewPassword")}
                        onBlur={props.handleBlur("confirmNewPassword")}
                        style={styles.inputColor}
                        secureTextEntry={true}
                      />
                    </View>

                    <View style={styles.smallerSpacing}></View>

                    <View style={styles.submitButton}>
                      <Text style={{ color: "red" }}>
                        {props.touched.confirmNewPassword &&
                          props.errors.confirmNewPassword}
                      </Text>
                      {props.isSubmitting ? (
                        <ActivityIndicator />
                      ) : (
                        <Button
                          onPress={props.handleSubmit}
                          title={this.localize.translate(
                            "profileScreen.confirm"
                          )}
                        />
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
              <Text style={styles.changeText}>
                {this.localize.translate("profileScreen.nameChangeTitle")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.changeContainer}>
            <TouchableOpacity onPress={() => this.handlePasswordModal(true)}>
              <Text style={styles.changeText}>
                {this.localize.translate("profileScreen.passwordChangeTitle")}
              </Text>
            </TouchableOpacity>
          </View>

          {interestView}
        </View>

        <View style={styles.spacing}></View>
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity onPress={this.handleSignout}>
            <Text style={styles.logoutText}>
              {this.localize.translate("profileScreen.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    //backgroundColor: 'red',
    alignItems: "center",
  },
  headingContainer: {
    height: "15%",
    //backgroundColor: 'blue',
    justifyContent: "center",
    width: "90%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "12%",
  },
  avatarContainer: {
    height: "30%",
    alignItems: "center",
    //backgroundColor: 'green',
    justifyContent: "center",
  },
  changeSectionContainer: {
    height: "20%",
    //backgroundColor: 'yellow',
    justifyContent: "center",
    paddingTop: 30,
  },
  changeContainer: {
    //flex: 1,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'pink'
  },
  spacing: {
    height: "10%",
  },
  logoutButtonContainer: {
    height: "10%",
    width: "100%",
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 50,
    paddingBottom: 50,
    fontSize: RFValue(35),
    //fontWeight: "700",
    fontFamily: 'Montserrat'
    //backgroundColor: 'white'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    borderWidth: 1,
    margin: 10,
  },
  avatarText: {
    fontSize: RFPercentage(2.5),
    fontFamily: 'Montserrat'
  },
  changeText: {
    fontSize: RFPercentage(2.4),
    fontFamily: 'Montserrat'
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
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'Montserrat'
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
    height: "15%",
    //backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginLeft: "10%",
    marginRight: "10%",
    //marginTop: "12%",
  },
  changeTitle: {
    //paddingTop: 50,
    //paddingBottom: 50,
    fontSize: RFValue(35),
    fontWeight: "500",
    fontFamily: 'Montserrat'
    //backgroundColor: 'white'
  },
  inputTypeTextContainer: {
    //height: '%',
    //backgroundColor: 'blue',
    justifyContent: "center",
    //alignItems: 'center',
    width: "70%",
    marginLeft: "10%",
    marginRight: "10%",
    //backgroundColor: 'green'
  },
  inputTypeText: {
    fontSize: RFValue(18),
    fontFamily: 'Montserrat',
    paddingBottom: "3%",
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
    height: "7%",
    width: 180,
    fontSize: RFPercentage(2),
    fontFamily: 'Montserrat',
    borderWidth: 1.75,
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    //paddingTop: 10,
    //paddingBottom: 10,
    textAlign: "center",
    borderColor: "black",
    //backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonContainer: {
    width: "100%",
    marginLeft: "5%",
    //marginTop: '12%',
    alignItems: "flex-start",
    //backgroundColor: 'red'
  },
  smallerSpacing: {
    height: "5%",
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
    updatePassword: (user, currentPassword, newPassword, confirmNewPassword) =>
      dispatch(
        updatePassword(user, currentPassword, newPassword, confirmNewPassword)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
