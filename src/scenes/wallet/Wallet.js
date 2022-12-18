import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,Pressable, Box,Flex,View,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, Icon,NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
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
    fontSize: 20,
    marginTop: 10,
    marginBottom:10,
    fontWeight: "bold",
    color: "white"
  },
  boxes:{
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.blue ,
    backgroundColor:colors.lightBlue,
    marginTop:20,
    width:400,
    height:80,
    
  }
});

const Wallet = ({route,navigation}) => {
  const from = route?.params?.from

 const url = 'http://192.168.0.188/organizer/index_wallet.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka
 // const url = 'http://192.168.0.156/organizer/index_wallet.php';//dom_KOMP

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
          Nazwa
        </Text>
        <Divider orientation="vertical" mx="2" _light={{
          bg: "muted.800"
        }}  />
        <Text style= {styles.title}>
          Numer telefonu
        </Text>
        <Divider orientation="vertical" mx="2" _light={{
          bg: "muted.800"
        }}  />
        <Text style= {styles.title}>
          Numer konta
        </Text>
       
      </HStack>
     
        <FlatList data={data} renderItem={({item}) => 
        <Pressable onPress={() =>
          navigation.navigate('PortfelEdytuj',{nazwa:item.nazwa , num_konta:item.num_konta, num_telefonu:item.num_telefonu})
        }>
        <Box style={styles.boxes}>
         
            <HStack py='1' >
              
              <Avatar size="60px" mx='1' backgroundColor={randomColor()}>{getFirstLetterFrom(item.nazwa)}</Avatar>
             
                <Text  numberOfLines={1} ellipsizeMode='tail'  bold mx='4' my='4'>
                { ((item.nazwa).length > 7) ? 
                 (((item.nazwa).substring(0,7)) + '...') : 
                 item.nazwa }
                </Text>
               
                <Divider orientation="vertical" mx="2" _light={{
         background:colors.blue
        }}  />
                <Text  mx='4' my='4'>
                  {item.num_telefonu}
            
                </Text>
                <Divider orientation="vertical" mx="2" _light={{
         background:colors.blue
        }}  />
                <Text  mx='4' my='4'>
            
                { ((item.num_konta).length > 10) ? 
                 (((item.num_konta).substring(0,7)) + '...') : 
                 item.num_konta }
            
                </Text>

             
            </HStack>
           
         
            </Box>
            </Pressable>
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