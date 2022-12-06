import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Input,Button,Pressable, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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
    marginBottom: 2,
  },
  boxes: {
    borderBottomWidth:20,
    borderTopWidth:20,
    borderLeftWidth:20,
    borderRightWidth:20,
    borderRadius:30,
    borderColor:"#e879f9" ,
    backgroundColor:"#e879f9",
    marginTop:10,
    width:320,
    height:100,
    alignItems:'center'
  }
});

const Maile = ({route,navigation}) => {
  const from = route?.params?.from
  //const url = 'http://192.168.0.186/organizer/index_mails.php';//dom
  const url = 'http://192.168.1.209/organizer/index_mails.php';//aka
  //const url = 'http://192.168.0.156/organizer/index_mails.php';//dom_KOMP

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneMail,setMail] = useState('');
 
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
         <Box >
          <HStack>
        <Text style={styles.title}>
          Nazwa
        </Text>
        <Divider orientation="vertical" mx="20" _light={{
          bg: "muted.800"
        }}  />
         <Text style={styles.title}>
          Mail
        </Text>
        </HStack>
         </Box>
      <Box >
        <FlatList data={data}  renderItem={({item}) => 
        <Pressable onPress={()=>{navigation.navigate('MailEdytuj',{nazwa:item.nazwa,mail:item.email})}}>
          <Box style={styles.boxes}>
            <HStack >
              <Avatar mx='5' backgroundColor={randomColor()} size="60px" >{getFirstLetterFrom(item.nazwa)}</Avatar> 
              
               <Text  color="#ea580c" bold>
                  {item.nazwa}
                </Text>
                <Divider orientation="vertical" mx="10" _light={{
          bg: "muted.800"
        }}  />
                <Text >
             <Link href="https://mail.google.com" isExternal _text={{
        color: "#002851"
      }}>
     
                  {item.email}
                  </Link>
                </Text>
               
            </HStack>
          </Box>
          </Pressable>} keyExtractor={item => item.id} />
          <Fab  shadow={4} bgColor={'#002851'} 
          onPress={() => navigation.navigate('MailStrona')}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
          
    </Box>
    </LinearGradient>
    </NativeBaseProvider>
    )
};
Maile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Maile.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Maile;