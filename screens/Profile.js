// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Profile(){
    const {setIsAuthenticated,setEmail,setPassword} = useContext(AuthContext);
    const handleLogout = () => {
        setEmail('');
        setPassword('');
        setIsAuthenticated(false);
        console.log('Logged Out!');
    };
    return(
        <View style={styles.container}>
        <Text style={styles.title}>
            Profile
        </Text>
        <Button
            title={'LOG OUT'}
            onPress={handleLogout}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});