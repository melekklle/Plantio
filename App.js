import React, { useState } from "react";
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,Dimensions,FlatList,SafeAreaView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ekranlar
import HomeScreen from "./components/HomeScreen";
import BookScreen from "./components/BookScreen";
import PeopleScreen from "./components/PeopleScreen";
import ScanScreen from "./components/ScanScreen";
import StoreScreen from "./components/StoreScreen";
import MyGarden from "./components/MyGarden";
import MyPlants from "./components/MyPlants";
import ProfileScreen from "./components/ProfileScreen";
import WeatherScreen from "./components/WeatherScreen";
import BookDetailScreen from "./components/BookDetailScreen";
// resimler
const profile = require("./assets/profile.jpg");
const flower = require("./assets/flower.png");

const imageMap = {
  "Garden.jpg": require("./assets/Garden.jpg"),
  "kaktus.jpg": require("./assets/kaktus.jpg"),
  "kaktus2.jpg": require("./assets/kaktus2.jpg"),
  "yaprak.jpg": require("./assets/yaprak.jpg"),
  "yaprak2.jpg": require("./assets/yaprak2.jpg"),
  "cicek.jpg": require("./assets/cicek.jpg"),
  "papatya.jpg": require("./assets/papatya.jpg"),
  "flowers.jpg": require("./assets/flowers.jpg"),
  "flower.png": flower,
  "cicek4.jpg": require("./assets/cicek4.jpg"),
  "traktör.jpg": require("./assets/traktör.jpg"),
  "bahce.jpg": require("./assets/bahce.jpg"),
  "bahce2.jpg": require("./assets/bahce2.jpg"),
  "laleler.jpg": require("./assets/laleler.jpg"),
  "stars.png": require("./assets/stars.png"),
};

const { width, height } = Dimensions.get("window");

