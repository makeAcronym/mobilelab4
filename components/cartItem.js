import React, {useState, useEffect} from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';

const ItemCart = ({cartID,id,name, urlImg, price, quantity, userID, getchangedValue, getcheckChangedValue}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [num, setNum] = useState(quantity);
    const [total, setTotal] = useState(num * price);
    const [checkVisible, setCheckVisible] = useState(true);
    useEffect(() => {
        updateProductsCart(num, id);
        setTotal(num * price);
    })
    const incrementCount = () => {  
        setNum(num + 1);  
    };  
    const decrementCount = () => {  
        if (num > 1){
            setNum(num - 1);  
        }else{
            setModalVisible(true);
        }
    };
    const updateProductsCart = (num, id) => {
        fetch(`https://fakestoreapi.com/carts/${cartID}`,{
            method:"PUT",
            body:JSON.stringify(
                {
                    userId: userID,
                    products:[{productId:id,quantity:num}]
                }
            )
        })
        .then(res=>{
            return res.json();
        })
        .then(json=>{
            console.log(json);
        })
    }
    const handleClickCancel = () => {
        setModalVisible(true);
        getcheckChangedValue();
    }
    const delProductCart = () => {
        setCheckVisible(false);
        setModalVisible(false);
        getchangedValue(total);
        fetch(`https://fakestoreapi.com/carts/${cartID}`,{
            method:"DELETE"
        })
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            console.log(json);
        })
    }
    return (
        <View style={[styles.itemWrapper, {display: checkVisible ? 'flex' : 'none'}]}>
            <Text style={styles.textName}>{name}</Text>
            <View style={styles.info}>
                <Image source={{uri: urlImg}} style={styles.itemImage}/>
                <View style={styles.detailInfo}>
                    <Text style={styles.price}>${price}</Text>
                    <View style={styles.numSelect}>
                        <TouchableOpacity onPress={() => decrementCount()} style={{justifyContent: 'center'}}>
                            <IconFontAwesome name='minus' style={styles.minusIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{num}</Text>
                        <TouchableOpacity onPress={() => incrementCount()} style={{justifyContent: 'center'}}>
                            <IconFontAwesome name='plus' style={styles.plusIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.total}>Total: ${total}</Text>
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => handleClickCancel()}>
                    <MaterialIcons name='cancel' color={"red"} size={25} style={styles.cancelIcon}/>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.header}>
                            <View style={styles.TextView}>
                                <Text style={styles.Text}>Are you sure you want to delete this product?</Text>
                            </View>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.touchableBtnYes} onPress={() => delProductCart()}>
                                <Text style={styles.textBtnYes}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableBtnNo} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textBtnNo}>No</Text>    
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

export default ItemCart;

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: 'white',
        width: '97%',
        padding: 10,
        marginTop: 10,
        height: 145,
        borderRadius: 10,
    },
    price: {
        fontWeight: '500',
        marginBottom: 10,
    },
    textName: {
        marginBottom: 5,
        height: 40,
    },
    itemImage: {
        width: 80,
        height: 80,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailInfo: {
        justifyContent: 'center',
        width: 60,
    },
    total: {
        fontWeight: '500',
        textAlignVertical: 'center',
    },
    numSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    minusIcon: {
        fontSize: 15,
    },
    plusIcon: {
        fontSize: 15,
    },
    cancelIcon: {
        textAlignVertical: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(97, 97, 97, 0.5)',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    header: {
        height: 80,
        width: 300,
        paddingTop: 10,
    },
    TextView: {
        flex: 1,
        paddingHorizontal: 10,
        margin: 10,
    },
    Text: {
        fontSize: 15,
    },
    touchableBtnNo: {
        padding: 10,
        backgroundColor: '#0088FE',
        borderRadius: 10,
        width: 120,
        height: 60,
        justifyContent: 'center',
    },
    touchableBtnYes: {
        padding: 10,
        backgroundColor: '#FE2200',
        borderRadius: 10,
        width: 120,
        height: 60,
        marginRight: 10,
        justifyContent: 'center',
    },
    textBtnNo: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    textBtnYes: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    btnView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginLeft: 5,
    }
});