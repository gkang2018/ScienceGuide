import React, { Component } from "react";
import { StyleSheet, Image, Text, Button, View, Alert, Dimensions} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//Get screen width using Dimensions component 
var {width} = Dimensions.get('window');

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>

          <View style = {styles.logoContainer}>
            <Image resizeMode = 'cover' style = {styles.imageContainer}
              source={require('../assets/logo-main-360.png')}
            />
          </View>


          <View style={styles.functionContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Level")}>
              <Text style={styles.startingButton}>Let's get started!</Text>
            </TouchableOpacity>

            <Text style={styles.smallText}>Already have an account?</Text>

            <Text style={styles.signIn} onPress={() => this.props.navigation.navigate("Login")}>
              Sign In
            </Text>

            <Text style={styles.smallText}>Interested in being a Mentor?</Text>
            
            <Text style={styles.signIn} //onPress={() => this.props.navigation.navigate("Login")}
            >
              Contact Us
            </Text>
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logoContainer: {
    flex: 2.5
  },
  imageContainer: {
    overflow: 'visible',
    height: 350,
    width: 350,
    maxWidth: width * .9,
    marginTop: 175

  },
  functionContainer: {
    flex: 1,
    alignItems: "center",
  },
  smallText: {
    marginTop: 20,
    fontSize: 17
  },
  signIn: {
    textDecorationLine: "underline",
    fontSize: 17
  },
  startingButton: {
    borderColor: "black",
    borderWidth: 1.75,
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    textAlign: "center"
  }
});

export default LandingPage;
