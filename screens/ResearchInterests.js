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
import { updateProfileInformation } from "../actions/actions";
import { connect } from "react-redux";

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
            this.props.navigation.navigate("Profile");
          })
          .catch((error) => {
            console.log(error);
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
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Research Interests</Text>
          <Text style={styles.subHeading}>{this.state.subText}</Text>
          <Button title="Confirm" onPress={this.handleInterestsSelection} />
        </View>

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
        <TouchableOpacity
          style={styles.confirm}
          onPress={this.handleInterestsSelection}
        >
          <Text>Confirm</Text>
        </TouchableOpacity>
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
  title: {
    paddingLeft: 80,
    fontSize: 25,
    fontWeight: "700",
  },
  headerContainer: {
    marginTop: 75,
    marginBottom: 25,
  },
  subHeading: {
    paddingLeft: 50,
    paddingRight: 25,
    color: "gray",
    fontSize: 17,
    fontWeight: "500",
  },
  flatList: {
    marginBottom: 175,
  },
  confirm: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResearchInterests);
