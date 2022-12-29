import React  from "react";
import { PropTypes } from "prop-types";
import { Link,Pressable, Box,Divider, FlatList,Input, Avatar, HStack, VStack, Fab,Text, Icon, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {colors} from "../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
 
   
  },
  title: {
    fontSize: 20,
    marginBottom: 2,
    fontWeight: "bold",
    color: "white"
  },
  boxes: {
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:30,
    borderColor:colors.orange,
    backgroundColor:colors.lightOrange,
    marginTop:12,
    marginLeft:18,
    width:'90%',
    height:100,
    alignItems:'center',
    
  }
});

const Maile = ({route,navigation}) => {
  const from = route?.params?.from
  const url = 'http://192.168.0.186/organizer/index_mails.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_mails.php';//aka
 

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneMail,setMail] = useState('');
  const [list, setList] = useState([]);
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
        colors={[colors.grayBlue, colors.whiteBlue]}
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
         <Box marginTop = '5' marginBottom = '5'>
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
      <Box>
        <FlatList data={data.filter(checkTitles)}  renderItem={({item}) => 
        <Pressable onPress={()=>{navigation.navigate('MailEdytuj',{nazwa:item.nazwa,mail:item.email})}}>
          <Box style={styles.boxes} shadow={9}>
            <HStack>
              <Avatar my= '3' mx='3' backgroundColor={randomColor()} size="60px" >{getFirstLetterFrom(item.nazwa)}</Avatar> 
              
               <Text my= '7' mx='4' fontSize='xl' bold>
               { ((item.nazwa).length > 10) ? 
                 (((item.nazwa).substring(0,7)) + '...') : 
                 item.nazwa }
                </Text>
                <Divider orientation="vertical" mx="6" my="1" _light={{
          background:colors.orange
        }}  />
                <Text my= '7' mx='3' >
             <Link href="https://mail.google.com" isExternal _text={{
        color: "#002851"
      }}>
     
     { ((item.email).length > 18) ? 
                 (((item.email).substring(0,15)) + '...') : 
                 item.email }
                  </Link>
                </Text>
               
            </HStack>
          </Box>
          </Pressable>} keyExtractor={item => item.id} />
          <Fab  shadow={4} bgColor={colors.darkGreyBlue} 
          onPress={() => navigation.navigate('MailStrona')}
          icon={<Icon color={colors.limone} as={AntDesign} name="plus" size="lg" />} />
          
          
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