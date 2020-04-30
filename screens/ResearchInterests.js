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

class ResearchInterests extends Component {
  constructor(props) {
    super(props);

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
            contentContainerStyle={styles.flatList}
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
            onPress={() => this.props.navigation.navigate("Language")}
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
    flex: 1,
    height: "75%",
    //flex: 3.2,
    //paddingTop: '5%',
    alignItems: "center",
    //backgroundColor: 'yellow'
  },
  title: {
    fontSize: RFPercentage(5),
    //marginTop: 40,
    fontWeight: "500",
    fontFamily: "Montserrat",
  },
  subHeading: {
    fontSize: RFPercentage(3),
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'grey'
    fontFamily: "Montserrat-Light",
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
    //flex: 1,
    width: "100%",
    //backgroundColor: 'green',
    flexDirection: "column",
    //marginBottom: '10%',
    //backgroundColor: 'green',
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
    fontFamily: "Montserrat",
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
    backgroundColor: "#ffdd00",
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
    fontFamily: "Montserrat",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResearchInterests);
