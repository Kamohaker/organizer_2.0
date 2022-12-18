import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Input,Button,IconButton, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Icons  from "react-native-vector-icons/AntDesign";
import { colors } from "../../../theme";

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

  boxes: {
    borderBottomWidth:2 ,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderRadius:30,
    borderColor:"#701a75" ,
    backgroundColor:"#701a75",
    marginTop:10

  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: "#0c4a6e"
  },
});


const LecturesEdit = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.188/organizer/index_lectures.php';//dpm
  //const url = 'http://192.168.1.209/organizer/index_lectures.php';//aka
  //const url = 'http://192.168.0.156/organizer/index_lectures.php';//dom_KOMP
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneStopien,setStopien] = useState('');
  const [daneNumPok,setNumPok] = useState('');
 
  
  const putData = () =>{
    
    axios.put(url,{
  
      nazwa: route.params.nazwa,
      stopien:daneStopien,
      num_pokoju:daneNumPok
      }).then(response => console.log('zmieniono:','nazwa:',route.params.nazwa,'mail:',daneStopien),
      navigation.navigate('Prowadzący'),
     
     ).catch(err=>console.log(err))
     
  }
  
  const deleteData = () =>{
  
    axios.delete(url,{
  data:{
      nazwa: route.params.nazwa,
      stopien:  route.params.stopien,
     }
      }).then(response => {
      console.log('usunięto:','nazwa:',route.params.nazwa,'mail:', route.params.stopien),
  
      navigation.navigate('Prowadzący')
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
        navigation.navigate('Prowadzący')
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
        <Avatar my= "5" size={150} background={colors.yellow}>
         <Icons name="edit" size={70}  /> 
         </Avatar>
        <VStack py='4'>
        <Text fontSize={15} color={colors.limone}>
         Nazwa
        </Text>
        <Input isDisabled defaultValue= {route.params.nazwa} variant="rounded" marginBottom={6} marginTop={2} placeholder="Nazwa" 
        w="50%" backgroundColor="#0c4a6e" borderColor="#a3e635" 
        onChangeText={text => setNazwa(text)} 
        _light={{
        placeholderTextColor: "#a3e635",
        color:colors.limone
        }} >
        </Input>
        <Text fontSize={15} color={colors.limone}>
         Edytuj stopień
        </Text>
        <Input defaultValue= {route.params.stopien} variant="rounded" marginBottom={6} marginTop={2} 
        placeholder="Stopień" w="50%" backgroundColor="#0c4a6e" 
        borderColor="#a3e635" 
        onChangeText={text => setStopien(text)} 
        _light={{
        placeholderTextColor: "#a3e635",
        color:colors.limone
        }} >
        </Input>
        <Text fontSize={15} color={colors.limone}>
         Edytuj numer pokoju
        </Text>
        <Input defaultValue= {route.params.num_pok} variant="rounded" marginBottom={6} marginTop={2} 
        placeholder="Numer pokoju" w="50%" backgroundColor="#0c4a6e" 
        borderColor="#a3e635" 
        onChangeText={text => setNumPok(text)} 
        _light={{
        placeholderTextColor: "#a3e635",
        color:colors.limone
        }} >
        </Input>
        </VStack>
        <Fab  bgColor={'#002851'} onPress={deleteData}
     icon={<Icon color="#dc2626" as={AntDesign} name="delete" size="lg" />}
    />
    
    </LinearGradient>
    </NativeBaseProvider>
    )
};
LecturesEdit.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LecturesEdit.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default LecturesEdit;