import React  from "react";
import { PropTypes } from "prop-types";
import {Input,IconButton,View, Avatar, HStack,ScrollView, VStack,Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Icons  from "react-native-vector-icons/AntDesign";
import { colors } from "../../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor: colors.grayBlue
  },
});


const LecturesPage = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.186/organizer/index_lectures.php';//dpm
  //const url = 'http://192.168.1.209/organizer/index_lectures.php';//aka

  const [daneNazwa,setNazwa] = useState('');
  const [daneStopien,setStopien] = useState('');
  const [daneNumPok,setNumPok] = useState('');
 

  const postData = () =>{
  
    axios.post(url,{
      nazwa:daneNazwa,
      stopien:daneStopien,
      num_pokoju:daneNumPok
    }).then(response => console.log('dodano:',daneNazwa,daneStopien,daneNumPok),
    navigation.navigate('Prowadzący'),
    setNazwa(''),
    setStopien(''),
    setNumPok('')
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
              navigation.navigate('Prowadzący')
            }}>
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
        colors={[colors.grayBlue, colors.whiteBlue]}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView>
          <Avatar my= "5" marginLeft={20} size={150} background={colors.yellow}>
            <Icons name="adduser" size={70}  /> 
          </Avatar>
          <VStack py='4'>
            <Text fontSize={15} color={colors.limone}>
              Nazwa
            </Text>
            <Input  value={daneNazwa} variant="rounded"marginBottom={6} marginTop={2} placeholder="Nazwa" 
              w={300} 
              backgroundColor={colors.grayBlue} borderColor={colors.limone}
              onChangeText={text => setNazwa(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
            <Text fontSize={15} color={colors.limone}>
              Stopień
            </Text>
            <Input value={daneStopien} variant="rounded" marginBottom={6} marginTop={2} 
              placeholder="Stopień" w="100%"
              backgroundColor={colors.grayBlue} borderColor={colors.limone}
              onChangeText={text => setStopien(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
            <Text fontSize={15} color={colors.limone}>
              Numer pokoju
            </Text>
            <Input value={daneNumPok} variant="rounded" marginBottom={6} marginTop={2}
              placeholder="Numer pokoju" w="100%" 
              backgroundColor={colors.grayBlue} borderColor={colors.limone}
              keyboardType='numeric'
              onChangeText={text => setNumPok(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </NativeBaseProvider>
  )
};
LecturesPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LecturesPage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default LecturesPage;