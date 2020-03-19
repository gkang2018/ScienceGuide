import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

// import store

import configureStore from "./store";

const store = configureStore();

const Stack = createStackNavigator();

// import the components

import ResearchLevel from "./components/ResearchLevel";
import LandingPage from "./components/LandingPage";
import ResearchInterests from "./components/ResearchInterests";
import ResearchAreas from "./components/ResearchAreas";
import AvailableMentors from "./components/AvailableMentors";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LandingPage} />
          <Stack.Screen name="Level" component={ResearchLevel} />
          <Stack.Screen name="Interests" component={ResearchInterests} />
          <Stack.Screen name="Areas" component={ResearchAreas} />
          <Stack.Screen name="AvailableMentors" component={AvailableMentors} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
