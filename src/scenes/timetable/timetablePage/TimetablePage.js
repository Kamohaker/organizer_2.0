import React  from "react";
import { PropTypes } from "prop-types";
import { FormControl,Input,IconButton, ScrollView,View,Avatar, HStack, VStack,Text, NativeBaseProvider } from "native-base";
import {StyleSheet} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon  from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
   
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

const TimetablePage = ({route,navigation}) => {
  const from = route?.params?.from

 const url = 'http://192.168.0.186/organizer/index_timetable.php';//dom
 //const url = 'http://192.168.1.209/organizer/index_timetable.php';//aka
  const [daneNazwa,setNazwa] = useState('');
  const [daneKiedy,setKiedy] = useState('');

  const postData = () =>{
    
    axios.post(url,{
      nazwa:daneNazwa,
      kiedy:daneKiedy
    }).then(response => console.log('dodano:',daneNazwa,daneKiedy),
    setNazwa(''),
    setKiedy(''),
    navigation.navigate('Terminarz'),
    ).catch(err=>console.log(err))
  }

  return (
    <NativeBaseProvider>
      <View style={styles.ico}>
        <HStack space={300}>
          <IconButton
            _icon={{
              color:colors.red,
              as: AntDesign,
              name: "back",
              size:8
            }}
            onPress={() => {navigation.navigate('Terminarz')}}>
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
          <Avatar my= "5" marginLeft={20} size={150} background={colors.blue}>
            <Icon name="plus" size={70}  /> 
          </Avatar>
          <VStack py='4'>
            <Text fontSize={15} color={colors.limone}>
              Nazwa
            </Text>
            <Input value={daneNazwa} variant="rounded"  marginBottom={6} marginTop={2} placeholder="Nazwa" 
              w={300} backgroundColor={colors.grayBlue} borderColor={colors.limone}
              onChangeText={text => setNazwa(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
            <Text fontSize={15} color={colors.limone}>
              Data
            </Text>
            <FormControl mb="5">
              <Input value={daneKiedy} variant="rounded"   marginTop={2} placeholder="Data" 
                w="100%" backgroundColor={colors.grayBlue} borderColor={colors.limone}
                keyboardType = 'numeric'
                onChangeText={text => setKiedy(text)} 
                _light={{
                placeholderTextColor: colors.limone,
                color:colors.limone
                }} >
              </Input>
              <FormControl.HelperText>
                  Data powinna mieć format: 'yyyy-mm-dd'
              </FormControl.HelperText>
            </FormControl>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </NativeBaseProvider>
  )
};
TimetablePage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

TimetablePage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default TimetablePage;