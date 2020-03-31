import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../actions/actions";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null
  };

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

  componentDidMount() {
    this.props.navigation.setOptions({
      gestureEnabled: false,
      headerTitle: "",
      headerLeft: null,
      headerRight: () => <Button title="Logout" onPress={this.handleSignout} />
    });
  }

  render() {
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>Welcome to Science Guide</Text>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    margin: 75
  },
  title: {
    fontSize: 25,
    marginBottom: 25
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
