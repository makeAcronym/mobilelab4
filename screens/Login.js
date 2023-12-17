// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import {
  Pressable,
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons.js";
import Logo from "../components/Logo";

export default function Login() {
  const navigation = useNavigation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AuthContext);
  const handleLogin = () => {
    if (email === "21521129@gm.uit.edu.vn" && password === "ngovoquangminh") {
      setIsAuthenticated(true);
    } else {
      Alert.alert("Warning", "Incorrect email or password");
    }
  };
  const handleOnPressSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Logo
          source={require("../assets/React_Native_Logo.png")}
          title={"WELCOME"}
        />
        <View style={styles.input}>
          <IonIcon name={"mail-outline"} size={25} style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.input}>
          <IonIcon name={"lock-closed-outline"} size={25} style={styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.otherLoginContainer}>
          <Text style={styles.otherLoginText}>Or login with</Text>

          <View style={styles.appImageContainer}>
            <View>
              <Image
                style={styles.appImage}
                source={{
                  uri: "https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png",
                }}
              />
            </View>
            <View>
              <Image
                style={styles.appImage}
                source={{
                  uri: "https://th.bing.com/th/id/OIP.HgH-NjiOdFOrkmwjsZCCfAHaHl?pid=ImgDet&rs=1",
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <Pressable onPress={handleOnPressSignUp}>
            <Text style={{ fontSize: 16, color: "blue" }}> Sign up here!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 28,
  },
  input: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 9,
    margin: 10,
    alignItems: "center",
  },
  icon: {
    margin: 5,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E67205",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 900,
    fontSize: 18,
    color: "white",
  },
  forgotPasswordText: {
    textAlign: "right",
    marginRight: 10,
    color: "#DF88B9",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },
  otherLoginContainer: {
    alignItems: "center",
  },
  appImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
    margin: 20,
  },
  otherLoginText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  appImageContainer: {
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
