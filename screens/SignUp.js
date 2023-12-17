// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Pressable, Alert, SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons.js';
import Logo from "../components/Logo";

export default function SignUp(){
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
            <Logo
                source={require('../assets/React_Native_Logo.png')}
                title={'Create New Account'}
            />
            <View style={styles.input}>
            <IonIcon name = {'person-outline'} size = {25} style={styles.icon}/>
            <TextInput
                placeholder="Enter username"
            />
            </View>
            <View style={styles.input}>
          <IonIcon name={"mail-outline"} size={25} style={styles.icon} />
          <TextInput
            placeholder="Enter email"
          />
        </View>
            <View style={styles.input}>
            <IonIcon name = {'lock-closed-outline'} size = {25} style={styles.icon}/>
            <TextInput
                placeholder="Enter password"
                secureTextEntry
            />
            </View>
            
            <View style={styles.input}>
            <IonIcon name = {'lock-closed-outline'} size = {25} style={styles.icon}/>
            <TextInput
                placeholder="Confirm password"
                secureTextEntry
            />
            </View>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>

      <View
          style={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          <Text style={{fontSize: 16 }}>
            Already have an account?  
          </Text>
          <Pressable
          onPress={() => navigation.navigate("Login")}>
          <Text style={{fontSize: 16, color:"blue" }}> Login now!</Text>
        </Pressable>
        </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignContent: 'center',
        justifyContent: 'center',
        padding: 28,
    },
    input:{
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingVertical: 9,
        margin: 10,
        alignItems: 'center'
    },
    icon:{
        margin: 5,
        marginRight: 10,
    },
    button:{
        alignItems: 'center', 
        backgroundColor: '#E67205', 
        padding: 10,
        paddingVertical: 15, 
        borderRadius: 10,
        margin: 10,
    },
    buttonText:{
        fontSize: 900,
        fontSize: 18,
        color: 'white',
    },
    appImage:{
        width: 50, 
        height: 50, 
        borderRadius: 60, 
        margin: 20,
    },
    appImageContainer:{
        marginTop: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
    },
});