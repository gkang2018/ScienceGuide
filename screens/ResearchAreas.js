import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'
import Snackbar from "react-native-snackbar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class ResearchAreas extends Component {
  constructor(props) {
    super(props);

    this.localize = new LocalizationService()
    this.localize.setI18nConfig()
  }

  state = {
    firstInterest: "",
    secondInterest: "",
    thirdInterest: ""
  };

  componentDidMount() {
    this.setInterests();
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back")
    })
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

  // take our interests from redux store and populate them in our research area page

  setInterests() {
    this.props.interests.forEach((interest, index) => {
      switch (index) {
        case 0:
          this.setState({ firstInterest: interest });
          break;
        case 1:
          this.setState({ secondInterest: interest });
          break;
        case 2:
          this.setState({ thirdInterest: interest });
          break;
      }
    });
  }

  render() {
    return (
      <View style = {styles.mainContainer}>
        
          <View style={styles.heading}>
            <Text style={styles.title}>{this.localize.translate("researchAreas.title")}</Text>
          </View>


          <View style={styles.areasContainer}>
            <View style={styles.firstArea}>
              <Text style={styles.firstInterest}>
                {this.state.firstInterest}
              </Text>
            </View>

            <View style={styles.secondArea}>
              <Text style={styles.secondInterest}>
                {this.state.secondInterest}
              </Text>
            </View>

            <View style={styles.thirdArea}>
              <Text style={styles.thirdInterest}>
                {this.state.thirdInterest}
              </Text>
            </View>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("AvailableMentors")}>
              <View style={styles.matchButton}>
                <Text style={styles.matchText}>{this.localize.translate("researchAreas.findMentor")}</Text>
              </View>
            </TouchableOpacity>
          </View>



       
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    interests: state.interests.selectedInterests
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  heading: {
    flex: 1,
    marginTop: '15%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    //backgroundColor: 'blue'
  },
  title: {
    fontSize: RFPercentage(5),
    //    fontSize: 40,
    marginTop: '10%',
    fontWeight: "700",
    textAlign: 'center',
  },
  areasContainer: {
    flex: 3,
    //flexDirection: "row",
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },

  firstArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2,
    position: 'absolute',
    top: 20,
    left: 20,

  },
  secondArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2,
    position: 'absolute',
    top: 300,
    left: 150,
  },
  thirdArea: {
    width: 115,
    height: 115,
    borderWidth: 1,
    borderRadius: 115 / 2,
    position: 'absolute',
    top: 20,
    left: 300,
  },
  firstInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },
  secondInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },
  thirdInterest: {
    paddingLeft: 20,
    paddingTop: 50
  },


  matchButton: {
    width: 125,
    height: 125,
    borderWidth: 1,
    borderRadius: 125 / 2,
    //marginLeft: 115,
    marginBottom: 50,
    backgroundColor: 'green',
    //position: 'absolute',
  },
  matchText: {
    paddingLeft: 20,
    paddingTop: 50,
    fontSize: 15,
    fontWeight: "700"
  }
});

export default connect(mapStateToProps, null)(ResearchAreas);
