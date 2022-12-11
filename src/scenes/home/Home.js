import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View,SafeAreaView} from "react-native";
import { NativeBaseProvider, Checkbox,FlatList ,HStack, Button, Image, Text,ScrollView,Box, } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
});

const Home = ({ navigation }) => (
  <NativeBaseProvider>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FlatList></FlatList>
    <ScrollView>
    
      <Box alignSelf="center" width="80" height="40" bg="primary.500" _text={{
      fontSize: "40",
      fontWeight: "medium",
      color: "warmGray.50",
      letterSpacing: "lg",
    }}
    rounded="xl"
    >
       Kolos</Box>
       

        <Text>
        Home Screen 
      </Text>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
      >
         <Text>Go</Text>
    </Button>
        
    </ScrollView>
  </LinearGradient>
  </NativeBaseProvider>
);

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Home.defaultProps = {
  navigation: { navigate: () => null },
};

export default Home;
