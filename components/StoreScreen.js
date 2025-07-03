import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#ffbcad", "#c5ffad"]} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Home Screen</Text>
          </View>

          <View style={styles.buttonContent}>
            <Ionicons name="star" size={30} style={styles.starIcon} />
            <Text style={styles.text}>Store Screen</Text>
            <Ionicons name="star" size={30} style={styles.starIcon} />
          </View>

    
          <Image source={require("../assets/bahce.jpg")} style={styles.image1} />
          <Text style={styles.description1}>
            The garden is a peaceful place where flowers bloom and birds sing.
            I love spending time there, watering the plants and enjoying the fresh air.
            Watching the green leaves dance in the wind always makes me happy.
          </Text>

          <Image source={require("../assets/bahce2.jpg")} style={styles.image2} />
          <Text style={styles.description2}>
            The garden is a peaceful place where flowers bloom and birds sing.
            I love spending time there, watering the plants and enjoying the fresh air.
            Watching the green leaves dance in the wind always makes me happy.
          </Text>

          <View style={styles.row1}>
            <Image source={require("../assets/cicek.jpg")} style={styles.image3} />
            <Text style={styles.description3}>
              Flowers bring color and joy to every corner of the world.
              Their gentle beauty reminds us to slow down and smile.
            </Text>
          </View>

          <View style={styles.row2}>
            <Image source={require("../assets/cicek4.jpg")} style={styles.image4} />
            <Text style={styles.description4}>
              Flowers bring color and joy to every corner of the world.
              Their gentle beauty reminds us to slow down and smile.
            </Text>
          </View>

          <View style={styles.row3}>
            <Image source={require("../assets/cicek.jpg")} style={styles.image5} />
            <Text style={styles.description5}>
              Flowers are nature’s way of smiling at the world.
              Their colors and scents bring peace to our hearts.
             Even a single bloom can brighten someone’s entire day
            </Text>
          </View>
        </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  home: {
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  image1: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  image2: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  image3: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  image4: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    left: 140,
  },
  image5: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  description1: {
    marginTop: 15,
    fontSize: 16,
    color: "#555",
  },
  description2: {
    marginTop: 15,
    fontSize: 16,
    color: "#555",
    textAlign: "right",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    textAlign: "right",
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  description3: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    textAlign: "right",
  },
  description4: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    right: 210,
  },
  description5: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    textAlign: "right",
  },
  bottomNav: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top:-80,
  },
  starIcon: {
    color: "black",
    marginHorizontal: 10,
  },
  centerIcon: {
     backgroundColor: "#5B8E55", 
     padding: 15,
      borderRadius: 50,
       marginTop: -70,
        width: 70,
         height: 70,
          justifyContent: "center",
           alignItems: "center" 
          },
});
