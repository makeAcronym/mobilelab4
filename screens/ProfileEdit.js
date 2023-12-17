// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React, {useEffect, useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditProfile = ({route, navigation}) => {
    const {userID} = route.params;
    const [users, setUsers] = useState([]);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newHouseNum, setNewHouseNum] = useState(null);
    const [newStreet, setNewStreet] = useState("");
    const [newCity, setNewCity] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                updateUsers();
              }}
              style={{ marginRight: 15 }}>
              <AntDesign name='check' size={25} />
            </TouchableOpacity>
          ),
        });
    }, [navigation]);

    useEffect(()=>{
        getUsers();
    }, []);

    const getUsers = () => {
        const url = `https://fakestoreapi.com/users/${userID}`;

        fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(json=>{
                setUsers(json);
            })
    }

    const updateUsers = () => {
        fetch(`https://fakestoreapi.com/users/${userID}`,{
            method:"PUT",
            body:JSON.stringify(
                {
                email: `${newEmail}`,
                username: `${newUsername}`,
                password: `${users.password}`,
                name:{
                    firstname: `${newFirstName}`,
                    lastname: `${newLastName}`
                },
                address:{
                    city:`${newCity}`,
                    street:`${newStreet}`,
                    number: `${newHouseNum}`,
                    zipcode: `${users.zipcode}`,
                    geolocation:{
                        lat: (users.geolocation ? users.geolocation.lat : null),
                        long: (users.geolocation ? users.geolocation.long : null)
                    }
                },
                phone: `${newPhone}`
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
    }

    const handleFirstNameChange = (value) => {
        setNewFirstName(value);
    }   
    const handleLastNameChange = (value) => {
        setNewLastName(value);
    }  
    const handleUsernameChange = (value) => {
        setNewUsername(value);
    } 
    const handleEmailChange = (value) => {
        setNewEmail(value);
    } 
    const handlePhoneNumChange = (value) => {
        setNewPhone(value);
    } 
    const handleHouseNumChange = (value) => {
        setNewHouseNum(value);
    }
    const handleStreetChange = (value) => {
        setNewStreet(value);
    }
    const handleCityChange = (value) => {
        setNewCity(value);
    }
    return (
        <View style={styles.container}>
            <View style={styles.nameWrapper}>
                <View >
                    <Text style={styles.labelTitle}>First Name</Text>
                    {users.name ? (
                        <TextInput style={styles.inputBoxFirstname} placeholder={users.name.firstname} onChangeText={handleFirstNameChange}/>
                    ) : (
                        <Text></Text>
                    )}
                </View>
                <View >
                    <Text style={styles.labelTitle}>Last Name</Text>
                    {users.name ? (
                        <TextInput style={styles.inputBoxLastname} placeholder={users.name.lastname} onChangeText={handleLastNameChange}/>
                    ) : (
                        <Text></Text>
                    )}
                </View>
            </View>
            <View >
                <Text style={styles.labelTitle}>Username</Text>
                <TextInput style={styles.inputBox} placeholder={users.username} onChangeText={handleUsernameChange}/>
            </View>
            <View >
                <Text style={styles.labelTitle}>Email</Text>
                <TextInput style={styles.inputBox} placeholder={users.email} onChangeText={handleEmailChange}/>
            </View>
            <View >
                <Text style={styles.labelTitle}>Phone Number</Text>
                <TextInput style={styles.inputBox} placeholder={users.phone} onChangeText={handlePhoneNumChange}/>
            </View>
            <View >
                <Text style={styles.labelTitle}>House Number</Text>

                {users.address ? (
                    <TextInput style={styles.inputBox} placeholder={users.address.number.toString()} onChangeText={handleHouseNumChange}/>
                ) : (
                    <Text></Text>
                )}
            </View>
            <View >
                <Text style={styles.labelTitle}>Street</Text>
                {users.address ? (
                    <TextInput style={styles.inputBox} placeholder={users.address.street} onChangeText={handleStreetChange}/>
                ) : (
                    <Text></Text>
                )}
            </View>
            <View >
                <Text style={styles.labelTitle}>City</Text>
                {users.address ? (
                    <TextInput style={styles.inputBox} placeholder={users.address.city} onChangeText={handleCityChange}/>
                ) : (
                    <Text></Text>
                )}
            </View>
        </View>
    );
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    nameWrapper: {
        flexDirection: 'row',
    },
    labelTitle: {
        fontWeight: '500',
        fontSize: 18,
    },
    inputBoxFirstname: {
        height: 40,
        width: 220,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
        marginVertical: 10,
        marginRight: 10,
        paddingLeft: 10,
    },
    inputBoxLastname: {
        height: 40,
        width: 140,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
        marginVertical: 10,
        paddingLeft: 10,
    },
    inputBox: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
        marginVertical: 10,
        paddingLeft: 10,
    }
});