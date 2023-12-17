// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from "./AuthContext";

const Profile = ({navigation}) => {
    const { userId, setUserId, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [usersCapFirstname, setUsersCapFirstname] = useState(" ");
    const [usersCapLastname, setUsersCapLastname] = useState(" ");
    useEffect(()=>{
        getUsers();
    }, []);

    const getUsers = () => {
        const url = `https://fakestoreapi.com/users/${userId}`;

        fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(json=>{
                setUsers(json);
                if (json.name){
                    setUsersCapFirstname(capitalizeFirstLetter(json.name.firstname));
                    setUsersCapLastname(capitalizeFirstLetter(json.name.lastname));
                }
            })
    }
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerProfile}>
                <Image source={require('../assets/favicon.png')} style={styles.avtImg}/>
                {users.name ? (
                    <Text style={{fontSize: 25, fontWeight: '700', marginRight: 110, marginTop: 15}}>{usersCapFirstname} {usersCapLastname}</Text>
                ) : (
                    <Text></Text>
                )}
                <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.navigate('EditProfile', {userID: userId})}>
                    <FontAwesome5 name='edit' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: '500', fontSize: 16,}}>Name:</Text>
                {users.name ? (
                    <Text>{users.name.firstname} {users.name.lastname}</Text>
                ) : (
                    <Text></Text>
                )}
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: '500', fontSize: 16,}}>Username:</Text>
                <Text>{users.username}</Text>
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: '500', fontSize: 16,}}>Email:</Text>
                <Text>{users.email}</Text>
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: '500', fontSize: 16,}}>Phone:</Text>
                <Text>{users.phone}</Text>
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: '500', fontSize: 16,}}>Address:</Text>
                {users.address ? (
                    <Text>{users.address.number}, {users.address.street}, {users.address.city}</Text>   
                ) : (
                    <Text></Text>
                )}
            </View>
            <Button 
                title='LOG OUT'
                onPress={() => setIsAuthenticated(false)}
            />
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    TextHome: {
        fontSize: 20,
        marginBottom: 10,
    },
    avtImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    headerProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 10,
    }
});