import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PeopleScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0.3); 
  const [promoCode, setPromoCode] = useState('');

  async function getData() {
    const url = "http://192.168.150.186:3000/api/data";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const dataWithQty = json.map(item => ({
        name: item.title,
        price: item.price === "" ? 0 : Number(item.price.replace(/[^0-9.]/g, "")),
        quantity: 1,
        image: item.image
      }));
      setCartItems(dataWithQty);
      console.log("dataWithQty:", dataWithQty);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const increaseQty = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    setCartItems(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 0) {
      newCart[index].quantity -= 1;
      setCartItems(newCart);
    }
  };


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  if (cartItems.length <= 0 ) { 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f' }}>
        <ActivityIndicator size="large" color="#3cb0ff" />
        <Text style={{color:'#fff', marginTop:10}}>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>My Shopping Cart</Text>

          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.itemBox}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                  onError={(error) => {
                    console.error(error.nativeEvent)
                  }}
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.qtyBox}>
                  <TouchableOpacity onPress={() => increaseQty(index)} style={styles.qtyBtn}>
                    <Text>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => decreaseQty(index)} style={styles.qtyBtn}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <Text style={styles.shippingText}>Your cart qualifies for free shipping</Text>

          <View style={styles.promoBox}>
            <TextInput
              placeholder="Bike30"
              value={promoCode}
              onChangeText={setPromoCode}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summary}>
            <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Delivery Fee: $0</Text>
            <Text style={styles.summaryText}>Discount: {discount * 100}%</Text>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          </View>  

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e2f',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#2d2d44',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#3cb0ff',
    marginTop: 4,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2f',
    borderRadius: 8,
    padding: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    backgroundColor: '#3cb0ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  qty: {
    color: '#fff',
    fontSize: 16,
  },
  shippingText: {
    color: '#aaa',
    marginVertical: 8,
    textAlign: 'center',
  },
  promoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#2d2d44',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginRight: 8,
  },
  applyBtn: {
    backgroundColor: '#3cb0ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  summary: {
    marginTop: 10,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
  total: {
    color: '#3cb0ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  checkoutBtn: {
    marginTop: 16,
    backgroundColor: '#3cb0ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
