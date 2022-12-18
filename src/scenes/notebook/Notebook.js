import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider,Pressable,Fab,Icon,Modal, VStack,TextArea, Button, Image, Text,Avatar, Box, HStack, FlatList } from "native-base";
import axios from 'axios';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme";
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
  boxes: {
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:30,
    borderColor:colors.darkLimone ,
    backgroundColor:colors.limone,
    marginTop:10,
    width:220,
    height:120,
    alignItems:'center',
    paddingTop:12
  }
});

const Notebook = ({ route, navigation }) => {
  const from = route?.params?.from
  const [data, setData] = useState([]);
const url = 'http://192.168.0.188/organizer/index_notebook.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_notebook.php';//aka
// const url = 'http://192.168.0.156/organizer/index_notebook.php';//dom_KOMP

  
  useEffect(()=>{
    const focusHandler = navigation.addListener('focus', () => {
      axios.get(url).then(response =>{
    
        setData(response.data) 
       // console.log(response.data)
    
          })
        .catch(err=> console.log(err))
  } ); 
  return (focusHandler)
  },[])

 const onSubmit=()=>
  {

    navigation.navigate('NotatnikStrona')
  }
  return(
  <NativeBaseProvider>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      
      <FlatList
      data={data}
      renderItem={({ item })=>(
        <Pressable onPress={() =>
          navigation.navigate('NotatnikEdytuj',{nazwa:item.nazwa , opis:item.opis})
        }>
      <Box style={styles.boxes}>
          <Text style={styles.title}numberOfLines={1} ellipsizeMode='tail' >
              {item.nazwa}
          </Text>
          <Text color='#002851' numberOfLines={1} ellipsizeMode='tail'>{item.opis}</Text>
      </Box>
      </Pressable>
    )}

    keyExtractor={(item)=>item.id.toString()}
    
    >

    </FlatList>
   
    <Fab  shadow={4} right={50} bgColor={'#002851'} onPress={onSubmit
        }
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} 
    />
  
    </LinearGradient>
  </NativeBaseProvider>
)};

Notebook.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Notebook.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Notebook;
