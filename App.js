/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';
//Importamos los favoritos a la aplicación
import FavoritesStack from 'cryptoTracker/src/components/favorites/FavoritesStack';
import Image from 'react-native';
/* Import de la funcionalidad de navegación por TABS en la pantalla principal */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from 'cryptoTracker/src/res/colors'; 

const Tabs = createBottomTabNavigator();

/* Este es el archivo de pantalla principal de la aplicación*/
const App = () => {
  return (
    /* Navegación de tags y pantallas */
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor:"#fefefe",
          style:{
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen 
          name="BANK" 
          component={CoinsStack} 
          /*options = {{ 
            tabBarIcon: ({size,color}) => (
              <Image 
              style={{tintColor: color, width:size, height:size}}
              source={require('cryptoTracker/src/assets/bank.png')} 
              />  
             )
            }}*/
          /> 

        <Tabs.Screen 
          name="Favorites" 
          component={FavoritesStack} 
          /*options = {{ 
            tabBarIcon: ({size,color}) => (
              <Image 
              style={{tintColor: color, width:size, height:size}}
              source={require('cryptoTracker/src/assets/star.png')} 
              />  
             )
            }}*/
          />
      </Tabs.Navigator>
      
    </NavigationContainer>
  );
};


export default App;
