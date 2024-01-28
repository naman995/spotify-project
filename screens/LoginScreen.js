import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("access token", accessToken);
      console.log("expiration Token", expirationDate);

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          // Tokken is still valid
          navigation.replace("Main");
        } else {
          // token would be expired
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };
    checkTokenValidity();
  }, []);
  async function authenticate() {
    const config = {
      issuer: "https://accounts.spotify.com",
      clientId: "974d42d2c8d7426ab052ee408dcad5b5",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      redirectUrl: "exp://192.168.1.6:8081/--/spotify-auth-callback",
    };
    const result = await AppAuth.authAsync(config);
    console.log(result);
    if (result.accessToken) {
      const expirationDate = new Date(
        result.accessTokenExpirationDate
      ).getTime();
      AsyncStorage.setItem("token", result.accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      Navigation.navigate("Main");
    }
  }
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of songs Free on spotify!
        </Text>
        <View style={{ height: 80 }} />
        <Pressable
          onPress={authenticate}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#040306",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
              //   marginTop: 40,
            }}
          >
            Countinue with Phone Number
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#040306",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
              //   marginTop: 40,
            }}
          >
            Countinue with Google
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#040306",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
              //   marginTop: 40,
            }}
          >
            Sign In with FaceBook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
