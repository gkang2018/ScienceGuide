import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { login } from "../actions/actions";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: ""
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleLogin = () => {
    this.props.login(this.state.email, this.state.password);
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Login Page</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={this.handlePassword}
          />
          <Button title="Login" onPress={this.handleLogin} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 90,
    marginBottom: 50,
    marginLeft: 90
  },
  title: {
    fontSize: 30,
    fontWeight: "600"
  },
  form: {
    textAlign: "center",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 55,
    marginBottom: 15,
    height: 40,
    width: 260
  }
});

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Login);
