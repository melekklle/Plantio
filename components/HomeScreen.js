import React from "react";
import { View,Text,StyleSheet,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen() {
    const navigation = useNavigation() ;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color='#333'/>
            </TouchableOpacity>
            <Text style={styles.text}>
                HomeScreen
            </Text>
        </View>
    );
}
const styles=StyleSheet.create({
    container: {
        flex:1,
        paddingTop:60,
        paddingHorizontal:20,
    },
    backButton: {
        position:'absolute',
        top:50,
        left:20,
        zIndex:10,
    },
    text: {
        marginTop:100,
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
    },
});