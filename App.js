import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// import store

import configureStore from "./store";

const store = configureStore();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import the components

import ResearchLevel from "./components/ResearchLevel";
import LandingPage from "./components/LandingPage";
import ResearchInterests from "./components/ResearchInterests";
import ResearchAreas from "./components/ResearchAreas";
import AvailableMentors from "./components/AvailableMentors";
import MentorDetail from "./components/MentorDetail";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import Directory from "./components/Directory";
import MessagesScreen from "./components/MessagesScreen";
import ProfileScreen from "./components/ProfileScreen";
import ChatRoom from "./components/ChatRoom";

// do we need this import stil ????
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

function DirectoryPage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Directory") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Profile") {
            iconName = focused ? "md-person" : "md-person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Directory" component={Directory} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
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
