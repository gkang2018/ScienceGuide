import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { logout } from "../actions/actions";
import { connect } from "react-redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      gestureEnabled: false,
      headerTitle: "",
      headerTransparent: true,
      headerLeft: null
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("DirectoryPage")}
      >
        <View style={styles.heading}>
          <Text style={styles.title}>Welcome to Science Guide</Text>
          <Text>{this.state.error}</Text>
        </View>
      </TouchableOpacity>
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
