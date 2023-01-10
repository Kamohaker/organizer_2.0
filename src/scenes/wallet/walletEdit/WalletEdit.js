import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,IconButton,Icon, Box,Flex,View,Divider,ScrollView, Avatar, HStack, VStack, Fab,Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import Fot  from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.grayBlue
   
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom:10
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor:colors.grayBlue
  },
});

const WalletEdit = ({route,navigation}) => {
  const from = route?.params?.from

  //const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
  const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka

  const [daneNazwa,setNazwa] = useState('');
  const [daneNumTel,setNumTel] = useState('');
  const [daneNumKon,setNumKon] = useState('');
  const [errors, setErrors] = useState({});

const putData = () =>{
 
    axios.put(url,{

      nazwa: route.params.nazwa,
      num_telefonu:daneNumTel,
      num_konta:daneNumKon,
   
      }).then(response => console.log('zmieniono:','nazwa:',route.params.nazwa,'numer_tel:',daneNumTel,'num_kon:',daneNumKon),
     
      navigation.navigate('Portfel'),
      setNumKon(daneNumKon),
      setNumTel(daneNumTel)
      
     ).catch(err=>console.log(err))
     
    
}

const onSubmit=()=>{
  if (daneNumTel.length !=9 || daneNumKon.length !=26) {
    console.log(daneNumKon,'+',daneNumTel),
    setErrors({
      ...errors,
      name: 'Dane są złej długości',
    });
    return false;
  }return true;
}

const deleteData = () =>{

  axios.delete(url,{
    data:{
      nazwa: route.params.nazwa,
      num_konta:  route.params.num_konta,
      num_telefonu:route.params.num_telefonu
    }
    }).then(response => {
    console.log('usunięto:','nazwa:',route.params.nazwa,'num_k:', route.params.num_konta,'num:',route.params.num_telefonu),

    navigation.navigate('Portfel')
  }
   ).catch(err=>console.log(err))
   
    
}
  return (
    <NativeBaseProvider>
      <View style={styles.ico}>
        <HStack space={300}>
          <IconButton
            _icon={{
              color: colors.red,
              as: AntDesign,
              name: "back",
              size:8
            }}
            onPress={() => {
              navigation.navigate('Portfel')
            }}>
          </IconButton>
          <IconButton
              _icon={{
                color: colors.green,
                as: AntDesign,
                name: "check",
                size:8
              }}
              onPress={putData}>
          </IconButton>
        </HStack>
      </View>
      <LinearGradient
        colors={[colors.grayBlue, colors.whiteBlue]}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView>
          <Avatar my= "5"  marginLeft={20}  size={150} background={colors.lightBlue}>
            <Fot name="edit" size={70}/> 
          </Avatar>
          <VStack py='4'>
            <Text fontSize={15} color={colors.limone}>
              Nazwa
            </Text>
            <Input isDisabled defaultValue= {route.params.nazwa} variant="rounded" marginBottom={6} marginTop={2} placeholder="Nazwa" 
              w={300}backgroundColor={colors.grayBlue} borderColor={colors.limone} 
              onChangeText={text => setNazwa(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
            <FormControl isInvalid>
              <Text fontSize={15} color={colors.limone}>
                Edytuj numer telefonu
              </Text>
              <Input defaultValue = {route.params.num_telefonu} variant="rounded"  marginTop={2} 
                placeholder="Numer telefonu" w="100%" backgroundColor={colors.grayBlue} 
                borderColor={colors.limone}
                keyboardType='numeric'
                onChangeText={text => setNumTel(text)} 
                _light={{
                placeholderTextColor:colors.limone,
                color:colors.limone
                }} >
              </Input>
              <FormControl.ErrorMessage >
                {errors.name}
              </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid>
                <Text fontSize={15} color={colors.limone}>
                  Edytuj numer konta
                </Text>
                <Input defaultValue= {route.params.num_konta} variant="rounded"  marginTop={2}
                  placeholder="Numer konta" w="100%" backgroundColor={colors.grayBlue} 
                    borderColor={colors.limone} 
                    keyboardType='numeric'
                    onChangeText={text => setNumKon(text)} 
                  _light={{
                  placeholderTextColor: colors.limone,
                  color:colors.limone
                  }} >
                </Input>
                <FormControl.ErrorMessage >
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
          </VStack>
          <Fab  bgColor={colors.darkGreyBlue} onPress={deleteData}
            icon={<Icon color={colors.red} as={AntDesign} name="delete" size="lg" />}
          />
        </ScrollView>
      </LinearGradient>
    </NativeBaseProvider>
    )
};
WalletEdit.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

WalletEdit.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default WalletEdit;