import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { englishSpeaker } from "../actions/actions";

class Language extends Component {
  constructor(props) {
    super(props);
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  checkUserStatus = () => {
    if (!this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("DirectoryPage")
    }
  };

  componentDidMount() {
    this.checkUserStatus()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.titleText}>Language Preference</Text>
          <Text style={styles.descriptionText}>
            Are you comfortable with English?
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formElement}>
            <TouchableOpacity
              onPress={() => {
                this.props.englishSpeaker(true);
                this.props.navigation.navigate("Areas");
              }}
            >
              <Text style={styles.formText}>Yes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formElement}>
            <TouchableOpacity
              onPress={() => {
                this.props.englishSpeaker(false);
                this.props.navigation.navigate("Areas");
              }}
            >
              <Text style={styles.formText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  formElement: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: 40,
    marginTop: 100,
    fontWeight: "700",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 17,
    marginTop: 20,
    textAlign: "center",
  },
  form: {
    marginTop: 280,
  },
  formText: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 15,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    englishSpeaker: state.englishSpeaker,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    englishSpeaker: (proficient) => dispatch(englishSpeaker(proficient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
