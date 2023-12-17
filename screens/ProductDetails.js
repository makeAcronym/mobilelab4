import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";

import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import axios from "axios";
const ProductDetails = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Image
        style={{ width, height: 300, marginTop: 20, resizeMode: "contain" }}
        source={{ uri: route?.params?.image }}
      />

      <View
        style={{
          padding: 5,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
       
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {route?.params?.title}
          </Text>
        </View>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginHorizontal: 100,
          margin: 10,
        }}
      />

      <View style={{ marginHorizontal: 11 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
     
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price:
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {route?.params?.price.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          
        </View>
      </View>
      <View style={{ padding: 10, marginHorizontal: 11 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Description: </Text>
        <Text style={{ fontSize: 18, fontWeight: "normal", color: "grey" }}>
          {route?.params?.description}
        </Text>
      </View>
      
    <Text style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 21}}>{route.params.rating.rate} ⭐ {'\u0028'}{route.params.rating.count} reviews{'\u0029'}</Text> 
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
});
