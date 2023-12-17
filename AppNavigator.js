// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import {AuthContext} from './screens/AuthContext.js';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React,{ useContext } from 'react';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import HomeBottom from './screens/HomeBottom.js';
const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    const {isAuthenticated} = useContext(AuthContext);
    return (
        //<AuthProvider></AuthProvider> không được vì không được tự đưa ra tự dùng
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated
                    ?(
                        <Stack.Screen name="HomeBottom" component={HomeBottom} options={{ headerShown: false }}/>
                    )
                    :(
                        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }}/>
                    )

                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}