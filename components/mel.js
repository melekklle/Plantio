import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const imageMap = {
  "kaktus.jpg": require("../assets/kaktus.jpg"),
  "kaktus2.jpg": require("../assets/kaktus2.jpg"),
  "yaprak.jpg": require("../assets/yaprak.jpg"),
  "yaprak2.jpg": require("../assets/yaprak2.jpg"),
  "papatya.jpg": require("../assets/papatya.jpg"),
  "cicek.jpg": require("../assets/cicek.jpg"),
  "cicek4.jpg": require("../assets/cicek4.jpg"),
  "flowers.jpg": require("../assets/flowers.jpg"),
};

export default function MyPlants() {
  const navigation = useNavigation();
  const dataObj = require("../data.json");

  const plantscard = Array.isArray(dataObj.plantscard)
    ? dataObj.plantscard.map((item) => ({
        ...item,
        image: imageMap[item.image],
      }))
    : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>
        My <Text style={styles.green}>Garden</Text>
      </Text>

      <FlatList
        data={plantscard.slice(0, 4)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.plantCard}>
            <Image source={item.image} style={styles.plantImage} />
            <Text style={styles.plantName}>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>My Plants</Text>

      {plantscard.slice(0, 2).map((item) => (
        <View key={item.id} style={styles.waterCard}>
          <Image source={item.image} style={styles.smallImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.waterPlantName}>{item.name}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${item.waterLevel || 50}%` }]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  green: { color: "#5B8E55" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },

  plantCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    width: "48%",
  },
  plantImage: { width: "100%", height: 100, borderRadius: 10, marginBottom: 8 },
  plantName: { fontWeight: "bold", fontSize: 16 },

  waterCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  smallImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  waterPlantName: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#5B8E55",
  },
});
