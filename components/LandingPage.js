import React, { Component } from "react";
import { StyleSheet, Image, Text, Button, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Science Guide</Text>
        <Image
          style={{ width: 350, height: 350, marginBottom: 80 }}
          source={require('../assets/logo-main.png')}
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
          <Text style={styles.smallText}>Interested in being a Mentor?</Text>
          <Text
            style={styles.signIn}
            //onPress={() => this.props.navigation.navigate("Login")}
          >
            Contact Us
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
    alignItems: "center",
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
    borderWidth: 1.75,
    borderRadius: 30,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 23,
    textAlign: "center"
  }
});

export default LandingPage;
