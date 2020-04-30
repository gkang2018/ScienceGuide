import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import InterestsCard from "../components/InterestsCard";
import { interestsData } from "../interestData";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { updateProfileInformation } from "../actions/actions";
import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../localization";

class UpdatingInterests extends Component {
  constructor(props) {
    super(props);

    this.snapshot = [];
    this.localize = new LocalizationService();
    this.localize.setI18nConfig();

    this.state = {
      subText: this.localize.translate("researchInterests.subtext1"),
      localizedData: [],
    };
  }

  changeSubText() {
    switch (this.props.interests.length) {
      case 3:
        return this.setState({
          subText: this.localize.translate("researchInterests.subtext4"),
        });
      case 2:
        return this.setState({
          subText: this.localize.translate("researchInterests.subtext3"),
        });
      case 1:
        return this.setState({
          subText: this.localize.translate("researchInterests.subtext2"),
        });
      default:
        return this.setState({
          subText: this.localize.translate("researchInterests.subtext1"),
        });
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back"),
    });
    this.changeSubText();
    this.localizeInterestData();

    this.snapshot = [...this.props.interests];
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  localizeInterestData = () => {
    let tempData = [...interestsData];
    for (let i = 0; i < tempData.length; i++) {
      tempData[i].interest = this.localize.translate(
        "interestData." + i.toString()
      );
      this.setState((prevState) => ({
        localizedData: [...prevState.localizedData, tempData[i]],
      }));
    }
  };

  componentDidUpdate(prevProps) {
    // if the length has changed then we update our subtext
    if (prevProps.interests.length != this.props.interests.length) {
      this.changeSubText();
    }
  }

  handleInterestsSelection = () => {
    const updatedInterests = [...this.props.interests];
    this.snapshot.sort();
    updatedInterests.sort();

    if (this.checkArraysEqual(updatedInterests, this.snapshot)) {
      this.props.navigation.goBack();
    } else {
      // have to update our database with the new array
      this.props
        .updateProfileInformation(
          this.props.user,
          "Interests",
          updatedInterests
        )
        .then(() => {
          Snackbar.show({
            text: this.localize.translate("snackbar.successUpdatedInterests"),
            backgroundColor: "green",
            duration: Snackbar.LENGTH_LONG,
          });
          this.props.navigation.goBack();
        })
        .catch((error) => {
          Snackbar.show({
            text: this.localize.translate("snackbar.errorUpdatedInterests"),
            backgroundColor: "red",
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
  };

  checkArraysEqual(arr1, arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    if (arr1 === arr2) {
      return true;
    }
    if (arr1 === null || arr2 === null) {
      return false;
    }
    // run through the lists
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  handleLocalizationChange = () => {
    this.localize
      .setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        Snackbar.show({
          text: this.localize.translate("snackbar.errorLocalization"),
          backgroundColor: "red",
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {this.localize.translate("researchInterests.title")}
          </Text>
          <Text style={styles.subHeading}>{this.state.subText}</Text>
          {/* <Button title={this.localize.translate("researchInterests.confirm")} onPress={this.confirm} /> */}
        </View>

        <View style={styles.lowerContainer}>
          <FlatList
            style={styles.flatList}
            data={this.state.localizedData}
            renderItem={({ item }) => (
              <View>
                <InterestsCard
                  interest={item.interest}
                  id={item.id}
                  image={item.image}
                />
                <View style={styles.interestTextContainer}>
                  <Text style={styles.interestText}>{item.interest}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
          <TouchableOpacity
            style={
              this.props.interests.length === 0
                ? styles.disabledSubmit
                : styles.submitButton
            }
            onPress={this.handleInterestsSelection}
            disabled={this.props.interests.length === 0 ? true : false}
          >
            <Text style={styles.textConfirm}>
              {this.localize.translate("icons.confirm")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.interests.selectedInterests,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileInformation: (user, type, changedInfo) =>
      dispatch(updateProfileInformation(user, type, changedInfo)),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    height: "25%",
    // flex: 1,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    height: "75%",
    //flex: 3.2,
    //paddingTop: '5%',
    alignItems: "center",
    //backgroundColor: 'yellow'
  },
  title: {
    fontSize: RFPercentage(5),
    //marginTop: 40,
    fontWeight: "700",
  },
  subHeading: {
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    //marginLeft: 15,
    //marginRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'grey'
  },
  itemContainer: {
    //flex: 1,
    flexDirection: "column",
    //justifyContent: 'space-between',
    //padding: 10,
    //marginBottom: 40,
    alignItems: "center",
    //justifyContent: 'center'
    //backgroundColor: 'red'
  },
  flatList: {
    width: "100%",
    //backgroundColor: 'green',
    flexDirection: "column",
    //marginBottom: '10%',
    //backgroundColor: 'transparent'
  },
  interestTextContainer: {
    width: 180,
    alignItems: "center",
    //backgroundColor: 'blue'
  },
  interestText: {
    //alignItems: "center",
    //marginBottom: '7%',
    //height: 40,
    //width: 180,
    //flexWrap: 'wrap',
    //flexShrink: 1,
    //fontSize: 4
    //marginLeft: 20,
    textAlign: "center",
    //backgroundColor: 'yellow',
    //alignItems: 'center'
  },
  componentGroup: {
    alignItems: "center",
    //justifyContent: 'center'
  },
  submitButton: {
    height: "10%",
    width: 250,
    fontSize: RFPercentage(2),
    //borderWidth: 1.75,
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    //paddingTop: 10,
    //paddingBottom: 10,
    textAlign: "center",
    //borderColor: "black",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "85%",
  },
  disabledSubmit: {
    height: "10%",
    width: 250,
    fontSize: RFPercentage(2),
    //borderWidth: 1.75,
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    //paddingTop: 10,
    //paddingBottom: 10,
    textAlign: "center",
    //borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "85%",
  },
  textConfirm: {
    fontSize: RFPercentage(2.5),
    color: "black",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdatingInterests);
