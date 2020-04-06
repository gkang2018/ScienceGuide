import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MentorDetail from "./MentorDetail";
import { connect } from "react-redux";
import { selectMentor } from "../actions/actions";

class MentorCard extends Component {
  constructor(props) {
    super(props);
  }

  selectMentor() {
    // only select mentor if the user isn't signed in
    this.props.addMentor(this.props.name, this.props.id);
    // add the necessary info to redux
  }

  render() {
    const { props, name, expertise, email, imageUri, job, id } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.selectMentor();
          props.navigation.navigate("MentorDetail", {
            name: name,
            expertise: expertise,
            email: email,
            imageUri: imageUri,
            job: job,
            id: id,
          });
        }}
      >
        <View style={styles.container}>
          <Image style={styles.imageStyle} source={{ uri: imageUri }} />
          <View style={styles.details}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{job}</Text>
            <Text style={styles.text}>Expertise: {expertise}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
  },
  imageContainer: {},
  details: {
    marginLeft: 35,
    paddingTop: 20,
    marginRight: 125,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    mentor: state.mentorName.mentor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMentor: (mentor, id) => dispatch(selectMentor(mentor, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorCard);
