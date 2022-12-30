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
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white"
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
    width:400,
    height:80,
    alignItems:'center',
    padding:18
  }
});


const Links = ({route,navigation}) => {
  const from = route?.params?.from
 
  const url = 'http://192.168.0.186/organizer/index_links.php';//dpm
 // const url = 'http://192.168.1.209/organizer/index_links.php';//aka
 
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

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

  const clearString = (value) => {
    return value.replace(/\s/g, '').toLowerCase();
}

const checkTitles = (value) => {
    return clearString(value.nazwa).indexOf(clearString(filter)) >= 0
}

const filterList = (value) => {
    setFilter(value);
}
  return (
  <NativeBaseProvider>
    <LinearGradient
        colors={[colors.grayBlue, colors.whiteBlue]}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <Input  onChangeText={filterList} 
        placeholder="Wyszukaj" 
        backgroundColor={colors.grayBlue} borderColor={colors.limone} 
        variant="rounded" mx='10' my='5' marginTop={8} 
        InputRightElement={
          <Icon as={<AntDesign name="search1" />} size={5} mr="3" color="muted.400" />}
        _light={{
          placeholderTextColor:colors.limone,
          color:colors.limone
          }} 
      />
      <Box marginTop = '5' marginBottom = '5'>
        <HStack>
          <Text style={styles.title}>
            Nazwa
          </Text>
          <Divider orientation="vertical" mx="20" _light={{
            bg: "muted.800"
          }}  />
          <Text style={styles.title}>
            Link
          </Text>
        </HStack>
      </Box>
      <FlatList data={data.filter(checkTitles)} renderItem={({item}) => 
        <Pressable onPress={()=>{navigation.navigate("LinkiEdytuj",{nazwa:item.nazwa,link:item.links})}}>
          <Box style={styles.boxes}>
            <HStack space={[2, 3]} justifyContent="space-between">
              <Text   bold fontSize="20">
                { ((item.nazwa).length > 10) ? 
                 (((item.nazwa).substring(0,7)) + '...') : 
                 item.nazwa }
              </Text>
              <Divider orientation="vertical" mx="2" _light={{
                background:colors.darkViolet
              }}/>
              <Text>
                <Link  href={item.links} isExternal _text={{
                  color: colors.darkGreyBlue
                  }}>
                  { ((item.links).length > 20) ? 
                  (((item.links).substring(0,40)) + '...') : 
                  item.links }
                </Link>
              </Text>
            </HStack>
          </Box>
        </Pressable>
      } keyExtractor={item => item.id} />
      <Fab right={50} bgColor={colors.darkGreyBlue} 
        onPress={() => navigation.navigate('LinkiStrona')}
        icon={<Icon color={colors.limone} as={AntDesign} name="plus" size="lg" />} /> 
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