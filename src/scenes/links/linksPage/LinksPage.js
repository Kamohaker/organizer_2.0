import React  from "react";
import { PropTypes } from "prop-types";
import { Modal,FormControl,Input,Button,IconButton, Box,Flex,View, ScrollView, Heading, Avatar, HStack, VStack, Fab,Text, Icon, Center, NativeBaseProvider } from "native-base";
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
    backgroundColor: colors.grayBlue
   
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
  ico: {
    alignItems: "flex-start",
    backgroundColor:colors.grayBlue
  },
});


const LinksPage = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.186/organizer/index_links.php';//dpm
  //const url = 'http://192.168.1.209/organizer/index_links.php';//aka

  const [daneNazwa,setNazwa] = useState('');
  const [daneLink,setLink] = useState('');
 
  const postData = () =>{
  
    axios.post(url,{
      nazwa:daneNazwa,
      links:daneLink
    }).then(response => console.log('dodano:',daneNazwa,daneLink),
    navigation.navigate('Linki'),
    setNazwa(''),
    setLink(''),
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
            onPress={() => {navigation.navigate('Linki')}}>
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
          <Avatar my= "5" marginLeft={20} size={150} background={colors.violet}>
            <Icons name="plus" size={70}  /> 
          </Avatar>
          <VStack py='4'>
            <Text fontSize={15} color={colors.limone}>
              Nazwa
            </Text>
            <Input  value={daneNazwa} variant="rounded" marginBottom={6} marginTop={2} placeholder="Nazwa" 
              w={300} backgroundColor={colors.grayBlue}
              borderColor={colors.limone} 
              onChangeText={text => setNazwa(text)} 
              _light={{
              placeholderTextColor: colors.limone,
              color:colors.limone
              }} >
            </Input>
            <Text fontSize={15} color={colors.limone}>
              Link
            </Text>
            <Input value={daneLink} variant="rounded" marginBottom={6} marginTop={2} 
              placeholder="Link" w="100%" backgroundColor={colors.grayBlue}
              borderColor={colors.limone}
              onChangeText={text => setLink(text)} 
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
LinksPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LinksPage.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default LinksPage;