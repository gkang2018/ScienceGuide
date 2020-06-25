import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";
import DatabaseService from "../config/firebase";
import Snackbar from "react-native-snackbar";
import * as RNLocalize from "react-native-localize";
import LocalizationService from "../util/localization";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class MentorDetail extends Component {
  constructor(props) {
    super(props);

    this.db = new DatabaseService();
    this.localize = new LocalizationService();
    this.localize.setI18nConfig();
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.props.navigation.setOptions({
      headerBackTitle: this.localize.translate("icons.back"),
    });
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
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

  // checks if javascript object is empty
  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  onPress(id, name) {
    if (this.isEmpty(this.props.user)) {
      this.props.navigation.navigate("Signup");
    } else {
      // check if chat already exists
      this.db
        .chatExists(this.props.user.uid, id)
        .then((resp) => {
          if (resp !== true) {
            this.db
              .createChatRoom(this.props.user.uid, id)
              .then(() => {
                this.db.appendChatToUser(this.props.user.uid, id);
                this.props.navigation.navigate("ChatRoom", {
                  recipientName: name,
                  recipientID: id,
                });
              })
              .catch((error) => {
                Snackbar.show({
                  text: this.localize.translate("snackbar.errorStartChat"),
                  backgroundColor: "red",
                  duration: Snackbar.LENGTH_LONG,
                });
              });
          }
          this.props.navigation.navigate("ChatRoom", {
            recipientName: name,
            recipientID: id,
          });
        })
        .catch((error) => {
          Snackbar.show({
            text: this.localize.translate("snackbar.errorStartChat"),
            backgroundColor: "red",
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
  }

  renderResearchAreas() {
    let { expertise } = this.props.route.params;
    // expertise = expertise.split(",");
    return expertise.map((e) => {
      return (
        <View key={e} style={styles.researchArea}>
          <Text style={styles.researchText}>{e}</Text>
        </View>
      );
    });
  }

  render() {
    const {
      name,
      job,
      email,
      expertise,
      imageUri,
      id,
    } = this.props.route.params;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            {this.localize.translate("mentorDetail.title")}
          </Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.details}>
            <Image style={styles.imageStyle} source={imageUri} />
            <View style={styles.generalInfo}>
              <Text style={styles.name}>{name}</Text>

              <Text style={styles.position}>{job}</Text>

              <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => this.onPress(id, name)}>
                  <Text style={styles.buttonText}>
                    {this.localize.translate("mentorDetail.chat")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.researchAreas}>
            <Text style={styles.subHeading2}>
              {this.localize.translate("mentorDetail.areas")}:
            </Text>
            {this.renderResearchAreas()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    height: "20%",
    // flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'blue'
  },
  title: {
    fontSize: RFPercentage(4.5),
    fontWeight: "500",
    fontFamily: 'Montserrat'
    //paddingBottom: 20
  },
  lowerContainer: {
    height: "80%",
    //flex: 3.2,
    //paddingTop: '5%',
    //alignItems: "center",
    //justifyContent: 'center',
    //backgroundColor: 'pink'
  },
  details: {
    height: "25%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'red',
    //marginLeft: 35,
    //paddingBottom: 10,
    //marginRight: 125,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    marginRight: 20,
    margin: 10,
  },
  generalInfo: {
    flex: 1,
    //backgroundColor: 'yellow',
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 20,
  },
  name: {
    width: "100%",
    fontSize: RFPercentage(3.2),
    fontFamily: 'Montserrat',
    paddingBottom: 5,
  },
  position: {
    width: "100%",
    fontSize: RFPercentage(2.3),
    fontFamily: 'Montserrat',
    paddingBottom: 10,
  },
  buttonView: {
    height: "23%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 40,
    backgroundColor: "#ffdd00",
    borderRadius: 40,
  },
  buttonText: {
    //flex: 1,
    //height: 90,
    //width: 250,
    fontSize: RFPercentage(2.9),
    fontFamily: 'Montserrat',
    textAlign: "center",
  },
  researchAreas: {
    flex: 1,
    //backgroundColor: 'white',
    // marginTop: 50,
    marginLeft: 20,
    // marginRight: 40,
  },

  subHeading2: {
    fontSize: RFValue(20),
    fontFamily: 'Montserrat',
    paddingBottom: 15,
  },

  researchArea: {
    marginBottom: 20,
    //borderWidth: 1,
  },
  researchText: {
    fontSize: RFValue(18),
    fontFamily: 'Montserrat',
    paddingLeft: 40,
    //paddingBottom: 12,
    //paddingTop: 12,
    //backgroundColor: 'yellow'
    //textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(MentorDetail);