function MainScreen() {
  const navigation = useNavigation();
  const dataObj = require("./data.json");

  const banners = (dataObj.banners || []).map((item) => ({
    ...item,
    image: imageMap[item.image],
  }));

  const cards = (dataObj.cards || []).map((item) => ({
    ...item,
    image: imageMap[item.image],
  }));

  const plantscard = (dataObj.plantscard || []).map((item) => ({
    ...item,
    image: imageMap[item.image],
  }));

  const shortcuts = (dataObj.shortcuts || []).map((item) => ({
    ...item,
    icon: item.isImage ? imageMap[item.icon] : item.icon,
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.topRow}>
          <Text style={styles.header}>
            New on <Text style={styles.highlight}>Plantio</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            <Image source={profile} style={styles.profilePic} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {shortcuts.map((item) => (
            <View key={item.id} style={styles.circleWrapper}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  if (item.label === "My Garden") navigation.navigate("MyGarden");
                  if (item.label === "My Plants") navigation.navigate("MyPlants");
                }}
              >
                {item.isImage ? (
                  <Image source={item.icon} style={{ width: 24, height: 24 }} />
                ) : (
                  <Ionicons name={item.icon} size={30} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={styles.iconText}>{item.label}</Text>
            </View>
          ))}

          <LinearGradient colors={["#5B8E55", "#0075E0"]} style={styles.weatherBox}>
            <TouchableOpacity onPress={() => navigation.navigate("WeatherScreen")}>
            <Text style={styles.weatherText}>{dataObj.weather.day}</Text>
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.weatherTemp}>{dataObj.weather.degree}</Text>
                <Text style={styles.weatherMini}>{dataObj.weather.degreemini}</Text>
              </View>
              <Ionicons name="sunny" size={40} color="#fff" />
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={15} color="#fff" />
              <Text style={styles.weatherLocation}>USA, New York</Text>
            </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <FlatList
          data={banners}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.8 + 20}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (width * 0.8 + 16));
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.bannerItem}>
              <Image source={item.image} style={styles.bannerImage} />
              <Text style={styles.NewText}>{item.subtitle}</Text>
              <Text style={styles.bannerText}>{item.title}</Text>
            </View>
          )}
        />

        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, { backgroundColor: index === activeIndex ? "#5B8E55" : "#ccc" }]}
            />
          ))}
        </View>

        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
              )}
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          )}
        />

        <FlatList
          data={plantscard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
              )}
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          )}
        />
      </ScrollView>

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BookScreen" component={BookScreen} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="MyGarden" component={MyGarden} />
        <Stack.Screen name="MyPlants" component={MyPlants} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
     flex: 1, 
     backgroundColor: "#fff",
      paddingTop: 10 
    },
  container: { 
    backgroundColor: "#fff" 
  },
  topRow: {
     flexDirection: "row",
      justifyContent: "space-between",
       alignItems: "center",
        paddingHorizontal: 20
       },
  header: {
     fontSize: 30,
      fontWeight: "bold"
     },
  highlight: {
    color: "green"
   },
  profilePic: {
     width: 50,
      height: 50,
       borderRadius: 30 
      },
  row: {
     flexDirection: "row",
      justifyContent: "space-between",
       marginVertical: 20,
        paddingHorizontal: 20 
      },
  circleWrapper: {
     alignItems: "center",
     justifyContent: "center"
     },
  circle: { 
    backgroundColor: "#5B8E55",
     width: 60, 
     height: 60,
      borderRadius: 30,
       justifyContent: "center",
        alignItems: "center" 
      },
  iconText: {
     marginTop: 6,
      color: "#5B8E55", 
      fontSize: 16, 
      fontWeight: "500"
     },
  weatherBox: {
     width: 110, 
     height: 110, 
     borderRadius: 20, 
     justifyContent: "space-evenly",
      alignItems: "center", 
      padding: 4
     },
  weatherText: { 
    color: "#fff",
     fontSize: 15, 
     fontWeight: "bold", 
     alignSelf: "flex-start", 
     marginLeft: 5
     },
  weatherTemp: {
     color: "#fff", 
     fontSize: 39,
      fontWeight: "bold" 
    },
  weatherMini: {
     color: "#fff", 
     fontSize: 13,
      fontWeight: "bold" 
    },
  weatherLocation: {
     color: "#fff",
      fontSize: 10,
       marginLeft: 4, 
       fontWeight: "bold",
        right: 3 
      },
  locationRow: {
     flexDirection: "row", 
     alignItems: "center",
      marginTop: 4,
      },
  rowContainer: {
     flexDirection: "row",
      justifyContent: "space-between",
       width: "100%",
        paddingHorizontal: 5
       },
  bannerItem: {
     width: width * 0.8,
      marginRight: 20 
    },
  bannerImage: {
     width: "100%",
      height: height * 0.35,
       borderRadius: 10 
      },
  NewText: { 
    fontSize: 15,
     color: "#fff",
      position: "absolute",
       bottom: 110,
        left: 32 
      },
  bannerText: {
     position: "absolute",
      bottom: 45,
       left: 30,
        color: "#fff",
         fontSize: 30,
          fontWeight: "bold"
         },
  dotsContainer: {
     flexDirection: "row",
      justifyContent: "center",
       alignItems: "center",
        marginTop: -15,
         marginBottom: 20 
        },
  dot: {
     width: 8,
      height: 8,
       borderRadius: 4,
        marginHorizontal: 4 
      },
  cardRow: { 
    flexDirection: "row",
     justifyContent: "space-between",
      paddingHorizontal: 20,
       marginBottom: 20
       },
  card: { 
    width: 160,
     marginBottom: 15,
      marginRight: 10 
    },
  cardImage: { 
    width: "100%", 
    height: 170,
     borderRadius: 20
     },
  cardTitle: { 
    marginTop: 5,
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
  newBadge: { 
    position: "absolute",
     top: 10,
      right: 10,
       backgroundColor: "#61B458",
        paddingHorizontal: 8,
         paddingVertical: 4, 
         borderRadius: 12,
          zIndex: 1 
        },
  newBadgeText: { 
    color: "white", 
    fontSize: 14 
  },
});
