import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
Ionicons.loadFont();

// import store

import configureStore from "./store";

const store = configureStore();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import the components

import ResearchLevel from "./screens/ResearchLevel";
import LandingPage from "./screens/LandingPage";
import ResearchInterests from "./screens/ResearchInterests";
import ResearchAreas from "./screens/ResearchAreas";
import AvailableMentors from "./screens/AvailableMentors";
import MentorDetail from "./screens/MentorDetail";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import LoadingScreen from "./screens/LoadingScreen";
import Login from "./screens/Login";
import Language from "./screens/Language";
import ChatRoom from "./components/ChatRoom";
import DirectoryPage from "./screens/DirectoryPage"
// do we need this import stil ????
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
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Home"
            component={LandingPage}
            options={{ headerShown: false, gestureEnabled: false }}
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
            name="Language"
            component={Language}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerTransparent: true, headerTitle: "" }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="DirectoryPage"
            component={DirectoryPage}
            options={{
              gestureEnabled: false,
              headerTitle: "",
              headerTransparent: true,
              headerLeft: null,
            }}
          />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
