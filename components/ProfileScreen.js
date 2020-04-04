import React, { Component } from "react";

import { View, Text, StyleSheet, Button } from "react-native";

import { connect } from "react-redux";
import { logout } from "../actions/actions";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleSignout = () => {
    this.props
      .logout()
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: "Unable to log out. Please try again" });
      });
  };

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <Button title="Logout" onPress={this.handleSignout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
