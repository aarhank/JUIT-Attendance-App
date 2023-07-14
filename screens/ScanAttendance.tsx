import { AsyncStorage, StyleSheet, TouchableOpacity, TurboModuleRegistry, SafeAreaView, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import {  Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Entypo } from '@expo/vector-icons'; 


export default function ScanAttendance({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState<any>(false);
  const [result,setResult] = useState<any>(null);
useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);    
    const personalDetails = await AsyncStorage.getItem('@personalDetails')
    const details = JSON.parse(personalDetails)
    console.log(data);
    var item = {
        token: `${data}`,
        studentRollNo:`${details.Rollno}`,
        studentName:`${details.Name}`
    }
    console.log("item ",item);
    try{
        let result= await fetch('http://172.20.10.2:8086/attendance/save',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(item)
        });
        result = await result.json();
        console.log(result.toString());
        if(result != null){
          setResult(result);
          console.log(result.status);
        }
        // alert(`Your attendance has been succesfully uploaded!` + result);

      }
      catch(e){
      console.log(e);
      setResult({"status":"Failed"})
      }
    
    
    
    
    
  };
if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
}
if (hasPermission === false) {
    return <Text>No access to camera</Text>;
}
if(result != null) {
  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
      
          <View style={{margin:20,justifyContent:'center',alignItems:'center',height:'40%'}}>
            {/* <Text style={styles.name}>Scan Result</Text> */}
            
            {result.status == "Successful" ?
              <Image style={styles.image} source={require('../assets/images/success.png')} />
              :
              <Image style={styles.image} source={require('../assets/images/failed.png')} />  
          }
            
            <Text style={styles.name}>Attendance {result.status}</Text>
            
          </View>
          <View style={{height:"60%",backgroundColor:"#262626", borderTopLeftRadius: 30, borderTopRightRadius:30}}>
           <View style={{backgroundColor:"#262626", padding:30,borderTopLeftRadius: 30, borderTopRightRadius:30}}>
         
           <Text style={styles.desc}>Student Name: {result?.studentName}</Text>
           <Text style={styles.desc}>Student Roll No: {result?.studentRollNo}</Text>
           <Text style={styles.desc}>Subject Name: {result?.subjectName}</Text>
           <Text style={styles.desc}>Subject Code: {result?.subjectCode}</Text>
           <Text style={styles.desc}>Subject Teacher: {result?.subjectTeacher}</Text>
           <Text style={styles.desc}>Date: {result?.timeStamp}</Text>
           <Text style={styles.desc}>Attendance Status: {result?.status}</Text>
           </View>
            
          
           
          </View>

    </SafeAreaView>
  )
}
  return (
    <View style={styles.container}>
    
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:10
},
desc:{
  fontSize:15,
  marginBottom:10
},
image:{
  height:200,
  width:200
},
  close:{
    height:50,
    width:50,
    borderRadius:15,
    backgroundColor:'#2c2c2c',
    justifyContent:'center',
    alignItems:'center'
},
n_omnia:{
    position:'absolute',
    top:30,
    left:30,
    flexDirection:'column',
    justifyContent:'flex-start',
    height:"100%",
  
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
