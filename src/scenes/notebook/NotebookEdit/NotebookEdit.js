import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider,IconButton,Input, Fab,Icon,Modal, VStack,TextArea, Button, Image, Text,Avatar, Box, HStack } from "native-base";
import axios from 'axios';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#0c4a6e"
   
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: "#0c4a6e"
  },
  title: {
    marginTop:10,
    fontSize: 20,
    marginBottom: 20,
  },
  boxes: {
    borderBottomWidth:40,
    borderTopWidth:40,
    borderLeftWidth:160,
    borderRightWidth:20,
    borderRadius:30,
    borderColor:"#701a75" ,
    backgroundColor:"#701a75",
    marginTop:10

  }
});


const NotebookEdit = ({route, navigation }) => {
  const from = route?.params?.from
 // const url = 'http://192.168.0.186/organizer/index_notebook.php';//dom
  //const url = 'http://192.168.1.209/organizer/index_notebook.php';//aka
  const url = 'http://192.168.0.156/organizer/index_notebook.php';//dom_KOMP
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneOpis,setOpis] = useState('');

  
  useEffect(()=>{
    const focusHandler = navigation.addListener('focus', () => {
      axios.get(url).then(response =>{
    
        setData(response.data) 
    
          })
        .catch(err=> console.log(err))
  } ); 
  return (focusHandler)
  },[])
  

  const putData = () =>{
    
    axios.put(url,{

      nazwa: route.params.nazwa,
      opis: daneOpis
      }).then(response => console.log('zmieniono:','nazwa:',route.params.nazwa,'opis:',daneOpis),
      navigation.navigate('Notatnik'),
      setNazwa(''),
      setOpis(''),
     ).catch(err=>console.log(err))
     
      
  }

const deleteData = () =>{
 
    axios.delete(url,{
data:{
      nazwa: route.params.nazwa,
      opis:  route.params.opis}
      }).then(response => {
      console.log('usunięto:','nazwa:',route.params.nazwa,'opis:', route.params.opis),

      navigation.navigate('Notatnik')
    }
     ).catch(err=>console.log(err))
     
      
  }
 
  return(
  <NativeBaseProvider>
    <View style={styles.ico}>
      <HStack space={300}>
    <IconButton
       _icon={{
        color: '#dc2626',
        as: AntDesign,
        name: "back",
        size:8
      }}
      onPress={() => {
        navigation.navigate('Notatnik')
  }}></IconButton>
  <IconButton
       _icon={{
        color: '#16a34a',
        as: AntDesign,
        name: "check",
        size:8
      }}
      onPress={putData}></IconButton>
  </HStack>
    </View>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

    <TextArea   defaultValue= {route.params.nazwa} h={50} fontSize={20}  onChangeText={text => setNazwa(text)} />
    <TextArea  defaultValue= {route.params.opis } shadow={2} h={600}  fontSize={15}  onChangeText={text => setOpis(text)} />
    <Fab  shadow={4} right={50} bgColor={'#002851'} onPress={deleteData
        }
          icon={<Icon color="#dc2626" as={AntDesign} name="delete" size="lg" />} 
    />
    </LinearGradient>
  </NativeBaseProvider>
)};

NotebookEdit.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

NotebookEdit.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
};

export default NotebookEdit;
