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

class ResearchInterests extends Component {
  constructor(props) {
    super(props);

    this.snapshot = [];

    this.state = {
      subText: "Select up to three research areas you are interested in",
      loggedIn: false,
    };
  }

  changeSubText() {
    switch (this.props.interests.length) {
      case 3:
        return this.setState({
          subText: "You may review your selections in the next screen",
        });
      case 2:
        return this.setState({
          subText: "Select one more research area you are interested in",
        });
      case 1:
        return this.setState({
          subText: "Select two more reseach areas you are interested in",
        });
      default:
        return this.setState({
          subText: "Select up to three research areas you are interested in ",
        });
    }
  }

  // checks if javascript object is empty
  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentDidMount() {
    if (this.isEmpty(this.props.user)) {
      this.setState({ loggedIn: false });
    } else {
      this.snapshot = [...this.props.interests];
      this.setState({ loggedIn: true });
    }

    this.changeSubText();
  }

  componentDidUpdate(prevProps) {
    // if the length has changed then we update our subtext
    if (prevProps.interests.length != this.props.interests.length) {
      this.changeSubText();
    }
  }

  handleInterestsSelection = () => {
    console.log(this.state);
    if (this.state.loggedIn === false) {
      this.props.navigation.navigate("Areas");
    } else {
      // check if the user is confirming their research interests but they never changed them

      const updatedInterests = [...this.props.interests];
      this.snapshot.sort();
      updatedInterests.sort();

      if (this.checkArraysEqual(updatedInterests, this.snapshot)) {
        this.props.navigation.navigate("Profile");
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
              text: "Successfully updated your interests",
              backgroundColor: "green",
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate("Profile");
          })
          .catch((error) => {
            console.log(error);
            Snackbar.show({
              text: error.message,
              backgroundColor: "red",
              duration: Snackbar.LENGTH_LONG,
            });
          });
      }
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Research Interests</Text>
          <Text style={styles.subHeading}>{this.state.subText}</Text>
        </View>

        <View style={styles.lowerContainer}>
          <FlatList
            style={styles.flatList}
            data={interestsData}
            contentContainerStyle={styles.itemContainer}
            renderItem={({ item }) => (
              <View style={styles.componentGroup}>
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
          <TouchableOpacity style={styles.submitButton} onPress={this.handleInterestsSelection}>
            <Button title="Confirm" onPress={this.handleInterestsSelection} />
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
    //backgroundColor: "pink",
  },
  headerContainer: {
    height: '25%',
    // flex: 1,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    height: '75%',
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
    flexDirection: 'column',
    //justifyContent: 'space-between',
    //padding: 10,
    //marginBottom: 40,
    alignItems: 'center',
    //justifyContent: 'center'
    //backgroundColor: 'red'
  },
  flatList: {
    width: "100%",
    //backgroundColor: 'green',
    flexDirection: 'column',
    //marginBottom: '10%',
    //backgroundColor: 'transparent'
  },
  interestTextContainer: {
    width: 180,
    alignItems: 'center',
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
    textAlign: 'center',
    //backgroundColor: 'yellow',
    //alignItems: 'center'
  },
  componentGroup: {
    alignItems: 'center',
    //justifyContent: 'center'
  },
  submitButton: {
    height: '10%',
    width: 250,
    fontSize: RFPercentage(2),
    borderWidth: 1.75,
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    //paddingTop: 10,
    //paddingBottom: 10,
    textAlign: "center",
    borderColor: "black",
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '85%'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResearchInterests);
