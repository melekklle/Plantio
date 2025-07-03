import React from "react";
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BookDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { card } = route.params;
//kart değişkeni boşsa ekranda texte yazılan yazı gözükr.
  if (!card) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Geçerli kart verisi bulunamadı.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{card.title}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={card.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
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
     fontSize: 20, 
     fontWeight: "bold",
      color: "#333" 
    },
  content: { 
    padding: 20,
     alignItems: "center"
     },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
     fontSize: 16,
      color: "#555",
       textAlign: "center" 
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
