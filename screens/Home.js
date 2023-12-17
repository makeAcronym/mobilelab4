// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { userId, setUserId } = useContext(AuthContext);
  const navigation = useNavigation();
  const [hotDeals, setHotDeals] = useState([]);
  const [newArrivals, setNewArrivals] =useState([]);
  const width = Dimensions.get("window").width;
  const images = [
    "https://i.pinimg.com/originals/60/b0/a4/60b0a4ee7e032a6281444a82705a665c.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/85fb4e56509989.59b1565f7cc0e.jpg",
    "https://i.pinimg.com/originals/6f/39/35/6f393516f4f2876c5ff1b8ddcf57c638.jpg",
  ];
  const fetchProducts = async () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        const products = response.data;
        sortedProducts = products.sort(
            (a, b) => b.rating.rate - a.rating.rate
          );
          // Lấy 4 sản phẩm có rate cao nhất từ danh sách đã sắp xếp
          const topRatedProducts = sortedProducts.slice(0, 4);
          setHotDeals(topRatedProducts);
          let sortedProducts = products.sort(
            (a, b) => a.rating.count - b.rating.count
          );
          // Lấy 4 sản phẩm có rating count thấp nhất từ danh sách đã sắp xếp
        const lowestRatedProducts = sortedProducts.slice(0, 4);
        setNewArrivals(lowestRatedProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Shop for quality, shop for price</Text>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={2000}
        onSnapToItem={() => {}}
        renderItem={({ index }) => (
          <View
            style={{
              flex:1,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: images[index] }}
            />
          </View>
        )}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
      <Text style={styles.mainProductsText}> Hot Deals 🔥</Text>
        <FlatList
          data={hotDeals}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "column",
                margin: 10,
                width: "45%",
              }}
            >
              <Pressable
               onPress={()=>navigation.navigate('Product Details'
                , {

                    title: item.title,
                    price: item?.price,
                    rating: item.rating,
                    description: item?.description,
                    image: item?.image,
                    

               })}
              >  
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <Text style={styles.itemTitle}>{item.title.length > 38
                    ? item.title.slice(0, 38)
                    : item.title}</Text>
              </Pressable>
              <View
                style={{
                    flexDirection:"row",
                    alignItems: 'center'
                }}
              >
                <View
                    style={{flexDirection: 'column', }}
                >
                    <Text style={styles.itemPrice}>${item.price} </Text>
                    <Text style={styles.itemStat}>{item.rating.rate} ⭐ {'\u0028'}{item.rating.count}{'\u0029'}</Text> 
                </View>
                <FontAwesome5 name ="plus-circle" size={25} color="#0C336C" style={{ marginLeft: "auto",}}/>
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.mainProductsText}> New Arrivals 🌟</Text>
        <FlatList
          data={newArrivals}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "column",
                margin: 10,
                width: "45%",
              }}
            >
              <Pressable
               onPress={()=>navigation.navigate('Product Details'
                , {

                    title: item.title,
                    price: item?.price,
                    rating: item.rating,
                    description: item?.description,
                    image: item?.image,
                    

               })}
              >  
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <Text style={styles.itemTitle}>{item.title.length > 38
                    ? item.title.slice(0, 38)
                    : item.title}</Text>
            </Pressable>
              <View
                style={{
                    flexDirection:"row",
                }}
              >
                <View
                    style={{flexDirection: 'column'}}
                >
                    <Text style ={styles.itemPrice}>${item.price} </Text>
                    <Text style={styles.itemStat}>{item.rating.rate} ⭐ {'\u0028'}{item.rating.count}{'\u0029'}</Text> 
                </View>
                <FontAwesome5 name ="plus-circle" size={25} color="#0C336C" style={{ marginLeft: "auto",}}/>
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    marginVertical: 10,
    color: "#AF3A5D",
    textAlign: "center",
  },
  imageThumbnail: {
    //justifyContent: "center",
    // alignItems: "center",
    height: 200,
    // flex:1,
    //aspectRatio: 1,
  },
  mainProductsText:{
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: "#DD0C0D",
  },
  itemTitle: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AF3A5D',
  },
  itemStat: {
    fontSize: 18,
  }
});
