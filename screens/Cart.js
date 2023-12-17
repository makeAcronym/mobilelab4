// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import {View, Text, StyleSheet} from 'react-native';
export default function Cart(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cart
            </Text>
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
    }
});