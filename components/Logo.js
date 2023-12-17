// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Logo({ source, title }) {
  return (
    <View style={styles.appContainer}>
      <Image source={source} style={styles.logo} />
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
},
  logo: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginTop: 15,
    marginBottom: 10,
  },
});
