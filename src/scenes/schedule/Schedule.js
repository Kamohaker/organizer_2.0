import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider,Pressable,Icon, Box,VStack,Fab, Button, Image, Text,ScrollView, FlatList, HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar,Agenda } from "react-native-calendars";
import { useState ,useEffect} from "react";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0c4a6e"
   
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
  },
  text_box: {
    fontSize: 18,
    marginBottom: 20,
    
    marginLeft:10
  },
  boxes:{
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.darkGreen,
    backgroundColor:colors.green,
    marginTop:20,
    marginLeft:10 ,
    paddingRight:10,
    width:'100%',
    height:80,
    alignItems:'center',
    paddingTop:18
  }
});


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}


const Shedule = ({ route,navigation }) => {
  const from = route?.params?.from
  const url = 'http://192.168.0.188/organizer/index_schedule.php';//dom
  //const url = 'http://192.168.1.209/organizer/index_schedule.php';//aka

  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneDaty,setDaty] = useState('');
  const [items, setItems] = useState({});

  useEffect(()=>{
    const focusHandler = navigation.addListener('focus', () => {
      axios.get(url).then(response =>{
    
        setData(response.data) 
    
          })
        .catch(err=> console.log(err))
  } ); 
  return (focusHandler)
  },[])

    const postData = () =>{
    
      axios.post(url,{
        nazwa:daneNazwa,
        kiedy:daneDaty
      }).then(response => console.log('dodano:',daneNazwa,daneDaty),
       setShowModal(false)
      
      ).catch(err=>console.log(err))
    }

  const loadItems = (day) => {

    setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);

            if (!items[strTime]) {
                items[strTime] = [];

                const numItems = Math.floor(Math.random()  + 1);//num zdarzen
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
     <View style={styles.root}>
      
          <FlatList data={data.filter(obj=>obj.kiedy==item.name)}  renderItem={({item}) => 
           <Box style={styles.boxes}>
            <HStack space={10}>
          <Text style={styles.text_box} > {item.nazwa}</Text>
          <Text style={styles.text_box} > {item.kiedy}</Text>
         </HStack>
          </Box> }
          keyExtractor={item => item.id} 
          
          />         
      
      </View>
  );
}


  return(
  <NativeBaseProvider>
   <LinearGradient
        colors={['#0c4a6e', '#7dd3fc']}
        style={styles.root}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
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
                loadItemsForMonth={loadItems}
                showClosingKnob={true}
                refreshing={true}
                renderItem={renderItem}
            />
       <Fab  shadow={4} bgColor={'#002851'} 
          onPress={() => navigation.navigate('PlanStrona')}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
        

   </LinearGradient>
  </NativeBaseProvider>
)};

Shedule.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};


Shedule.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Shedule.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default Shedule
