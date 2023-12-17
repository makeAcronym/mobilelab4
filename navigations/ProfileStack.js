import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen 
            name='Profile' 
            component={Profile} 
            options={{headerShown: null}}>
          </Stack.Screen>
          <Stack.Screen 
            name='Edit Profile' 
            component={ProfileEdit}>
          </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ProfileStack;