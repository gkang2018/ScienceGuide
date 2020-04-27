import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MentorDetail from "../screens/MentorDetail";
import { connect } from "react-redux";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { selectMentor } from "../actions/actions";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'
import Snackbar from "react-native-snackbar";


class DirectoryCard extends Component {
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
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      })
  }

  selectMentor() {
    // only select mentor if the user isn't signed in
    this.props.addMentor(this.props.name, this.props.id);
    // add the necessary info to redux
  }


  render() {
    const { props, name, expertise, email, imageUri, job, id } = this.props;
    expertiseString = expertise.join(", ");
    return (
      <View style={styles.formElement}>
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
          <View style={styles.formCard}>
            <View style={styles.details}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.text}>{job}</Text>
              <Text style={styles.text}>{this.localize.translate("mentorCard.expertise")}: {expertiseString}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  formElement: {
    //flex: 1,
    height: 200,
    width: '90%',
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 10,
    backgroundColor: 'red',
    borderWidth: .5,
    borderRadius: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  formCard: {
    height: 200,
    width: '100%',
    flexDirection: 'row',
    borderWidth: .5,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  details: {
     width: '100%',
     marginTop: '30%',
     marginRight: '3%',
     alignItems: 'flex-end'
  },
  text: {
    fontSize: 14,
    //fontSize: RFValue(15),
    paddingBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 5,
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryCard);
