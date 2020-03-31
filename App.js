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
import MentorDetail from "./components/MentorDetail";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import Login from "./components/Login";

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
          <Stack.Screen
            name="Home"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="Level"
            component={ResearchLevel}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="Interests"
            component={ResearchInterests}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="Areas"
            component={ResearchAreas}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="AvailableMentors"
            component={AvailableMentors}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="MentorDetail"
            component={MentorDetail}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
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
