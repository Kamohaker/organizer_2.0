import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, VStack, Button, Image, Text,Avatar } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#0c4a6e"
   
  },
  title: {
    marginTop:10,
    fontSize: 20,
    marginBottom: 20,
  },
});

const Profile = ({ navigation }) => (
  <NativeBaseProvider>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <Text style={styles.title}>
        Profile Screen 
      </Text>
      <Avatar bg="green.500" size="2xl">
        User
      </Avatar>
     
    </LinearGradient>
  </NativeBaseProvider>
);

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Profile.defaultProps = {
  navigation: { navigate: () => null },
};

export default Profile;
