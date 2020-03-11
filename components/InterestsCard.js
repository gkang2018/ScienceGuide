import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet, useState } from "react-native";

export default function InterestsCard(props, { navigation }) {
  const selectedLevel = props.interest;
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: props.image }} />
        <Card.Title title={selectedLevel} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button onPress={props.onAddSelected.bind(this, selectedLevel)}>
            Ok
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
