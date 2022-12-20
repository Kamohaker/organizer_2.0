import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { NativeBaseProvider,Pressable,Checkbox, View, Box,VStack,  Text, FlatList, HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar,Agenda } from "react-native-calendars";
import { useState ,useEffect} from "react";
import axios from "axios";
import { colors } from "../../theme";


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayBlue
   
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
  text_box: {
    fontSize: 18,
    marginBottom: 16,
    color:'white',
    marginLeft:10
  },
  
  boxes:{
   
    borderRadius:20,
    borderColor:colors.blue,
    backgroundColor:colors.blue,
    marginTop:20,
    marginLeft:22,
    width:'100%',
    height:80,
    alignItems:'center',
    paddingTop:18,
    

  }
});


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}


const Home = ({ route,navigation }) => {
  const from = route?.params?.from
  //const url = 'http://192.168.0.188/organizer/index_home.php';//dom
  const url = 'http://192.168.1.209/organizer/index_home.php';//aka

  const [data, setData] = useState([]);
  const [items, setItems] = useState({});
  
 
  useEffect(()=>{
    const focusHandler = navigation.addListener('focus', () => {
      axios.get(url).then(response =>{
        console.log(response.data)
        setData(response.data) 
       
    
          })
        .catch(err=> console.log(err))
  } ); 
  return (focusHandler)
  },[])

 

  const loadItems = (day) => {

    setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
          
            if (!items[strTime]) {
                items[strTime] = [];
              

                const numItems = Math.floor(Math.random() + 1);

                for (let j = 0; j < numItems; j++) {
                    items[strTime].push({
                        name:  strTime ,
                       
      
                    });
                }
            }
        }
        const newItems = {};
        Object.keys(items).forEach(key => {
            newItems[key] = items[key];
        });
        setItems(newItems);
    }, 1000);
}


const renderItem = (item) => {
  return (
    <NativeBaseProvider>
     <View style={styles.root}>
        <FlatList   data={data.filter(obj=>obj.kiedy==item.name)} renderItem={({item}) => 
    
          <Box style={styles.boxes} >
            <HStack space={10}>
            
              <Text style={styles.text_box} > {item.nazwa}</Text>
              <Text  mt='6' color={"white"}> {item.kiedy}</Text>
 
            </HStack>
          </Box>
       
           }
          keyExtractor={item => item.index} 
          
        />         
      </View>
    </NativeBaseProvider>
  );
}

  return(
  <NativeBaseProvider>
   <View style={styles.root}>
       <Agenda
               theme={{ 
            
                calendarBackground:colors.calendar,
                textSectionTitleColor: colors.darkGreyBlue,
                selectedDayBackgroundColor: colors.selector,
                selectedDayTextColor: colors.limone,
                dayTextColor: 'white', 
                dotColor: colors.darkGreyBlue,
                selectedDotColor: colors.limone,
                monthTextColor: 'white',
              
                agendaDayNumColor: colors.darkGreyBlue,
                agendaTodayColor: colors.limone,

              }}
                items={items}
                loadItemsForMonth={loadItems }
                showClosingKnob={true}
                refreshing={true}
                renderItem={renderItem}
            />
      
  
          
   </View>
  </NativeBaseProvider>
)};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};


Home.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Home.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Home
