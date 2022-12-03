import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,Link,FormControl,Input,Button, Box,Flex,View,Divider, FlatList, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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

  }
});


const Links = ({route,navigation}) => {
  const from = route?.params?.from
 
  //const url = 'http://192.168.0.186/organizer/index_links.php';//dpm
  const url = 'http://192.168.1.209/organizer/index_links.php';//aka
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneLink,setLink] = useState('');
 
  
  function axiosGet(){
    axios.get(url).then(response =>{
    
      setData(response.data) 
      console.log(response.data)
        })
      .catch(err=> console.log(err))
  }
  
  useEffect(()=>{
   axiosGet()
    },[])

    const postData = () =>{
  
      axios.post(url,{
        nazwa:daneNazwa,
        links:daneLink
      }).then(response => console.log('dodano:',daneNazwa,daneLink),
       setShowModal(false),
       setNazwa(''),
       setLink(''),
       axiosGet()
      ).catch(err=>console.log(err))
    }

  return (
  <NativeBaseProvider>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <Box >
        <FlatList data={data} renderItem={({item}) => 
          <Box style={styles.boxes}>

            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
              <Flex mx="5" direction="row" h="50" >
                <Text  color="#ea580c" bold fontSize="20">
                  {item.nazwa}
                </Text>
                <Divider orientation="vertical" mx="2" _light={{
          bg: "muted.800"
        }}  />
                <Text >
             <Link href="https://mail.google.com" isExternal _text={{
        color: "blue.400"
      }}>
     
                  {item.links}
                  </Link>
                </Text>
                <Divider orientation="vertical" mx="2" _light={{
          bg: "muted.800"
        }}  />
                <Icon as={AntDesign} name="edit" size='2xl' color="#facc15" _dark={{
        color: "warmGray.50"
      }} />
      
       <Divider orientation="vertical" mx="4" _light={{
          bg: "muted.800"
        }}  />
          <Icon as={AntDesign} name="delete" size='2xl' color="#dc2626" _dark={{
         color: "warmGray.50"
             }} />

                </Flex>
              </VStack>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
          <Fab  shadow={4} right={50} bgColor={'#002851'} 
          onPress={() => setShowModal(true)}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header bgColor={'#002851'} _text={{
      fontSize: "20",
      fontWeight: "medium",
      color: "#a3e635",
      letterSpacing: "lg",
    }}>Nowy link</Modal.Header>
          <Modal.Body bgColor={'#0c4a6e'}>
            <FormControl>
              <FormControl.Label>Nazwa</FormControl.Label>
              <Input color={'#a3e635'} value={daneNazwa} onChangeText={(text)=>setNazwa(text)}
             />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Link</FormControl.Label>
              <Input color={'#a3e635'} value={daneLink} onChangeText={(text)=>setLink(text)}
             />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={'#0c4a6e'}>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="red" onPress={() => {
              setShowModal(false);
            }}>
                Anuluj
              </Button>
              <Button onPress={postData}>
                Dodaj
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
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