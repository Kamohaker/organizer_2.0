import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button, Box,Flex,View,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, Icon,NativeBaseProvider } from "native-base";
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
});

const Wallet = ({route,navigation}) => {
  const from = route?.params?.from

 //const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
  const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneNumTel,setNumTel] = useState('');
  const [daneNumKon,setNumKon] = useState('');


  function axiosGet(){
    axios.get(url).then(response =>{
    
      setData(response.data) 
      console.log(response.data)
        })
      .catch(err=> console.log(err))
  }
  
  
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
   axiosGet()
} ); 
return (focusHandler)
},[])


const postData = () =>{
  
  axios.post(url,{
    nazwa:daneNazwa,
    num_telefonu:daneNumTel,
    num_konta:daneNumKon
  }).then(response => console.log('dodano:',daneNazwa,daneNumTel,daneNumKon),
  
   setShowModal(false),
   setNazwa(''),
   setNumTel(''),
   setNumKon(''),
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
      
      <Box>
        <FlatList data={data} renderItem={({item}) => 
          <Box borderBottomWidth="2" 
             borderColor="muted.800" 
             py="3">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar size="60px" backgroundColor={randomColor()}>{getFirstLetterFrom(item.nazwa)}</Avatar>
              <VStack>
              <Flex mx="5" direction="row" h="60">
                <Text  color="#ea580c" bold>
                  {item.nazwa}
                </Text>
                <Divider orientation="vertical" mx="4" _light={{
          bg: "muted.800"
        }}  />
                <Text >
                  {item.num_telefonu}
            
                </Text>
                <Divider orientation="vertical" mx="4" _light={{
          bg: "muted.800"
        }}  />
                <Text >
            
                  {item.num_konta}
            
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
    }}>Nowy kontakt</Modal.Header>
          <Modal.Body bgColor={'#0c4a6e'}>
            <FormControl>
              <FormControl.Label>Nazwa</FormControl.Label>
              <Input value={daneNazwa} onChangeText={text => setNazwa(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Numer telefonu</FormControl.Label>
              <Input  value={daneNumTel} onChangeText={text => setNumTel(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Numer konta</FormControl.Label>
              <Input  value={daneNumKon} onChangeText={text => setNumKon(text)}  />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={'#0c4a6e'}>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="red" onPress={() => {
                setShowModal(false);
            
            }}>
                Anuluj
              </Button>
              <Button onPress={() => {
               postData()
            }}>
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