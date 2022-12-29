import React  from "react";
import { PropTypes } from "prop-types";
import {Input,IconButton,View,Avatar, HStack, VStack, Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon  from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:colors.grayBlue
   
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: colors.grayBlue
  },
 
});

const WalletPage = ({route,navigation}) => {
  const from = route?.params?.from

  const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
 // const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka

  const [daneNazwa,setNazwa] = useState('');
  const [daneNumTel,setNumTel] = useState('');
  const [daneNumKon,setNumKon] = useState('');


  const postData = () =>{
  
  axios.post(url,{
    nazwa:daneNazwa,
    num_telefonu:daneNumTel,
    num_konta:daneNumKon
  }).then(response => console.log('dodano:',daneNazwa,daneNumTel,daneNumKon),
   setNazwa(''),
   setNumTel(''),
   setNumKon(''),
   navigation.navigate('Portfel'),
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
          onPress={() => {navigation.navigate('Portfel')}}>
        </IconButton>
        <IconButton
          _icon={{
          color: colors.green,
          as: AntDesign,
          name: "check",
          size:8
          }}
          onPress={postData}> 
        </IconButton>
      </HStack>
    </View>
    <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Avatar my= "5" size={150} background={colors.lightBlue}>
          <Icon name="adduser" size={70}  /> 
        </Avatar>
        <VStack py='4'>
          <Text fontSize={15} color={colors.limone}>
            Nazwa
          </Text>
          <Input value={daneNazwa} variant="rounded"marginBottom={6} marginTop={2} placeholder="Nazwa" 
          w="50%" backgroundColor={colors.grayBlue} borderColor={colors.limone}
          onChangeText={text => setNazwa(text)} 
          _light={{
          placeholderTextColor: colors.limone,
          color:colors.limone
          }} >
          </Input>
          <Text fontSize={15} color={colors.limone}>
          Numer telefonu
          </Text>
          <Input value={daneNumTel} variant="rounded" marginBottom={6} marginTop={2}
          placeholder="Numer telefonu" w="50%" backgroundColor={colors.grayBlue}
          borderColor={colors.limone}
          keyboardType='numeric'
          onChangeText={text => setNumTel(text)} 
          _light={{
          placeholderTextColor: colors.limone,
          color:colors.limone
          }} >
          </Input>
          <Text fontSize={15} color={colors.limone}>
          Numer konta
          </Text>
          <Input value={daneNumKon} variant="rounded" marginBottom={6} marginTop={2}
          placeholder="Numer konta" w="50%" backgroundColor={colors.grayBlue}
          borderColor={colors.limone}
          keyboardType='numeric'
          onChangeText={text => setNumKon(text)} 
          _light={{
          placeholderTextColor: colors.limone,
          color:colors.limone
          }} >
          </Input>
        </VStack>
      </LinearGradient>
    </NativeBaseProvider>
    )
};

WalletPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

WalletPage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default WalletPage;