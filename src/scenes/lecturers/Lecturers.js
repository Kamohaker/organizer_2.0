import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Pressable, Input,Button, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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
    marginBottom: 2,
    fontWeight: "bold",
    color: "white"

  },
  boxes:{
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.darkYellow ,
    backgroundColor:colors.yellow,
    marginTop:20,
    width:400,
    height:80,
   
  }
});

const Lectures = ({route,navigation}) => {
  const from = route?.params?.from
 const url = 'http://192.168.0.186/organizer/index_lectures.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_lectures.php';//aka

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneStopien,setStopien] = useState('');
  const [danePokuj,setPokuj] = useState('');
  const [filter, setFilter] = useState('');
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
  
  const clearString = (value) => {
    return value.replace(/\s/g, '').toLowerCase();
}

const checkTitles = (value) => {
    return clearString(value.nazwa).indexOf(clearString(filter)) >= 0
}

const filterList = (value) => {
    setFilter(value);
}

  return (
  <NativeBaseProvider>
   <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <Input  onChangeText={filterList} 
        variant="rounded" mx='10' my='5' marginTop={8} InputRightElement={
        <Icon as={<AntDesign name="search1" />} size={5} mr="3" color="muted.400" />}
        placeholder="Wyszukaj" 
        backgroundColor="#0c4a6e" borderColor="#a3e635" 
        _light={{
          placeholderTextColor: "#a3e635",
          color:colors.limone
          }} 
        />
         <Box my='2'>
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
      
        <FlatList data={data.filter(checkTitles)}  renderItem={({item}) => 
        <Pressable onPress={()=>{navigation.navigate('ProwadzacyEdytuj',{nazwa:item.nazwa,stopien:item.stopien,num_pok:item.num_pokoju})}}>
               
          <Box style={styles.boxes}shadow={9}>
            <HStack py={1}>
              <Avatar mx='4' backgroundColor={randomColor()} size="60px" >{getFirstLetterFrom(item.nazwa)}</Avatar> 
                 <Text  bold my='4'>
                { ((item.nazwa).length > 10) ? 
                 (((item.nazwa).substring(0,7)) + '...') : 
                 item.nazwa }
                </Text>
              
                <Divider orientation="vertical" mx="8"  _light={{
          background:colors.darkYellow
        }}  />
                <Text my='4'>
             
     
                  {item.stopien}
                  
                </Text >
                <Divider orientation="vertical" mx="10" _light={{
         background:colors.darkYellow
        }}  />
         <Text   bold my='4'>
                  {item.num_pokoju}
                </Text>

            </HStack>
          </Box>
          </Pressable>
          } keyExtractor={item => item.id} />
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