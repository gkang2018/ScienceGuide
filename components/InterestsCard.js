import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { View, StyleSheet } from "react-native";

export default function InterestsCard(props, { navigation }) {
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: props.image }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
