import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const profileImage = require('../assets/profile.jpg');
const starImage = require('../assets/stars.png');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tc, setTc] = useState('');

  const handleSave = async () => {
    if (!name || !phone || !tc) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await AsyncStorage.setItem(
        'userProfile',
        JSON.stringify({ name, phone, tc })
      );
      Alert.alert('Başarılı', 'Bilgiler kaydedildi!');
    } catch (error) {
      Alert.alert('Hata', 'Bilgi kaydedilemedi.');
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem('userProfile');
        if (saved) {
          const { name, phone, tc } = JSON.parse(saved);
          setName(name);
          setPhone(phone);
          setTc(tc);
        }
      } catch (error) {
        console.log('Veri yüklenemedi:', error);
      }
    };
    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>

            <View style={styles.shadowContainer}>
              <Image source={profileImage} style={styles.profileImage} />
            </View>

            <Text style={styles.label}>İsim Soyisim</Text>
            <TextInput
              style={styles.input}
              placeholder="Adınızı ve Soyadınızı girin"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Telefon Numarası</Text>
            <TextInput
              style={styles.input}
              placeholder="05XX XXX XX XX"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>TC Kimlik No</Text>
            <TextInput
              style={styles.input}
              placeholder="11 haneli TC No"
              keyboardType="numeric"
              maxLength={11}
              value={tc}
              onChangeText={setTc}
            />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
        <View style={styles.buttonContent}>
       <Ionicons name="star" size={20} style={styles.starLeft} />
        <Text style={styles.buttonText}>Kaydet</Text>
        <Ionicons name="star" size={20} style={styles.starRight} />
        </View>
        </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 75,
    padding: 0,
    alignSelf: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  label: {
    fontSize: 22,
    marginBottom: 6,
    marginTop: 20,
    fontWeight: '600',
    color: '#333',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#50924E',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right:15,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    color:'white',
  },
 buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
starLeft: {
  color: 'white',
  marginRight: 10,
},
starRight: {
  color: 'white',
  marginLeft: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},
 bottomNav: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 5,
  },
});
