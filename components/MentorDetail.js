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

class MentorDetail extends Component {
  constructor(props) {
    super(props);

    this.db = new DatabaseService();
  }

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
      if (!this.db.chatExists(this.props.user.uid, id)) {
        this.db
          .createChatRoom(this.props.user.uid, id)
          .then(() => {
            console.log("here");
            this.db.appendChatToUser(this.props.user.uid, id);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.props.navigation.navigate("ChatRoom", {
        recipientName: name,
        recipientID: id,
      });
    }
  }

  renderResearchAreas() {
    let { expertise } = this.props.route.params;
    expertise = expertise.split(",");
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
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Mentor Information</Text>
        </View>

        <View style={styles.details}>
          <Image style={styles.imageStyle} source={{ uri: imageUri }} />
          <View style={styles.generalInfo}>
            <Text style={styles.subHeading}>{name}</Text>
            <Text style={styles.text}>{job}</Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => this.onPress(id, name)}>
            <Text style={styles.button}>Start Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.researchAreas}>
          <Text style={styles.subHeading2}>Research Areas:</Text>
          {this.renderResearchAreas()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 80,
  },
  buttonView: {
    marginLeft: 155,
    marginRight: 40,
    paddingTop: 66,
  },
  subHeading: {
    fontSize: 20,
  },
  subHeading2: {
    fontSize: 20,
    paddingBottom: 15,
  },
  researchAreas: {
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  researchArea: {
    marginBottom: 30,
    borderWidth: 1,
  },
  researchText: {
    fontSize: 15,
    paddingBottom: 12,
    paddingTop: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  generalInfo: {
    marginTop: 20,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 35,
    paddingBottom: 10,
    marginRight: 125,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: 10,
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
  button: {
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(MentorDetail);
