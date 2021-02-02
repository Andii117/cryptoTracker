import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import Colors from 'cryptoTracker/src/res/colors';




const Stack = createStackNavigator();

const coinsStack = () => 
{
    return  (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowOpacity: 0,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen
                name="Coins"
                component={CoinsScreen}
            />

            <Stack.Screen 
                name="CoinsDetail"
                component={CoinDetailScreen}
            />
        </Stack.Navigator>
    );
}
/* Siempre exportar el componente creado la aplicación no funciona sin esto pero no dice 
   que tiene error
 */
export default coinsStack;