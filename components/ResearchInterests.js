import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import InterestsCard from "./InterestsCard";
import { interestsData } from "../interestData";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
            this.props.navigation.navigate("Areas");
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
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Research Interests</Text>
          <Text style={styles.subHeading}>{this.state.subText}</Text>
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
            keyExtractor={item => item.id}
            numColumns={2}
          />
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
  headerContainer: {
    flex: 1,
    marginTop: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue'
  },
  lowerContainer: {
    flex: 3,
    //marginTop: '5%',
    alignItems: 'center',
    //backgroundColor: 'pink'
  },
  title: {
    fontSize: RFPercentage(5),
    marginTop: '15%',
    fontWeight: "700"
  },
  subHeading: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList: {
    width: '100%',
    //backgroundColor: 'red'
  },
});

export default connect(mapStateToProps, null)(ResearchInterests);
