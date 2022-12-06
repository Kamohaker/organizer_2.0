import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Pressable, Input,Button, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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
  boxes:{
    borderBottomWidth:2, 
    borderColor:"#262626", 
    paddingVertical:10
  }
});

const Lectures = ({route,navigation}) => {
  const from = route?.params?.from
 // const url = 'http://192.168.0.186/organizer/index_lectures.php';//dom
  const url = 'http://192.168.1.209/organizer/index_lectures.php';//aka

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneStopien,setStopien] = useState('');
  const [danePokuj,setPokuj] = useState('');
 
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
         <Box style={styles.boxes} >
          <HStack>
        <Text style={styles.title}>
          Nazwa
        </Text>
        <Divider orientation="vertical" mx="10" _light={{
          bg: "muted.800"
        }}  />
         <Text style={styles.title}>
          Stopień
        </Text>
        <Divider orientation="vertical" mx="10" _light={{
          bg: "muted.800"
        }}  />
         <Text style={styles.title}>
          Pokój
        </Text>
        </HStack>
         </Box>
      
        <FlatList data={data}  renderItem={({item}) => 
          <Box style={styles.boxes}>
            <HStack >
              <Avatar mx='5' backgroundColor={randomColor()} size="60px" >{getFirstLetterFrom(item.nazwa)}</Avatar> 
                <Pressable onPress={()=>{navigation.navigate('ProwadzacyEdytuj',{nazwa:item.nazwa,stopien:item.stopien,num_pok:item.num_pokoju})}}>
                <Text  color="#ea580c" bold>
                  {item.nazwa}
                </Text>
                </Pressable>
                <Divider orientation="vertical" mx="10" _light={{
          bg: "muted.800"
        }}  />
                <Text >
             <Link href="https://mail.google.com" isExternal _text={{
        color: "blue.400"
      }}>
     
                  {item.stopien}
                  </Link>
                </Text>
                <Divider orientation="vertical" mx="10" _light={{
          bg: "muted.800"
        }}  />
         <Text  color="#ea580c" bold>
                  {item.num_pokoju}
                </Text>

            </HStack>
          </Box>} keyExtractor={item => item.id} />
          <Fab  shadow={4} bgColor={'#002851'} 
          onPress={() => navigation.navigate('ProwadzacyStrona')}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
         
    
    </LinearGradient>
    </NativeBaseProvider>
    )
};
Lectures.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Lectures.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Lectures;