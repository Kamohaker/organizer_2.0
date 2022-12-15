import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Input,Button,Pressable, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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
    fontSize: 44,
    marginBottom: 20,
  },

  boxes: {
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.darkViolet,
    backgroundColor:colors.violet,
    marginTop:10,
    width:220,
    height:80,
    alignItems:'center'
  }
});


const Links = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.128/organizer/index_links.php';//dpm
 // const url = 'http://192.168.1.209/organizer/index_links.php';//aka
  //const url = 'http://192.168.0.156/organizer/index_links.php';//dom_KOMP
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneLink,setLink] = useState('');
 
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
    
        <FlatList data={data} renderItem={({item}) => 
        <Pressable onPress={()=>{navigation.navigate("LinkiEdytuj",{nazwa:item.nazwa,link:item.links})}}>
          <Box style={styles.boxes}>

            <HStack space={[2, 3]} justifyContent="space-between">
             
              
                <Text  color="#ea580c" bold fontSize="20">
                  {item.nazwa}
                </Text>
                <Divider orientation="vertical" mx="2" _light={{
          bg: "muted.800"
        }}  />
                <Text >
             <Link  isExternal _text={{
        color: "blue.400"
      }}>
     
                  {item.links}
                  </Link>
                </Text>
          
              
              
            </HStack>
          </Box>
          </Pressable>
          } keyExtractor={item => item.id} />
          <Fab   right={50} bgColor={'#002851'} 
          onPress={() => navigation.navigate('LinkiStrona')}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} /> 
          
   
    </LinearGradient>
    </NativeBaseProvider>
    )
};
Links.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Links.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Links;