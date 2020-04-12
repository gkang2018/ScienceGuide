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
          <Button title="Confirm" onPress={this.handleInterestsSelection} />
        </View>

        <View style={styles.lowerContainer}>
          <FlatList
            style={styles.flatList}
            data={interestsData}
            renderItem={({ item }) => (
              <View>
                <InterestsCard
                  interest={item.interest}
                  id={item.id}
                  image={item.image}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
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
    flex: 1,
    marginTop: "0%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    flex: 3,
    //marginTop: '5%',
    alignItems: "center",
    //backgroundColor: 'pink'
  },
  title: {
    fontSize: RFPercentage(5),
    marginTop: "15%",
    fontWeight: "700",
  },
  subHeading: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    //backgroundColor: 'red'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResearchInterests);
