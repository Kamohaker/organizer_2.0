import React from "react";
import PropTypes from "prop-types";
import { StyleSheet} from "react-native";
import { NativeBaseProvider,Pressable,Fab,Icon,Input,VStack, Text, Box, HStack, FlatList } from "native-base";
import axios from 'axios';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState ,useEffect} from "react";
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
    marginTop:10,
    fontSize: 20,
    marginBottom: 20,
  },
  boxes: {
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:30,
    borderColor:colors.darkLimone ,
    backgroundColor:colors.limone,
    marginTop:'10%',
    marginRight:10,
    marginLeft:10,
    width:200,
    height:120,
    alignItems:'center',
    paddingTop:'5%'
  }
});

const Notebook = ({ route, navigation }) => {
  const from = route?.params?.from
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const url = 'http://192.168.0.186/organizer/index_notebook.php';//dom
  //const url = 'http://192.168.1.209/organizer/index_notebook.php';//aka


  
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

 const onSubmit=()=>{
    navigation.navigate('Dodaj Notatki')
  }

  
  const clearString = (value) => {
    return value.replace(/\s/g, '').toLowerCase();
  }

  const checkTitles = (value) => {
    return clearString(value.nazwa).indexOf(clearString(filter)) >= 0
  }

  const filterList = (value) => {
    setFilter(value);
  }

  return(
  <NativeBaseProvider>
    <LinearGradient
        colors={[colors.grayBlue, colors.whiteBlue]}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <Input variant="rounded" mx='10' my='5' marginTop={8} 
        onChangeText={filterList} 
        placeholder="Wyszukaj" 
        backgroundColor={colors.grayBlue} borderColor={colors.limone} 
        InputRightElement={
          <Icon as={<AntDesign name="search1" />} 
          size={5} mr="3" color="muted.400" />}
        _light={{
          placeholderTextColor: colors.limone,
          color:colors.limone
          }} 
      />
      <FlatList data={data.filter(checkTitles)} 
        numColumns={2}
        columnWrapperStyle={{justifyContent:'space-around'}}
        renderItem={({ item })=>(
          <Pressable onPress={() =>
            navigation.navigate('Edytuj Notatki',{nazwa:item.nazwa , opis:item.opis})
          }>
            <Box style={styles.boxes} shadow={9}>
              <Text style={styles.title}numberOfLines={1} ellipsizeMode='tail' >
                {item.nazwa}
              </Text>
              <Text color={colors.darkGreyBlue} numberOfLines={1} ellipsizeMode='tail'>{item.opis}</Text>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item)=>item.id.toString()}>
      </FlatList>
      <Fab  shadow={4} right={50} bgColor={colors.darkGreyBlue} onPress={onSubmit}
        icon={<Icon color={colors.limone} as={AntDesign} name="plus" size="lg" />}
      />
  
    </LinearGradient>
  </NativeBaseProvider>
)};

Notebook.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Notebook.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Notebook;
