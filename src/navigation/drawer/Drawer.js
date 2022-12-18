import React from "react";
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import TabNavigator from "../tabs/Tabs";
import { Image,NativeBaseProvider } from "native-base";
import logo from "../../../assets/logos.png"
import Icon from "react-native-vector-icons/AntDesign";
import MailsSctreen from "../../scenes/mails/Mails";
import MailsPageScreen from "../../scenes/mails/mailsPage";
import MailsEditScreen from "../../scenes/mails/mailsEdit";
import ToDoScreen from "../../scenes/todo/ToDo";
import ToDoPageScreen from "../../scenes/todo/todoPage";
import LecturersScreen from "../../scenes/lecturers";
import LecturesPageScreen from "../../scenes/lecturers/lecturesPage";
import LecturesEditScreen from "../../scenes/lecturers/lecturesEdit";
import ScheduleScreen from "../../scenes/schedule";
import SchedulePageScreen from "../../scenes/schedule/schedulePage";
import TimetableScreen from "../../scenes/timetable";
import TimetablePageScreen from "../../scenes/timetable/timetablePage";
import LinksScreen from "../../scenes/links";
import LinksPageScreen from "../../scenes/links/linksPage";
import LinksEditScreen from "../../scenes/links/linksEdit";
import WalletScreen from "../../scenes/wallet";
import WalletEditScreen from "../../scenes/wallet/walletEdit";
import WalletPageScreen from "../../scenes/wallet/walletPage";
import NotebookScreen from "../../scenes/notebook";
import NotebookPageScreen from "../../scenes/notebook/notebookPage";
import NotebookEditScreen from "../../scenes/notebook/NotebookEdit";



import {colors} from "../../theme";

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
         (routeName) => routeName !== 'ProwadzacyStrona',
         (routeName) => routeName !== 'ProwadzacyEdytuj',
         (routeName) => routeName !== 'ToDoStorna',
         (routeName) => routeName !== 'TerminarzStorna',
         (routeName) => routeName !== 'PlanStorna',
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
            route.name !== 'MailEdytuj' &&
            route.name !== 'ProwadzacyStrona' &&
            route.name !== 'ProwadzacyEdytuj' &&
            route.name !== 'ToDoStrona' &&
            route.name !== 'TerminarzStrona' &&
            route.name !== 'PlanStrona'


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
    headerTintColor: colors.limone,
    headerStyle: {
       backgroundColor: colors.darkGreyBlue
    }
    
  }}>
    
    <Drawer.Screen
      name="Główna"
      component={TabNavigator}
      options={{
        drawerIcon: ({  }) => (
          <Icon name="home" size={30} color={colors.pink} /> )
      }}
      />
       <Drawer.Screen
      name="Maile"
      options={{
        
        drawerIcon: ({  }) => (
          <Icon name="mail" size={30} color={colors.orange} /> )
      }}
      component={MailsSctreen}
      />
       <Drawer.Screen
      name="To do"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="carryout" size={30} color={colors.red}/> )
      }}
      component={ToDoScreen}
      />
      <Drawer.Screen
      name="Prowadzący"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="contacts" size={30} color={colors.yellow} /> )
      }}
      component={LecturersScreen }
      />
      <Drawer.Screen
      name="Plan zajęć"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="calendar" size={30} color={colors.green} /> )
      }}
      
      component={ScheduleScreen}
      />
      <Drawer.Screen
      name="Terminarz"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="form" size={30} color={colors.blue} /> )
      }}
      
      component={TimetableScreen}
      />
      <Drawer.Screen
      name="Linki"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="link" size={30} color={colors.violet}/> )
      }}
      
      component={LinksScreen}
      />
      <Drawer.Screen
      name="Portfel"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="wallet" size={30} color={colors.lightBlue} /> )
      }}
      
      component={WalletScreen}
      />
            <Drawer.Screen
      name="Notatnik"
      options={{
        drawerIcon: ({  }) => (
          <Icon name="filetext1" size={30} color={colors.limone} /> )
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
      <Drawer.Screen
      name="ProwadzacyEdytuj"
      
      component={LecturesEditScreen}
      />
      <Drawer.Screen
      name="ProwadzacyStrona"
      
      component={LecturesPageScreen}
      />
      <Drawer.Screen
      name="ToDoStrona"
      
      component={ToDoPageScreen}
      />
      <Drawer.Screen
      name="TerminarzStrona"
      
      component={TimetablePageScreen}
      />
      <Drawer.Screen
      name="PlanStrona"
      
      component={SchedulePageScreen}
      />
   
   
  </Drawer.Navigator>
  );
}


