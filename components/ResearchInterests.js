import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import InterestsCard from "./InterestsCard";
import { interestsData } from "../interestData";

import { connect } from "react-redux";

class ResearchInterests extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    subText: "Select up to three research areas you are interested in"
  };

  changeSubText() {
    switch (this.props.interests.length) {
      case 3:
        return this.setState({
          subText: "You may review your selections in the next screen"
        });
      case 2:
        return this.setState({
          subText: "Select one more research area you are interested in"
        });
      case 1:
        return this.setState({
          subText: "Select two more reseach areas you are interested in"
        });
      default:
        return this.setState({
          subText: "Select up to three research areas you are interested in "
        });
    }
  }

  componentDidMount() {
    // sets our next button
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Confirm"
          onPress={() => {
            this.props.navigation.navigate("Language");
          }}
        ></Button>
      )
    });

    this.changeSubText();
  }

  componentDidUpdate(prevProps) {
    // if the length has changed then we update our subtext
    if (prevProps.interests.length != this.props.interests.length) {
      this.changeSubText();
    }
  }

  render() {

    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Research Interests</Text>
          <Text style={styles.subHeading}>{this.state.subText}</Text>
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
          keyExtractor={item => item.id}
          numColumns={2}
        />
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
  title: {
    paddingLeft: 80,
    fontSize: 25,
    fontWeight: "700"
  },
  headerContainer: {
    marginTop: 75,
    marginBottom: 25
  },
  subHeading: {
    paddingLeft: 50,
    paddingRight: 25,
    color: "gray",
    fontSize: 17,
    fontWeight: "500"
  },
  flatList: {
    marginBottom: 175
  }
});

export default connect(mapStateToProps, null)(ResearchInterests);
