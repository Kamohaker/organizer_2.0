import React from "react";
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import TabNavigator from "../tabs/Tabs";
import { Image,NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../../assets/logos.png"
import Icon from "react-native-vector-icons/AntDesign";
import MailsSctreen from "../../scenes/mails/Mails";
import ToDoScreen from "../../scenes/todo/ToDo";
import LecturersScreen from "../../scenes/lecturers";
import ScheduleScreen from "../../scenes/schedule";
import TimetableScreen from "../../scenes/timetable";
import LinksScreen from "../../scenes/links";
import WalletScreen from "../../scenes/wallet";
import NotebookScreen from "../../scenes/notebook";
import NotebookPageScreen from "../../scenes/notebook/notebookPage";
import NotebookEditScreen from "../../scenes/notebook/NotebookEdit";
import WalletEditScreen from "../../scenes/wallet/walletEdit";
import WalletPageScreen from "../../scenes/wallet/walletPage";
import LinksPageScreen from "../../scenes/links/linksPage";
import LinksEditScreen from "../../scenes/links/linksEdit";
import MailsPageScreen from "../../scenes/mails/mailsPage";
import MailsEditScreen from "../../scenes/mails/mailsEdit";

const Drawer = createDrawerNavigator();

export function DrawerNavigator  ()  {

  return(
  <Drawer.Navigator
  
  useLegacyImplementation
  drawerContent={(props) => {
    const filteredProps = {
      ...props,
      state: {
        ...props.state,
        routeNames: props.state.routeNames.filter(
         (routeName) => routeName !== 'NotatnikStrona',
         (routeName) => routeName !== 'NotatnikEdytuj',
         (routeName) => routeName !== 'PortfelEdytuj',
         (routeName) => routeName !== 'PortfelStorna',
         (routeName) => routeName !== 'LinkiStrona',
         (routeName) => routeName !== 'LinkiEdytuj',
         (routeName) => routeName !== 'MailStrona',
         (routeName) => routeName !== 'MailEdytuj',
        ),
        routes: props.state.routes.filter(
          (route) =>
            route.name !== 'NotatnikStrona' &&
            route.name !== 'NotatnikEdytuj' &&
            route.name !== 'PortfelEdytuj' &&
            route.name !== 'PortfelStrona' &&
            route.name !== 'LinkiStrona' &&
            route.name !== 'LinkiEdytuj' &&
            route.name !== 'MailStrona' &&
            route.name !== 'MailEdytuj'
        ),
      },
    };

    return (
      <DrawerContentScrollView style={{backgroundColor:"#0c4a6e"}}{...filteredProps}>
         <NativeBaseProvider>
         <Image  alt="Logo" source={logo} borderRadius={50} style={{ width: 250, height: 250 }} />
        <DrawerItemList {...filteredProps} />
        </NativeBaseProvider>
      </DrawerContentScrollView>
    );

  }}
  screenOptions={{
    headerTintColor: '#a3e635',
    headerStyle: {
       backgroundColor: '#002851'
    }
  }}>
    
    <Drawer.Screen
      name="Główna"
      component={TabNavigator}
      options={{
        drawerIcon: ({  }) => (
          <Icon name="home" size={30} color="#db2777" /> )
      }}
      />
       <Drawer.Screen
      name="Maile"
      options={{
        
        drawerIcon: ({  }) => (
          <Icon name="mail" size={30} color="#ea580c" /> )
      }}
      component={MailsSctreen}
      />
       <Drawer.Screen
      name="To do"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="carryout" size={30} color="#dc2626" /> )
      }}
      component={ToDoScreen}
      />
      <Drawer.Screen
      name="Prowadzący"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="contacts" size={30} color="#facc15" /> )
      }}
      component={LecturersScreen }
      />
      <Drawer.Screen
      name="Plan zajęć"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="calendar" size={30} color="#16a34a" /> )
      }}
      
      component={ScheduleScreen}
      />
      <Drawer.Screen
      name="Terminarz"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="form" size={30} color="#1a91ff" /> )
      }}
      
      component={TimetableScreen}
      />
      <Drawer.Screen
      name="Linki"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="link" size={30} color="#e879f9" /> )
      }}
      
      component={LinksScreen}
      />
      <Drawer.Screen
      name="Portfel"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="wallet" size={30} color="#22d3ee" /> )
      }}
      
      component={WalletScreen}
      />
            <Drawer.Screen
      name="Notatnik"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="filetext1" size={30} color="#a3e635" /> )
      }}
      
      component={NotebookScreen}
      />
      <Drawer.Screen
      name="NotatnikStrona"
      
      component={NotebookPageScreen}
      />
       <Drawer.Screen
      name="NotatnikEdytuj"
      
      component={NotebookEditScreen}
      />
       <Drawer.Screen
      name="PortfelEdytuj"
      
      component={WalletEditScreen}
      />
       <Drawer.Screen
      name="PortfelStrona"
      
      component={WalletPageScreen}
      />
       <Drawer.Screen
      name="LinkiStrona"
      
      component={LinksPageScreen}
      />
       <Drawer.Screen
      name="LinkiEdytuj"
      
      component={LinksEditScreen}
      />
      <Drawer.Screen
      name="MailStrona"
      
      component={MailsPageScreen}
      />
    <Drawer.Screen
      name="MailEdytuj"
      
      component={MailsEditScreen}
      />
   
   
  </Drawer.Navigator>
  );
}


