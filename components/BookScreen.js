import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const imageMap = {
  "kaktus.jpg": require("../assets/kaktus.jpg"),
  "kaktus2.jpg": require("../assets/kaktus2.jpg"),
  "yaprak.jpg": require("../assets/yaprak.jpg"),
  "yaprak2.jpg": require("../assets/yaprak2.jpg"),
  "cicek.jpg": require("../assets/cicek.jpg"),
  "papatya.jpg": require("../assets/papatya.jpg"),
  "flowers.jpg": require("../assets/flowers.jpg"),
  "cicek4.jpg": require("../assets/cicek4.jpg"),
};

export default function BookScreen() {
  const navigation = useNavigation();
  const dataObj = require("../data.json");


  const bilgiMap = {};
  dataObj.bilgi.forEach((item) => {
    bilgiMap[item.id] = item;
  });


  const cards = dataObj.cards.map((card) => {
    const detay = bilgiMap[card.id];
    return {
      ...card,
      description: detay ? detay.description : "Detaylı bilgi yok.",
      image: imageMap[card.image],
      isNew: card.isNew ?? false,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Book Screen</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.cardRow}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("BookDetailScreen", { card: item })}
          >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            {item.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>New</Text>
              </View>
            )}
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
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
  safeArea: {
     flex: 1,
      backgroundColor: "#fff" 
    },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
     fontSize: 24,
      fontWeight: "bold",
      color: "#333" 
    },
  cardList: { 
    paddingHorizontal: 20,
     paddingBottom: 100 
    },
  cardRow: {
     justifyContent: "space-between",
      marginBottom: 20,
     },
  card: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  cardImage: {
     width: "100%", 
     height: 150,
      borderRadius: 10
     },
  cardTitle: {
     marginTop: 8, 
     fontSize: 16,
      textAlign: "center",
       color: "#444" 
      },
  newBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#61B458",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  newBadgeText: {
     color: "white",
      fontSize: 12, 
      fontWeight: "bold"
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
