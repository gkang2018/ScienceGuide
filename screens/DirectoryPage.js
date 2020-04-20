import React, { Component } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as RNLocalize from 'react-native-localize'
import LocalizationService from '../localization'
import Snackbar from "react-native-snackbar";

Ionicons.loadFont();


import DirectoryScreen from "./DirectoryScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();



class DirectoryPage extends Component {
    constructor(props) {
        super(props)
        this.localize = new LocalizationService()
        this.localize.setI18nConfig()
    }

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange)
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange)
    }

    handleLocalizationChange = () => {
        this.localize.setI18nConfig()
            .then(() => this.forceUpdate())
            .catch(error => {
                console.error(error)
                Snackbar.show({
                    text: this.localize.translate("snackbar.errorLocalization"),
                    backgroundColor: "red",
                    duration: Snackbar.LENGTH_LONG,
                });
            })
    }

    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === this.localize.translate("icons.directory")) {
                            iconName = focused
                                ? "ios-information-circle"
                                : "ios-information-circle-outline";
                        } else if (route.name === this.localize.translate("icons.messages")) {
                            iconName = focused ? "ios-list-box" : "ios-list";
                        } else if (route.name === this.localize.translate("icons.profile")) {
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
                <Tab.Screen name={this.localize.translate("icons.directory")} component={DirectoryScreen} />
                <Tab.Screen name={this.localize.translate("icons.messages")} component={MessagesScreen} />
                <Tab.Screen name={this.localize.translate("icons.profile")} component={ProfileScreen} />
            </Tab.Navigator>
        );
    }

}

export default DirectoryPage