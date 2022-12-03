import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, VStack, Button, Image, Text,ScrollView } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#0c4a6e"
   
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
});

const Timetable = ({ navigation }) => (
  <NativeBaseProvider>
   <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

   </LinearGradient>
  </NativeBaseProvider>
);

Timetable.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Timetable.defaultProps = {
  navigation: { navigate: () => null },
};

export default Timetable;
