import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,IconButton,Icon, Box,Flex,View,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import Fot  from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#0c4a6e"
   
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom:10
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: "#0c4a6e"
  },
});

const WalletEdit = ({route,navigation}) => {
  const from = route?.params?.from

 //const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
  const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka
 // const url = 'http://192.168.0.156/organizer/index_wallet.php';//dom_KOMP

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneNumTel,setNumTel] = useState('');
  const [daneNumKon,setNumKon] = useState('');


const putData = () =>{
    
  axios.put(url,{

    nazwa: route.params.nazwa,
    num_telefonu:daneNumTel,
    num_konta:daneNumKon
    }).then(response => console.log('zmieniono:','nazwa:',route.params.nazwa,'numer_tel:',daneNumTel,'num_kon:',daneNumKon),
    navigation.navigate('Portfel'),
   
   ).catch(err=>console.log(err))
   
    
}

const deleteData = () =>{

  axios.delete(url,{
data:{
    nazwa: route.params.nazwa,
    num_konta:  route.params.num_konta,
    num_telefonu:route.params.num_telefonu}
    }).then(response => {
    console.log('usunięto:','nazwa:',route.params.nazwa,'num_k:', route.params.num_konta,'num:',route.params.num_telefonu),

    navigation.navigate('Portfel')
  }
   ).catch(err=>console.log(err))
   
    
}
  return (
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
        navigation.navigate('Portfel')
  }}></IconButton>
  <IconButton
       _icon={{
        color: '#16a34a',
        as: AntDesign,
        name: "check",
        size:8
      }}
      onPress={putData}
      ></IconButton>
  </HStack>
    </View>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Avatar my= "5" size={150} background="#002851">
         <Fot name="edit" size={70} color="#a3e635" /> 
         </Avatar>
        
        <Input defaultValue= {route.params.nazwa} variant="rounded" mx="3" my= "5" placeholder="Nazwa" 
        w="50%" backgroundColor="#0c4a6e" borderColor="#a3e635" 
        onChangeText={text => setNazwa(text)} 
        _light={{
        placeholderTextColor: "#a3e635"
      
        }} >
        </Input>
        <Input defaultValue = {route.params.num_telefonu} variant="rounded" mx="3" my= "5" 
        placeholder="Numer telefonu" w="50%" backgroundColor="#0c4a6e" 
        borderColor="#a3e635" 
        onChangeText={text => setNumTel(text)} 
        _light={{
        placeholderTextColor: "#a3e635"
        }} >
        </Input>
        <Input defaultValue= {route.params.num_konta} variant="rounded" mx="3" my= "5"
         placeholder="Numer konta" w="50%" backgroundColor="#0c4a6e"
          borderColor="#a3e635" 
          onChangeText={text => setNumKon(text)} 
        _light={{
        placeholderTextColor: "#a3e635"
        }} >
        </Input>
    <Fab  bgColor={'#002851'} onPress={deleteData}
     icon={<Icon color="#dc2626" as={AntDesign} name="delete" size="lg" />}
    />
    </LinearGradient>
    </NativeBaseProvider>
    )
};
WalletEdit.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

WalletEdit.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default WalletEdit;