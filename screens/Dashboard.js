import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { logout } from "../actions/actions";
import { connect } from "react-redux";
import Video from 'react-native-video';

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
      <Video source={require("../assets/welcome-animation.mp4")}
        playInBackground={true} onError={(error) => console.log(error)} style={styles.backgroundVideo} onEnd={() => this.props.navigation.navigate("DirectoryPage")} />
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
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
