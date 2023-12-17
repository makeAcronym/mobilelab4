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
  Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';



export default function Categories(){
    const images = [
        require("../assets/device.png"),
        require("../assets/diamond.png"),
        require("../assets/polo.png"),
        require("../assets/dress.png"),
      ];
    const [categories,setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products,setProducts] = useState([]);
    const fetchCategories = async () => {
        try {
          const response = await axios.get("https://fakestoreapi.com/products/categories");
          setCategories(response.data);
          console.log("categories: ", response.data);
        } catch (error) {
          console.log("error message", error);
        }
      };
    const fetchCategory = async () => {
        try{
            const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            setProducts(response.data);
            console.log("products: ", response.data);
        } 
        catch (error){
            console.log("error message", error);
        }
    }
    const fetchProducts = async () => {
        try{
            const response = await axios.get(`https://fakestoreapi.com/products`)
            setProducts(response.data);
            console.log("products: ", response.data);
        } 
        catch (error){
            console.log("error message", error);
        }
    }
    useEffect(() => {
        fetchProducts();
        fetchCategories();
      }, []);
    
      useEffect(() => {
        if (selectedCategory === "") {
          fetchProducts();
        } else {
          fetchCategory(selectedCategory);
        }
      }, [selectedCategory]);
      const handleCategorySelect = (category) => {
        if(category==='')
        {
         setSelectedCategory('');
        }
        else{
        setSelectedCategory(category);
        }
      };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <ScrollView horizontal={true} style={styles.exception} showsHorizontalScrollIndicator={false}>
            <Pressable
            onPress={()=>handleCategorySelect('')}>
            <View style={[styles.flatlist, {marginLeft: 20}, selectedCategory === "" && styles.selectedCategory]}>
                <Image
                source={require('../assets/window.png')}
                style={styles.categoryImage}
                />
                <Text style={[styles.categories, selectedCategory === "" && styles.selectedText]}>All</Text>
            </View>
            </Pressable>
            <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Pressable
            onPress={()=>handleCategorySelect(item)}
            >
            <View style={[styles.flatlist,selectedCategory === item && styles.selectedCategory,]}>
                <Image
                source={images[index]}
                style={styles.categoryImage}
                />
                <Text style={[styles.categories,selectedCategory === item && styles.selectedText,]}>{item}</Text>
            </View>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        </ScrollView>
        </ScrollView>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "column",
                margin: 10,
                width: "45%",
              }}
            >
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <Text style={styles.itemTitle}>{item.title.length > 38
                    ? item.title.slice(0, 38)
                    : item.title}</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatlist:{
        marginVertical: 15,
        alignItems: 'center',
    //justifyContent: 'center',
    marginRight: 20,
    
    },
    categories:{
        fontSize: 18,
        //marginRight: 20,
    },
    categoryImage:{
        width: 35,
        height: 35,
    }, 
    exception:{
        flexDirection: 'row',
    },
    imageThumbnail: {
        //justifyContent: "center",
        // alignItems: "center",
        height: 200,
        // flex:1,
        //aspectRatio: 1,
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
      },
      selectedCategory: {
        borderBottomColor: "blue",
        borderBottomWidth: 2,
      },
      selectedText: {
        color: "blue",
      },
});