import { useState, useEffect } from 'react';
import { Button, StyleSheet,TouchableOpacity,TextInput, ScrollView,SafeAreaView, AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Loading from './Loading';
export default function Login({navigation}) {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[loading,setLoading] = useState<boolean>(false);
    const checkLogin = async () => {
      let result = await JSON.parse(AsyncStorage.getItem("@credentials"));

      if(result.password){
        navigation.replace('Root')
      }
    }
    useEffect(  ()=>{
      checkLogin()
    },[]);
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@credentials', jsonValue)
        } catch (e) {
          // saving error
        }
      }
    const handleLogin = async () => {
        setLoading(true);
        let item = {username,password}
        navigation.replace('Root');
        let result= await fetch('https://juit-webkiosk-api.onrender.com/v1.0/login/',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        body:JSON.stringify(item)
        });
        result = await result.json();
        if(result.success === true)
        {
            console.log(result);
            await storeData(item);
            navigation.replace('Root')
        }
        else{
            console.log("login failed")
            return;
        }
    }
  return (
    <SafeAreaView style={{flex:1,margin:20,flexDirection:'column'}}>
      {
          !loading ?
          
   
          <View style={styles.container}>
          
            <View style={styles.text}>
              <Text style={styles.title}>Log <Text style={{color:'#6527f9'}}>in</Text></Text>
              <Text style={styles.bio}>Use your webkiosk credentials</Text>
            </View>
      
            <View style={{marginTop:20,marginBottom:50, width:'100%',alignItems:'center'}}>
      
            
      <TextInput
                          underlineColorAndroid = "transparent"
                          placeholder = "Enroll number"
                          placeholderTextColor = "#858585"
                          autoCapitalize = "none"
                          style={styles.input}
                          onChangeText={(username)=>setUsername(username)}
                        />
                        <TextInput
                           underlineColorAndroid = "transparent"
                           placeholder = "Password"
                           placeholderTextColor = "#858585"
                           autoCapitalize = "none"
                           style={styles.input2}
                           onChangeText={(password)=>setPassword(password)}
                        />
                       
        </View>
      
            <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={()=>handleLogin()}
                >
                <Text >Login</Text>
              </TouchableOpacity>
              <Text>Not a registered user ? Contact Bhatt</Text>
              
          </View>
          
          
          :
          <Loading/>
      }
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black',
  },
  input2:{
    marginBottom:50,
    borderWidth:2,
    borderRadius:10,
    width:'80%',
    padding:15,
    color:'#858585',
    backgroundColor: "#171717",
    borderColor:'#212121'
  },
  input:{
    marginVertical:20,
    borderWidth:2,
    borderRadius:10,
    width:'80%',
    padding:15,
    color:'#858585',
    backgroundColor: "#171717",
    borderColor:'#212121'
  },
  text:{
    flexDirection:'column',
    textAlign:'center',
    marginBottom:30
  },
  loginScreenButton:{
    backgroundColor:'#6527f9',
    paddingHorizontal:100,
    paddingVertical:15,
    borderRadius:20,
    marginBottom:20
  },
  bio:{
    color:'white',
    fontSize:15,
    textAlign:'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom:10,
    color:'#ffff',
    textAlign:'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
