import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

// import store

import configureStore from "./store";

const store = configureStore();

const Stack = createStackNavigator();

// import the components

import ResearchLevel from "./components/ResearchLevel";
import LandingPage from "./components/LandingPage";
import ResearchInterests from "./components/ResearchInterests";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="ResearchLevel" component={ResearchLevel} />
            <Stack.Screen
              name="ResearchInterests"
              component={ResearchInterests}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
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
