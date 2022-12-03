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
    fontSize: 20,
    marginBottom: 2,
  },
  boxes:{
    borderBottomWidth:2, 
    borderColor:"#262626", 
    paddingVertical:10
  }
});

const Maile = ({route,navigation}) => {
  const from = route?.params?.from
  //const url = 'http://192.168.0.186/organizer/index_mails.php';//dom
  const url = 'http://192.168.1.209/organizer/index_mails.php';//aka

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
      email:daneMail
    }).then(response => console.log('dodano:',daneNazwa,daneMail),
     setShowModal(false),
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
         <Box style={styles.boxes} >
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
          <Box style={styles.boxes}>
            <HStack >
              <Avatar backgroundColor={randomColor()} size="60px" >{getFirstLetterFrom(item.nazwa)}</Avatar> 
              <VStack>
              <Flex mx="7" direction="row" h="60">
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
                </Flex>
              </VStack>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
          <Fab  shadow={4} bgColor={'#002851'} 
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
    }}>Nowy mail</Modal.Header>
          <Modal.Body bgColor={'#0c4a6e'}>
            <FormControl>
              <FormControl.Label>Imie</FormControl.Label>
              <Input color={'#a3e635'} value={daneNazwa} onChangeText={(text)=>setNazwa(text)}
             />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input  color={'#a3e635'} value={daneMail} onChangeText={(text)=>setMail(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={'#0c4a6e'}>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="red" onPress={() => {
              setShowModal(false);
            }}>
                Anuluj
              </Button>
              <Button onPress={postData} >
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