import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("../assets/Garden.jpg")}
          style={styles.background}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="star" size={30} style={styles.starIcon} />
            <Text style={styles.text}>Scan Screen</Text>
            <Ionicons name="star" size={30} style={styles.starIcon} />
          </View>

          <View style={styles.container}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Home Screen</Text>
            </View>

            <Image source={require("../assets/Scan.png")} style={styles.scan} />
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="home" size={34} color="#5B8E55" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("BookScreen")}>
          <Ionicons name="book-outline" size={34} color="#5B8E55" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ScanScreen")}>
          <View style={styles.centerIcon}>
            <Ionicons name="scan-outline" size={40} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PeopleScreen")}>
          <Ionicons name="people-outline" size={34} color="#5B8E55" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("StoreScreen")}>
          <Ionicons name="storefront-outline" size={34} color="#5B8E55" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "center",  
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 80,
  },
  container: {
    width: "90%",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 120,
    marginTop:10,
   alignSelf: "flex-start",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
  },
  buttonContent: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  starIcon: {
    color: "#fff",
    marginHorizontal: 10,
  },
  scan: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  bottomNav: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  centerIcon: {
    backgroundColor: "#5B8E55",
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
  },
});
