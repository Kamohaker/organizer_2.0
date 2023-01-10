import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { NativeBaseProvider,IconButton, VStack,TextArea, HStack } from "native-base";
import axios from 'axios';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.grayBlue
   
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: colors.grayBlue
  },
  
});


const NotebookPage = ({route, navigation }) => {
  const from = route?.params?.from

  //const url = 'http://192.168.0.186/organizer/index_notebook.php';//dom
  const url = 'http://192.168.1.209/organizer/index_notebook.php';//aka
 
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneOpis,setOpis] = useState('');


  const postData = () =>{
  
    axios.post(url,{
      nazwa:daneNazwa,
      opis:daneOpis
    }).then(response => console.log('dodano:',daneNazwa,daneOpis),
    navigation.navigate('Notatnik'),
    setNazwa(''),
    setOpis(''),
    ).catch(err=>console.log(err))
  }


  return(
  <NativeBaseProvider>
    <View style={styles.ico}>
      <HStack space={300}>
        <IconButton
        _icon={{
        color: colors.red,
        as: AntDesign,
        name: "back",
        size:8
        }}
        onPress={() => {
          navigation.navigate('Notatnik')
        }}></IconButton>
        <IconButton
        _icon={{
        color: colors.green,
        as: AntDesign,
        name: "check",
        size:8
        }}
        onPress={postData}></IconButton>
      </HStack>
    </View>
    <LinearGradient
        colors={[colors.grayBlue, colors.whiteBlue]}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <TextArea value={daneNazwa} placeholder="Tytuł" color={colors.limone} h={50} fontSize={20}  onChangeText={text => setNazwa(text)} />
      <TextArea value={daneOpis}  placeholder="Zacznij pisać" color={colors.limone}  h={600} fontSize={13}  onChangeText={text => setOpis(text)} />
    </LinearGradient>
  </NativeBaseProvider>
)};

NotebookPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

NotebookPage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
};

export default NotebookPage;
