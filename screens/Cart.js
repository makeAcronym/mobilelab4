// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ItemCart from '../components/cartItem';
import { AuthContext } from "./AuthContext";

const Cart = () => {
    const { userId, setUserId } = useContext(AuthContext);
    const [productsCart, setproductsCart] = useState([]);
    const [productsInit, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [changedValue, setChangedValue] = useState(0);
    const [checkchangedValue, setcheckChangedValue] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(()=>{
        getProductsCart();
        getProducts();
        getcheckChangedValue();
    }, []);
    const getProductsCart = () => {
        const url = `https://fakestoreapi.com/carts/user/${userId}`;

        fetch(url)  
            .then(res=>{
                return res.json()
            })
            .then(json=>{
                setproductsCart(json);
            })
    }
    const calTotal = () => {
        let total = 0;
        const productMap = new Map(productsInit.map(product => [product.id, product]));

        productsCart.forEach((item) => {
            item.products.forEach((product) => {
                const matchingProduct = productMap.get(product.productId);
                if (matchingProduct) {
                    total += matchingProduct.price * product.quantity;
                }
            });
        });
        return total;
    }
    const getProducts = () => {
        const url = "https://fakestoreapi.com/products";

        fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(json=>{
                setProducts(json);
            })
    }
    function getchangedValue(value){
        setChangedValue(value)
    }
    function getcheckChangedValue(){
        if (!hasLoaded) {
            setHasLoaded(true);
        }
        if (totalPrice == 0){
            var total = calTotal() - changedValue;
            setTotalPrice(total);
            setChangedValue(0);
        }else{
            var total = totalPrice - changedValue;
            setTotalPrice(total);
            setChangedValue(0);
        }
    }
    return (
        <ScrollView>
            <View style={styles.container} onLayout={getcheckChangedValue}>
                {productsCart.map((item, index) => {
                    return (
                        <View key={item.id}>
                            {item.products.map((products, index) => {
                                return (
                                    <View key={index}>
                                        {productsInit.map((product, index) => {
                                            if (product.id == products.productId){
                                                return (
                                                    <View key={index} style={styles.listItem}>
                                                        <ItemCart 
                                                            cartID = {item.id}
                                                            id={product.id}
                                                            name = {product.title}
                                                            urlImg = {product.image}
                                                            price = {product.price}
                                                            quantity = {products.quantity}
                                                            userID = {userId}
                                                            getchangedValue = {getchangedValue}
                                                            getcheckChangedValue = {getcheckChangedValue}
                                                        />
                                                    </View>
                                                );
                                            }
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}

                <View style={styles.total}>
                    <Text style={styles.textTotal}>Total Amount: ${totalPrice}</Text>
                    <Button title="CHECKOUT" style={styles.btnCheckout}/>
                </View>
            </View>
        </ScrollView>
    );
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    TextHome: {
        fontSize: 20,
    },
    cartItem: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    listItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    total: {
        marginVertical: 15,
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    textTotal: {
        fontWeight: '500',
    },
});