import React  from "react";
import { PropTypes } from "prop-types";
import { Input,Pressable, Box,Divider, FlatList,Avatar, HStack, VStack, Fab,Text, Icon,NativeBaseProvider } from "native-base";
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
    backgroundColor: colors.grayBlue
   
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom:10,
    fontWeight: "bold",
    color: "white"
  },
  boxes:{
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.blue ,
    backgroundColor:colors.lightBlue,
    marginTop:20,
    width:400,
    height:80,
    
  }
});
const Wallet = ({route,navigation}) => {
  const from = route?.params?.from

  const url = 'http://192.168.0.186/organizer/index_wallet.php';//dom
  //const url = 'http://192.168.1.209/organizer/index_wallet.php';//aka

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

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
      <Input variant="rounded" mx='10' my='5' marginTop={8} 
        placeholder="Wyszukaj" 
        onChangeText={filterList}
        backgroundColor={colors.grayBlue} borderColor={colors.limone} 
        InputRightElement={
          <Icon as={<AntDesign name="search1" />} 
          size={5} mr="3" color="muted.400" />
        }
        _light={{
          placeholderTextColor: colors.limone,
          color:colors.limone
        }} 
      />
      <HStack space={[2, 3]} justifyContent="space-between">
        <Text style= {styles.title}>
            Nazwa
        </Text>
        <Divider orientation="vertical" mx="2" _light={{
            bg: "muted.800"
        }}/>
        <Text style= {styles.title}>
            Numer telefonu
        </Text>
        <Divider orientation="vertical" mx="2" _light={{
            bg: "muted.800"
        }} />
        <Text style= {styles.title}>
           Numer konta
        </Text>
      </HStack> 
      <FlatList data={data.filter(checkTitles)} renderItem={({item}) => 
        <Pressable onPress={() =>
            navigation.navigate('Edytuj Kontakt',{nazwa:item.nazwa , num_konta:item.num_konta, num_telefonu:item.num_telefonu})
        }>
          <Box style={styles.boxes} shadow={9}>
            <HStack py='1' >
              <Avatar size="60px" mx='1' backgroundColor={randomColor()}>{getFirstLetterFrom(item.nazwa)}</Avatar>
              <Text  numberOfLines={1} ellipsizeMode='tail'  bold mx='4' my='4'>
                  { ((item.nazwa).length > 5) ? 
                  (((item.nazwa).substring(0,5)) + '...') : item.nazwa }
              </Text>
              <Divider orientation="vertical" mx="2" _light={{
                  background:colors.blue
              }}  />
              <Text  mx='4' my='4'>
              { ((item.num_telefonu).length > 7) ? 
                  (((item.num_telefonu).substring(0,7)) + '...') : item.num_telefonu }
              </Text>
              <Divider orientation="vertical" mx="2" _light={{
                  background:colors.blue
              }}  />
              <Text  mx='4' my='4'>
                { ((item.num_konta).length > 10) ? 
                 (((item.num_konta).substring(0,7)) + '...') : item.num_konta }
              </Text>
            </HStack>
          </Box>
        </Pressable>
          } keyExtractor={item => item.id} 
      />
      <Fab  shadow={4} bgColor={colors.darkGreyBlue} 
          onPress={()=>{navigation.navigate('Dodaj Kontakt')}}
          icon={<Icon color={colors.limone} as={AntDesign} name="plus" size="lg" />} />

    </LinearGradient>
  </NativeBaseProvider>
)};

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