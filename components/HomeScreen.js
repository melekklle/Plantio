import React, { useEffect, useState } from "react";
import {
View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,Dimensions,FlatList,SafeAreaView,Alert,ActivityIndicator,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  const [dataObj, setDataObj] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.151.9:3001/api/users";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Sunucudan veri alınamadı");
        const data = await response.json();
        setDataObj(data);
      } catch (error) {
        Alert.alert("Hata", "Veriler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !dataObj) {
    return (
      <View
        style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color="#5B8E55" />
      </View>
    );
  }

  const banners = dataObj.banners || [];
  const cards = dataObj.cards || [];
  const shortcuts = dataObj.shortcuts || [];
  const profileImage =
    dataObj.profile && dataObj.profile.length > 0 ? dataObj.profile[0].image : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 90}}
      >
           {/**/}
        <View style={styles.topRow}>
          <Text style={styles.header}>
            New on <Text style={styles.highlight}>Plantio</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePic} />
            ) : (
              <Ionicons name="person-circle-outline" size={50} color="#5B8E55" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {shortcuts.map((item) => (
            <View key={item.id} style={styles.circleWrapper}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  if (item.label === "My Garden") navigation.navigate("MyGarden");
                  else if (item.label === "My Plants") navigation.navigate("MyPlants");
                }}
              >
                {item.isImage ? (
                  <Image source={{ uri: item.icon }} style={{ width: 24, height: 24 }} />
                ) : (
                  <Ionicons name={item.icon} size={30} color="white" />
                )}
              </TouchableOpacity>
              <Text style={styles.iconText}>{item.label}</Text>
            </View>
          ))}
        </View>

            {/**/}
        <FlatList
          data={banners}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.8 + 20}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / (width * 0.8 + 20)
            );
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.bannerItem}>
              <Image source={{ uri: item.image }} style={styles.bannerImage} />
              <Text style={styles.NewText}>{item.subtitle}</Text>
              <Text style={styles.bannerText}>{item.title}</Text>
            </View>
          )}
        />
            {/**/}
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? "#5B8E55" : "#ccc" },
              ]}
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
              <Image source={{ uri: item.image }} style={styles.cardImage} />
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

      {/**/}
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
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  container: {
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  highlight: {
    color: "green",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#5B8E55",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 6,
    color: "#5B8E55",
    fontSize: 16,
    fontWeight: "500",
  },
  bannerItem: {
    width: width * 0.8,
    marginRight: 20,
  },
  bannerImage: {
    width: "100%",
    height: height * 0.35,
    borderRadius: 10,
  },
  NewText: {
    fontSize: 15,
    color: "#fff",
    position: "absolute",
    bottom: 110,
    left: 32,
  },
  bannerText: {
    position: "absolute",
    bottom: 45,
    left: 30,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    width: 160,
    marginBottom: 15,
    marginRight: 10,
  },
  cardImage: {
    width: "100%",
    height: 170,
    borderRadius: 20,
  },
  cardTitle: {
    marginTop: 5,
    textAlign: "center",
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
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    zIndex: 10,
  },
  centerIcon: {
    backgroundColor: "#5B8E55",
    padding: 15,
    borderRadius: 50,
    marginTop: -35,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
