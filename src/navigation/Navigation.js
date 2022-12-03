import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {DrawerNavigator} from './drawer/Drawer'


export default () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
)
