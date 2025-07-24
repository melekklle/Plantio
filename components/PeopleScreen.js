import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,Image,TouchableOpacity,TextInput,StyleSheet,SafeAreaView,ActivityIndicator,Alert,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PeopleScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.151.9:3001/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Sunucudan veri alınamadı');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Kullanıcılar alınamadı:', error);
      Alert.alert('Hata', 'Kullanıcılar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#5B8E55" />
        </TouchableOpacity>

        <Text style={styles.title}>Users</Text>


        <View style={styles.promoBox}>
          <TextInput
            placeholder="Kullanıcı Ara"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.applyBtn} onPress={fetchUsers}>
            <Text style={{ color: '#fff' }}>Yenile</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#5B8E55"
            style={{ marginTop: 16 }}
          />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.itemBox}>
                <Image
                  source={require("../assets/profile.jpg")}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.itemTitle}>{item.firstName}</Text>
                  <Text style={styles.itemTitle}>{item.lastName}</Text>
                  <Text style={styles.price}>{item.email}</Text>
                   <Text style={styles.price}>{item.phone}</Text>
                    <Text style={styles.price}>{item.tc}</Text>
                </View>
              </View>
            )}
          />
        )}


        <TouchableOpacity style={styles.checkoutBtn} onPress={fetchUsers}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Listeyi Güncelle
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
     flex: 1,
     backgroundColor:"white"
     },
  container: { 
    flex: 1,
      padding: 16 ,
      backgroundColor:"white"
    },
  backButton: { 
    marginBottom: 10 
  },
  title: {
    fontSize: 30,
    color: '#5B8E55',
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#c5f2bf82',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
     width: 60, 
     height: 60,
      borderRadius: 8
     },
  itemTitle: { 
    color: '#707070',
     fontWeight: 'bold', 
     fontSize: 16 
    },
  price: { 
    color: '#3f403f',
     marginTop: 4,
      fontSize: 14
    },
  promoBox: {
     flexDirection: 'row', 
     alignItems: 'center',
      marginBottom: 12
     },
  input: {
    flex: 1,
    backgroundColor: '#c5f2bf82',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    marginRight: 8,
  },
  applyBtn: {
    backgroundColor: '#5B8E55',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutBtn: {
    marginTop: 16,
    backgroundColor: '#5B8E55',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});