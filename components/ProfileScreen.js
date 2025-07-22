import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Image,Alert,ScrollView,SafeAreaView,KeyboardAvoidingView,Platform,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const profileImage = require('../assets/profile.jpg');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !phone || !email) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.151.9:5000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, telephone: phone, email }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log('HTTP Hata:', response.status, text);
        Alert.alert('Hata', `Sunucudan cevap alınamadı: ${response.status}`);
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log('API Cevap:', result);

      if (result.success) {
        await AsyncStorage.setItem('userProfile', JSON.stringify({ name, phone, email }));
        Alert.alert('Başarılı', 'Bilgiler başarıyla kaydedildi!');
      } else {
        Alert.alert('Hata', result.message || 'Kayıt başarısız.');
      }
    } catch (error) {
      console.error('API Hatası:', error);
      Alert.alert('Hata', 'Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem('userProfile');
        if (saved) {
          const { name, phone, email } = JSON.parse(saved);
          setName(name);
          setPhone(phone);
          setEmail(email);
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
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} disabled={loading}>
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
              editable={!loading}
            />

            <Text style={styles.label}>Telefon Numarası</Text>
            <TextInput
              style={styles.input}
              placeholder="05XX XXX XX XX"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
            />

            <Text style={styles.label}>E-posta Adresi</Text>
            <TextInput
              style={styles.input}
              placeholder="ornek@mail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            <TouchableOpacity
              style={[styles.button, loading && { backgroundColor: '#8BC79E' }]}
              onPress={handleSave}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="star" size={20} style={styles.starLeft} />
                <Text style={styles.buttonText}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</Text>
                <Ionicons name="star" size={20} style={styles.starRight} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
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
       borderRadius: 65
      },
  label: { 
    fontSize: 22,
    marginBottom: 6,
     marginTop: 20, 
     fontWeight: '600',
      color: '#333',
       alignSelf: 'center'
       },
  input: { 
    borderWidth: 2,
     borderColor: '#ccc',
      padding: 15,
       borderRadius: 10 
      },
  button: {
     marginTop: 30, 
     backgroundColor: '#50924E',
      paddingVertical: 15,
       borderRadius: 20,
        alignItems: 'center'
       },
  buttonContent: {
     flexDirection: 'row', 
     alignItems: 'center', 
     justifyContent: 'center' 
    },
  starLeft: { 
    color: 'white',
    marginRight: 10 
  },
  starRight: {
     color: 'white',
      marginLeft: 10 
    },
  buttonText: { 
    color: '#fff',
     fontSize: 20,
      fontWeight: 'bold'
     },
});
