import React  from "react";
import { PropTypes } from "prop-types";
import { Input,IconButton,View, Avatar, HStack, VStack,Text,ScrollView, NativeBaseProvider } from "native-base";
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


const MailsPage = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.186/organizer/index_mails.php';//dpm
  //const url = 'http://192.168.1.209/organizer/index_mails.php';//aka
 
  const [daneNazwa,setNazwa] = useState('');
  const [daneMail,setMail] = useState('');
 
  const postData = () =>{
  
    axios.post(url,{
      nazwa:daneNazwa,
      email:daneMail
    }).then(response => console.log('dodano:',daneNazwa,daneMail),
    navigation.navigate('Maile'),
    setNazwa(''),
    setMail(''),
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
            onPress={() => {navigation.navigate('Maile')}}>
          </IconButton>
          <IconButton
              _icon={{
                color: colors.green,
                as: AntDesign,
                name: "check",
                size:8
              }}
              onPress={postData}
              >
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
          <Avatar my= "5" size={150} marginLeft={20} background={colors.lightOrange}>
            <Icons name="adduser" size={70} /> 
          </Avatar>
          <VStack my='4'>
            <Text fontSize={15} color={colors.limone}>
              Nazwa
            </Text>
          <Input  value={daneNazwa} variant="rounded"  marginBottom={6} marginTop={2}
            placeholder="Nazwa" 
            w={300} backgroundColor={colors.grayBlue} borderColor={colors.limone}
            onChangeText={text => setNazwa(text)} 
            _light={{
            placeholderTextColor: colors.limone ,
            color:colors.limone
            }} >
          </Input>
          <Text fontSize={15} color={colors.limone}>
            Mail
          </Text>
          <Input value={daneMail} variant="rounded"  marginBottom={6} marginTop={2}
            placeholder="Mail" w="100%" backgroundColor={colors.grayBlue} 
            borderColor={colors.limone}
            onChangeText={text => setMail(text)} 
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
MailsPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

MailsPage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default MailsPage;