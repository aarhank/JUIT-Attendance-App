import React from 'react'
import {View, Text, StyleSheet, Image,Pressable, TouchableOpacity, AsyncStorage} from "react-native"
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { DrawerActions } from '@react-navigation/native';



export default function DrawerContent(props) {
    const logOut = () => {
        AsyncStorage.removeItem("@credentials")
        props.navigation.navigate('Login')
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.n_layout}>
                <View style={styles.n_items}>
                    
                        <DrawerContentScrollView>
                        <Pressable onPress={() => {props.navigation.navigate('Dashboard')}}><View style={styles.n_screens}><MaterialIcons name="dashboard" size={35} color="white"/><Text style={styles.d_text}>  Dashboard</Text></View></Pressable>
                        <Pressable onPress={() => {props.navigation.navigate('Attendance')}}><View style={styles.n_screens}><FontAwesome5 name="chalkboard-teacher" size={35} color="white" /><Text style={styles.d_text}>  Attendance</Text></View></Pressable>
                        <Pressable onPress={() => {props.navigation.navigate('Academics')}}><View style={styles.n_screens}><AntDesign name="areachart" size={35} color="white" /><Text style={styles.d_text}>  Academics</Text></View></Pressable>
                        {/* <Pressable onPress={() => {props.navigation.navigate('Faculty')}}><View style={styles.n_screens}><Ionicons name="people" size={35} color="white" /><Text style={styles.d_text}>  Faculty</Text></View></Pressable>
                        <Pressable onPress={() => {props.navigation.navigate('Grades')}}><View style={styles.n_screens}><Entypo name="graduation-cap" size={35} color="white" /><Text style={styles.d_text}>  Grades</Text></View></Pressable>
                        <Pressable onPress={() => {props.navigation.navigate('Council')}}><View style={styles.n_screens}><AntDesign name="exclamationcircleo" size={35} color="white" /><Text style={styles.d_text}>  About us</Text></View></Pressable> */}
                        <Pressable onPress={()=> logOut()}><View style={styles.n_screens}><AntDesign name="logout" size={35} color="#6527f9" /><Text style={styles.d_text1}>  Logout</Text></View></Pressable>
                        </DrawerContentScrollView>
                    
                </View>
                <View style={styles.n_omnia}>
                    <TouchableOpacity style={styles.close} onPress={()=>props.navigation.closeDrawer()} >
                    <Entypo name="cross" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    close:{
        height:50,
        width:50,
        borderRadius:15,
        backgroundColor:'#2c2c2c',
        justifyContent:'center',
        alignItems:'center'
    },
    d_text:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
    },
    d_text1:{
        color:'#6527f9',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
    },
    n_screens:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'flex-start',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        marginLeft:'20%',
        marginVertical:10    
    },
    n_logo:{
        width:120,
        height:62,
        alignSelf:'center',
        marginVertical:50
    },
    n_items:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
        textAlign:'center',
        width:'100%',
        height:'100%',

    },
    n_image:{
        height:120,
        width:120,
        borderRadius:70,
        marginVertical:100,
        alignSelf:'center'
    },
    n_layout:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    n_omnia:{
        flexDirection:'column',
        justifyContent:'flex-start',
        right:30,
        top:60,
        height:"100%",
        position:'absolute'
    },
    n_text:{
        color:"white",
        fontSize:35,
        letterSpacing:13,
        fontWeight:"bold",
        transform: [{ rotate: '90deg'}],
        marginHorizontal:-60,
        marginVertical:100
        
    
        
    }
})