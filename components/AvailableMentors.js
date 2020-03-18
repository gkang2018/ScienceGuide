import React, { Component } from "react";
import { View, Text } from "react-native";

import DatabaseService from "../config/firebase";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var dbb = new DatabaseService();
    dbb.getAllMentors();
  }

  render() {
    return (
      <View>
        <Text>Made it here</Text>
      </View>
    );
  }
}

export default AvailableMentors;
