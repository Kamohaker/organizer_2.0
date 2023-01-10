import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar ,TouchableOpacity} from "react-native";
import { NativeBaseProvider,Pressable,Icon, Box,VStack,IconButton, Button, Image, Text,ScrollView, FlatList, HStack, Fab } from "native-base";
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
    fontSize: 16,
    marginBottom: 16,
    marginTop:18,
    marginLeft:10
  },
  
  boxes: {
    borderBottomWidth:5,
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5,
    borderRadius:20,
    borderColor:colors.darkRed ,
    backgroundColor:colors.red,
    marginTop:20,
    marginLeft:8,
    paddingTop:20,
    width:'100%',
    height:80,
    alignItems:'center'
  },
  listItem: {
    backgroundColor: colors.darkRed,
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft:10,
    paddingTop:10,
  
    width: '100%',
    height: '100%',
    backgroundColor: colors.green,
  },
});


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}


const ToDo = ({ route,navigation }) => {
  const from = route?.params?.from
  //const url = 'http://192.168.0.186/organizer/index_todo.php';//dom
  const url = 'http://192.168.1.209/organizer/index_todo.php';//aka

  const [data, setData] = useState([]);
  const [daneNazwa,setNazwa] = useState('');
  const [daneDaty,setDaty] = useState('');
  const [items, setItems] = useState({});


  
  const [shows, setShows] = useState(false)
  const handleClick = () => setShows(!shows)
 
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


const ListItem = ({item, selected, onPress, onLongPress}) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.listItem}>
      <View style={{padding: 14}}>
      <HStack space={4} >
      <Icon
                      as={<AntDesign name={"close"} />}
                      size={8}
                     
                      color={colors.yellow}/>
        <Text style={{fontSize: 22, color: '#fff'}}> { ((item.nazwa).length > 10) ? 
                  (((item.nazwa).substring(0,7)) + '...') : 
                  item.nazwa }</Text>
        <Text marginTop={10}>{item.kiedy}</Text>
       
        </HStack>
      </View>
      {selected && <View style={styles.overlay} >
        <HStack space={4} >
        <Icon
                      as={<AntDesign name={"check"} />}
                      size={8}
                     
                      color={colors.yellow}/>
      <Text fontSize= '22' color= {colors.red} strikeThrough> { ((item.nazwa).length > 10) ? 
                  (((item.nazwa).substring(0,7)) + '...') : 
                  item.nazwa }</Text>
        <Text marginTop={10}>{item.kiedy}</Text>
      
          </HStack>
        </View>}
    </TouchableOpacity>
  </>
);

const [selectedItems, setSelectedItems] = useState([]);

const handleLongPress = contact => {
  selectItems(contact)
};

const handleOnPress = contact => {
  if (selectedItems.length) {
    return selectItems(contact);
  }
  // here you can add you code what do you want if user just do single tap
  console.log('pressed');
};

const getSelected = contact => selectedItems.includes(contact.id);

const deSelectItems = () => setSelectedItems([]);

const selectItems = item => {
  if (selectedItems.includes(item.id)) {
    const newListItems = selectedItems.filter(
      listItem => listItem !== item.id,
    );
    return setSelectedItems([...newListItems]);
  }
  setSelectedItems([...selectedItems, item.id]);
};

const renderItem = (item) => {
  return (
    <NativeBaseProvider>
     <View style={styles.root}>
     
     <Pressable onPress={deSelectItems} style={{flex: 1, padding: 15}}>
      <FlatList
        data={data.filter(obj=>obj.kiedy==item.name)}
        renderItem={({item}) => (
          <ListItem
            onPress={() => handleOnPress(item)}
            onLongPress={handleLongPress}
            selected={getSelected(item)}
            item={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Pressable>
      </View>
      </NativeBaseProvider>
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
          onPress={() => navigation.navigate('Dodaj ToDo')}
          icon={<Icon color="#a3e635" as={AntDesign} name="plus" size="lg" />} />
          
          
   </LinearGradient>
  </NativeBaseProvider>
)};

ToDo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};


ToDo.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

ToDo.defaultProps = {
  route: { params: { from: '' } },
  navigation: { navigate: () => null },
};

export default ToDo
