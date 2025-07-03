import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
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

  const IconSection = ({ iconName, label }) => (
    <View style={styles.iconCircle}>
      <Ionicons name={iconName} size={30} color="#5B8E55" />
      <Text style={styles.iconLabel}>{label}</Text>
    </View>
  );

  const WaterCard = ({ plant }) => (
    <View style={styles.waterCard} key={plant.id}> 
      <Image source={plant.image} style={styles.smallImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.waterPlantName}>{plant.name}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: plant.progress * 100 + "%" }]} />
        </View>
      </View>
    </View>
  );


  const renderPlantCard = ({ item }) => (
    <View style={styles.plantCard} key={item.id}> 
      <Image source={item.image} style={styles.plantImage} />
      <Text style={styles.plantName}>{item.name}</Text>
      <Text style={styles.plantStatus}>{item.status}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: item.progress * 100 + "%" }]} />
      </View>
    </View>
  );

  const renderWaterCard = ({ item }) => (
    <WaterCard plant={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
   <FlatList
  data={plantscard}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 }}
  ListHeaderComponent={
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>
        My <Text style={styles.green}>Garden</Text>
      </Text>

      <View style={styles.iconRow}>
        <IconSection iconName="water-outline" label="Water" />
        <IconSection iconName="sunny-outline" label="Light" />
        <IconSection iconName="leaf-outline" label="Plants" />
      </View>

      <Text style={styles.sectionTitle}>My Plants</Text>
    </>
  }
  renderItem={renderPlantCard}
  ListFooterComponent={
    <View style={{ marginTop: 20 }}>
      {plantscard.map((plant) => renderWaterCard({ item: plant }))}
    </View>
  }
  numColumns={2}
  columnWrapperStyle={{ justifyContent: "space-between" }}
/>
<View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
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
  safeArea: {
    flex:1,
    backgroundColor:'#fff',
  },
  container: {
      backgroundColor: "#fff",
       padding: 20 ,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  green: {
    color: "#5B8E55",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  iconCircle: {
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 4,
    color: "#5B8E55",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  plantCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    width: "45%",
  },
  plantImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  plantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  plantStatus: {
    color: "#5B8E55",
    fontSize: 12,
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 6,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#5B8E55",
  },
  waterCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  waterPlantName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
   bottomNav: { 
    height: 50,
     flexDirection: "row",
      justifyContent: "space-around",
       backgroundColor: "#fff",
        paddingVertical: 10,
         marginTop: 5
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
