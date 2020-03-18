import React, { Component } from "react";
import { View, Text } from "react-native";
import { db } from "../config/firebase";

class AvailableMentors extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var check = db
      .collection("mentors")
      .doc("PYt0gxrJgGatLLU9k28x")
      .get();

    console.log(check);
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //     } else {
    //       console.log("no such document");
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Error getting document", error);
    //   });
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
