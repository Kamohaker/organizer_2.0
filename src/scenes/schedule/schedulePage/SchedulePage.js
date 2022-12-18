import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,IconButton, Box,Flex,View,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon  from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";

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

const SchedulePage = ({route,navigation}) => {
  const from = route?.params?.from

 const url = 'http://192.168.0.188/organizer/index_schedule.php';//dom
 //const url = 'http://192.168.1.209/organizer/index_schedule.php';//aka


  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneKiedy,setKiedy] = useState('');



const postData = () =>{
  
  axios.post(url,{
    nazwa:daneNazwa,
    kiedy:daneKiedy
  }).then(response => console.log('dodano:',daneNazwa,daneKiedy),
   setNazwa(''),
   setKiedy(''),
   navigation.navigate('Plan zajęć'),
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
        navigation.navigate('Plan zajęć')
  }}></IconButton>
  <IconButton
       _icon={{
        color: '#16a34a',
        as: AntDesign,
        name: "check",
        size:8
      }}
      onPress={postData}
      ></IconButton>
  </HStack>
    </View>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Avatar my= "5" size={150} background={colors.green}>
         <Icon name="plus" size={70}  /> 
         </Avatar>
         <VStack py='4'>
         <Text fontSize={15} color={colors.limone}>
          Nazwa
        </Text>
        <Input value={daneNazwa} variant="rounded"  marginBottom={6} marginTop={2} placeholder="Nazwa" 
        w="50%" backgroundColor="#0c4a6e" borderColor="#a3e635" 
        onChangeText={text => setNazwa(text)} 
        _light={{
        placeholderTextColor: "#a3e635",
        color:colors.limone
        }} >
        </Input>
        <Text fontSize={15} color={colors.limone}>
          Data
        </Text>
        <Input value={daneKiedy} variant="rounded" marginBottom={6} marginTop={2} placeholder="Data" 
        w="50%" backgroundColor="#0c4a6e" borderColor="#a3e635" 
        keyboardType = 'numeric'
        onChangeText={text => setKiedy(text)} 
        _light={{
        placeholderTextColor: "#a3e635",
        color:colors.limone
        }} >
        </Input>
  
    </VStack>
    </LinearGradient>
    </NativeBaseProvider>
    )
};
SchedulePage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SchedulePage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default SchedulePage;