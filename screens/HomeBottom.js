// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from './Profile.js';
import Categories from './Categories.js';
import Cart from './Cart.js';
import IonIcon from 'react-native-vector-icons/Ionicons.js';
import Home from "./Home.js";
import { useNavigation } from "@react-navigation/native";
import HomeStack from "../navigations/HomeStack.js";


const Bottom = createBottomTabNavigator();
const TabIcon = ({name, focused}) => {
    return(
        <IonIcon name={name} size={25}
            color={focused ? '#4390f7' : '#000'}
        />
    );
};

export default function HomeBottom(){
    const navigation= useNavigation();
    return(      
        <Bottom.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Categories') {
                iconName = 'grid';
              } else if (route.name === 'Cart') {
                iconName = 'cart';
              }
    
              return <TabIcon name={iconName} focused={focused} />;
            },
          })}
        >
            {/* một app chỉ có 1 NavigationContainer (vd ở AppNavigator.js) bao luôn ứng dụng */}
            <Bottom.Screen
                name="Home"
                component={HomeStack}
                options={{headerShown: false}}
            />
            <Bottom.Screen
                name="Categories"
                component={Categories}
                options={{headerShown: true}}
            />
            <Bottom.Screen
                name="Cart"
                component={Cart}
                options={{headerShown: true, tabBarBadge:3}}
            />
            <Bottom.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: true}}
                
            />
        </Bottom.Navigator>
    );
}