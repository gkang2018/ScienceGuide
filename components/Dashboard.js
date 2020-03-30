import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../actions/actions";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  handleSignout = () => {
    this.props.logout();
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.heading}>
        <Text>Welcome to Science Guide</Text>
        <Button title="Log Out" onPress={this.handleSignout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    margin: 75
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
