import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user == {}) {
      return <Spinner visible={true} textContent={"Loading..."} />;
    }
    return (
      <View style={styles.heading}>
        <Text>Welcome to Science Guide, {this.props.user.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    margin: 50
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Dashboard);
