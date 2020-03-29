import React, { Component } from "react";
import { StyleSheet, Image, Text, Button, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatabaseService from "../config/firebase";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.db = new DatabaseService();
  }

  componentDidMount() {
    this.db.auth.onAuthStateChanged(user => {
      if (user) {
        // populate user
        console.log(user);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Science Guide</Text>
        <Image
          style={{ width: 250, height: 250, marginBottom: 80 }}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        />
        <View style={styles.smallTextContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Level")}
          >
            <Text style={styles.startingButton}>Let's get started!</Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>Already have an account?</Text>
          <Text
            style={styles.signIn}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  smallTextContainer: {
    marginBottom: 60,
    alignItems: "center"
  },
  smallText: {
    marginTop: 20
  },
  title: {
    flex: 1,
    marginTop: 60,
    fontWeight: "bold",
    fontSize: 30,
    color: "black"
  },
  signIn: {
    textDecorationLine: "underline"
  },
  startingButton: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    textAlign: "center"
  }
});

export default LandingPage;
