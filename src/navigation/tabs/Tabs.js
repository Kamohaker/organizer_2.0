import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigator,ProfileNavigator } from "../stacks/Stacks";
import Icon from "react-native-vector-icons/AntDesign"

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator

    initialRouteName="Home"

    screenOptions={({ route }) => ({

        headerShown: false,
        tabBarActiveTintColor:"#a3e635",
        tabBarStyle:{  
          backgroundColor:"#002851",
          position: 'absolute',
          paddingTop: 5,
          paddingBottom: 5,
          marginBottom:5,
          marginRight:15,
          marginLeft:15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15     
          },

        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "Home":
              return (
                <Icon
                  name="home"
                  color={focused ? "#a3e635" : "#9ca3af"}
                  size={22}
                  solid
                />
              );
            case "Profile":
              return (
                <Icon
                  name="user"
                  color={focused ? "#a3e635" : "#9ca3af"}
                  size={22}
                  solid
                />
              );
            default:
              return <View />;
          }
        },
      })}
  >
    
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
    
  </Tab.Navigator>
  
);


export default TabNavigator;
