import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView,FlatList,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const weatherData = [
  { day: "MON", icon: require("../assets/sunrain.png"), temp: "20°", chance: "30%" },
  { day: "TUE", icon: require("../assets/sunrain.png"), temp: "21°", active: true },
  { day: "WEN", icon: require("../assets/rainly.png"), temp: "18°", chance: "100%" },
  { day: "THU", icon: require("../assets/rainly.png"), temp: "20°", chance: "50%" },
  { day: "FRI", icon: require("../assets/sunrain.png"), temp: "22°",  },
  { day: "STR", icon: require("../assets/rainly.png"), temp: "20°", chance: "40%" },
  { day: "SND", icon: require("../assets/sunrain.png"), temp: "22°", },
];

export default function WeatherScreen() {
  const navigation = useNavigation();
  const asd = null;

  const [currentTime,setCurrentTime] = useState(getFormattedTime());
   function getFormattedTime(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,"0");
    const minutes = now.getMinutes().toString().padStart(2,"0");
    const second = now.getSeconds().toString().padStart(2,"0");
    return `${hours}:${minutes}:${second}`;
   }
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <LinearGradient colors={["#5B8E55", "white", "white"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#333" />
            </TouchableOpacity>

            <View style={styles.topRow}>
              <Ionicons name="location-outline" size={20} color="#000" />
              <Text style={styles.location}>USA, New York</Text>
            </View>

            <View style={styles.topRow2}>
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </View>

          <Image source={require("../assets/simsek.png")} style={styles.weatherIcon} />
          <Text style={styles.condition}>Thunderstorm</Text>
          <Text style={styles.temperature}>26°</Text>
          <Text style={styles.subInfo}>Mostly Clear</Text>
          <Text style={styles.range}>H:26°  L:18°</Text>

          <FlatList
            horizontal
            data={weatherData}
            keyExtractor={(item) => item.day}
            contentContainerStyle={styles.dailyList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.shadowWrapper}>
                <LinearGradient
                  colors={item.active ? ["#000", "#000"] : ["#E8F0EA", "#E8F0EA"]}
                  style={styles.dayCard}
                >
                  <Text style={[styles.dayText, item.active && styles.activeText]}>
                    {item.day}
                  </Text>
                  <Image source={item.icon} style={styles.smallIcon} />
                  <Text style={[styles.chanceText, item.active && styles.activeText]}>
                    {item.chance}
                  </Text>
                  <Text style={[styles.tempText, item.active && styles.activeText]}>
                    {item.temp}
                  </Text>
                </LinearGradient>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 100,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    left:5,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    right:60,
  },
  topRow2: {
    flexDirection: "row",
    alignItems: "center",
    right:20,
  },
  location: {
    fontSize: 20,
    color: "#333",
    marginLeft: 6,
  },
  time: {
    fontSize: 20,
    color: "#333",
  },
  weatherIcon: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  condition: {
    fontSize: 25,
    fontWeight: "500",
    color: "#333",
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  subInfo: {
    fontSize: 20,
    color: "#109A0799",
    marginTop: 5,
  },
  range: {
    fontSize: 20,
    color: "black",
    marginBottom: 40,
  },
  dailyList: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  shadowWrapper: {
    borderRadius: 30,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation:4,
  },
  dayCard: {
    height: 150,
    width: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginVertical:20,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  chanceText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  tempText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 6,
  },
  activeText: {
    color: "#fff",
  },
  smallIcon: {
    width: 30,
    height: 30,
    marginVertical: 4,
  },
});
