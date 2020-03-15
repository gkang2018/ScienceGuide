import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

export default function ResearchLevel({ navigation }) {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Research Level</Text>
        <Text style={styles.descriptionText}>
          Please select what level of research you have previously done.
        </Text>
      </View>
      <View style={styles.form}>
        <Text
          style={styles.formText}
          onPress={() => Alert.alert("I am a beginner")}
        >
          I am a beginner
        </Text>
        <Text
          style={styles.formText}
          onPress={() => navigation.navigate("Interests")}
        >
          I have some experience
        </Text>
        <Text
          style={styles.formText}
          onPress={() => Alert.alert("I am very experienced")}
        >
          I am very experienced
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 50
  },
  titleText: {
    fontSize: 40,
    marginBottom: 35
  },
  descriptionText: {
    fontSize: 20
  },
  form: {
    paddingLeft: 95,
    marginTop: 200
  },
  formText: {
    fontSize: 20,
    paddingBottom: 25
  }
});
