import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,Pressable, Box,Flex,View,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, Icon,NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
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
});

const Wallet = ({route,navigation}) => {
  const from = route?.params?.from

 //const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka
  const url = 'http://192.168.0.156/organizer/index_wallet.php';//dom_KOMP

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneNumTel,setNumTel] = useState('');
  const [daneNumKon,setNumKon] = useState('');


 function getFirstLetterFrom(value) {
  return value.slice(0, 1).toUpperCase();
}
 
function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
}

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


  return (
  <NativeBaseProvider>
    
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <HStack space={[2, 3]} justifyContent="space-between">
        <Text style= {styles.title}>
          nazwa
        </Text>
        <Divider orientation="vertical" mx="3" _light={{
          bg: "muted.800"
        }}  />
        <Text style= {styles.title}>
          numer telefonu
        </Text>
        <Divider orientation="vertical" mx="3" _light={{
          bg: "muted.800"
        }}  />
        <Text style= {styles.title}>
          numer konta
        </Text>
       
      </HStack>
      <Divider orientation="horizontal" my="3" _light={{
          bg: "muted.800"
        }}  />
     
        <FlatList data={data} renderItem={({item}) => 
          <VStack>
            <HStack space={[2, 3]} justifyContent="space-between">
              
            
              <Avatar size="60px" mx="4" backgroundColor={randomColor()}>{getFirstLetterFrom(item.nazwa)}</Avatar>
             <Pressable onPress={() =>
          navigation.navigate('PortfelEdytuj',{nazwa:item.nazwa , num_konta:item.num_konta, num_telefonu:item.num_telefonu})
        }>
                <Text  numberOfLines={1} ellipsizeMode='tail' color="#ea580c" bold>
                  {item.nazwa}
                </Text>
                </Pressable>
                <Divider orientation="vertical" mx="4" _light={{
          bg: "muted.800"
        }}  />
                <Text numberOfLines={1} ellipsizeMode='tail'>
                  {item.num_telefonu}
            
                </Text>
                <Divider orientation="vertical" mx="4" _light={{
          bg: "muted.800"
        }}  />
                <Text numberOfLines={1} ellipsizeMode='tail'>
            
                  {item.num_konta}
            
                </Text>

             
            </HStack>
            <Divider orientation="horizontal" mx="4" my="3" _light={{
          bg: "muted.800"
        }}  />
            </VStack>
          } keyExtractor={item => item.id} />

          <Fab  shadow={4} bgColor={'#002851'} 
          onPress={()=>{navigation.navigate('PortfelStrona')}}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
   
    </LinearGradient>
    </NativeBaseProvider>
    )
};
Wallet.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Wallet.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Wallet;