import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MentorDetail from "../screens/MentorDetail";
import { connect } from "react-redux";
import { selectMentor } from "../actions/actions";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'

class MentorCard extends Component {
  constructor(props) {
    super(props);


    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)

  }
  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    this.localize.setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }

  selectMentor() {
    // only select mentor if the user isn't signed in
    this.props.addMentor(this.props.name, this.props.id);
    // add the necessary info to redux
  }


  render() {
    const { props, name, expertise, email, imageUri, job, id } = this.props;
    expertiseString = expertise.join(",");
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
            <Text style={styles.text}>{this.localize.translate("mentorCard.expertise")}: {expertiseString}</Text>
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
