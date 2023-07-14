import { Button, StyleSheet,TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AttendanceBox from '../components/dashboard/AttendanceBox';
import { ScrollView } from 'react-native-gesture-handler';
import React,{ useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScheduleBox from '../components/dashboard/ScheduleBox';
import Loading from './Loading';
export default function Dashboard({navigation}) {
    const [scan, setScan] = useState<boolean>(false);
    const [lowestAt,setLowestAt] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState<any>(false);
    const [color,setColor] = useState("#6527f9");
    const [color1,setColor1] = useState("#262626")
    const[personalDetail,setPersonalDetail] = useState<any>()
    const[attendance,setAttendance] = useState<any>()
    const[grades,setGrades] = useState<any>()
    const[cgpa,setCgpa] = useState<any>();
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const[loading,setLoading] = useState(Boolean);
    const [lowestAttendance,setLowestAttendance] = useState("")
    const [lowestSubject,setLowestSubject] = useState("")
   
  
    useEffect( ()=>{
      setLoading(true)
      fetchDetails();
    },[]);
    const fetchDetails = async () => {

      try {
        setLoading(true)
        const jsonValue = await AsyncStorage.getItem('@credentials')
        let result= await fetch('https://juit-webkiosk-api.onrender.com/v1.0/personalDetails/',{
          method:'POST',
          headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
          },
          body:jsonValue
          });
          result = await result.json()
          await AsyncStorage.setItem('@personalDetails', JSON.stringify(result))
          setPersonalDetail(result);
          console.log(result);
  
        setLoading(true)
         result= await fetch('https://juit-webkiosk-api.onrender.com/v1.0/attendance/',{
          method:'POST',
          headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
          },
          body:jsonValue
          });
          result = await result.json()
          
          await setAttendance(result);
       
          // for(var i=0;i<result.length;i++){
          //   if(result[i].Lecture!="" && parseInt(result[i].Lecture) < parseInt(lowestAttendance)){
          //     setLowestSubject(result[i].SubjectName);
          //     setLowestAttendance(result[i]?.Lecture);
          //     console.log("something", result[i].Lecture)
          //     console.log("Loewsdf",lowestAttendance) 

          //     console.log("1",result[i])
          // }
          // else if(result[i].Tutorial!="" && parseInt(result[i].Tutorial) < parseInt(lowestAttendance)){
          //   setLowestSubject(result[i].SubjectName);
          //   setLowestAttendance(result[i].Tutorial); 
            
          //     console.log(lowestAttendance)
          // }
          // else if(result[i].Practical!="" && parseInt(result[i].Practical) < parseInt(lowestAttendance)){
          //   setLowestSubject(result[i].SubjectName);
          //   setLowestAttendance(result[i].Practical); 
          //     console.log(lowestAttendance)
          // }
          // }
          
      
          console.log(lowestAttendance);
        //   result = await fetch('https://juit-webkiosk-api.onrender.com/v1.0/grades/',{
        //     method:'POST',
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Accept":"application/json",
        //     },
        //     body:jsonValue
        //     });
        //     result = await result.json()
        //     await setGrades(grades);
    
        
        //     console.log(result);
        //     result = await fetch('https://juit-webkiosk-api.onrender.com/v1.0/cgpa/',{
        //       method:'POST',
        //       headers:{
        //           "Content-Type":"application/json",
        //           "Accept":"application/json",
        //       },
        //       body:jsonValue
        //       });
        //       result = await result.json()
        //       await setCgpa(result);
        //       console.log(cgpa);
              setLoading(false)
              
      }
      catch(e){
      //save error
      }
    }
    
    const change = (val) => {
        if(val == "punch"){
            setColor1("#6527f9");
            setColor("#262626");
            setScan(true);
        }
        if(val == "view"){
            setColor1("#262626");
            setColor("#6527f9");
            setScan(false);
        }
    }
  return attendance != undefined  ?  ( 
    <SafeAreaView style={{flex:1,flexDirection:'column'}}>
      
          <View style={{margin:20}}>
          <View style={styles.header}>
            <Entypo name="menu" size={40} color="white" onPress={()=>navigation.openDrawer()}  />
            <AntDesign name="qrcode" size={40} color="white" onPress={()=> navigation.navigate("ScanAttendance")} />
          </View>
          {/* <Text style={styles.text}>{personalDetail.Rollno}</Text> */}
          <Text style={styles.name}>{personalDetail.Name}</Text>
          <View style={styles.imp}>
            <View style={{backgroundColor:'#262626'}}>
            <Text style={{fontSize:30,fontWeight:'bold'}}>{lowestAttendance}</Text>
            <Text>{lowestSubject}</Text>
            </View>
            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>Critical</Text>
          </View>
          <View style={styles.toggle}>
              <TouchableOpacity style={{padding:15,borderRadius:10,width:'48%',backgroundColor:color}} onPress={()=> change("view")}>
                <Text> View Attendance </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:15,borderRadius:10,width:'48%',backgroundColor:color1}} onPress={()=> change("punch")} >
                <Text> View TimeTable</Text>
              </TouchableOpacity>
          </View>
          {
              !scan ? 
              <ScrollView>
                  {attendance
            
            .map((attendance: { SubjectName: string, Lecture: number, Tutorial:number, LectureTutorial: number, Practical:number}, index: Key | null | undefined) => {
              return (
                <View>
                <AttendanceBox subject={attendance.SubjectName} lecAttendance={attendance.Lecture} tutAttendance={attendance.Tutorial} pracAttendance={attendance.Practical}  />
                </View>
              );
            })}
                
              </ScrollView>
              :
              <ScrollView>
                {/* <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
                <ScheduleBox subject="ENGINEERING MATHEMATICS-I" time="10AM" day="Monday"/>
                <ScheduleBox subject="ENGINEERING MATHEMATICS-I" time="10AM" day="Monday"/>
                <ScheduleBox subject="ENGINEERING MATHEMATICS-I" time="10AM" day="Monday"/>
                <ScheduleBox subject="ENGINEERING MATHEMATICS-I" time="10AM" day="Monday"/>
                <ScheduleBox subject="ENGINEERING MATHEMATICS-I" time="10AM" day="Monday"/>
              </ScrollView>
          }
          </View>
    </SafeAreaView>
  )
  :
  (
          <Loading/>
  );
}

const styles = StyleSheet.create({
  header:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:20
  },
  scan:{
    position:"absolute",
    borderRadius:30,
    bottom:30,
    flexDirection:'column',
    justifyContent:'flex-start',
    padding:10,
    alignContent:'flex-start',
    alignItems:'flex-start',
    alignSelf:'center',
  },
  scanButton:{
    height:60,
    width:60,
    borderWidth:5,
    borderRadius:25,
    borderColor:'white'
  },
  toggle:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#262626',
    padding:8,
    borderRadius:15,
    marginBottom:30
  },
  imp:{
    backgroundColor:'#262626',
    padding:20,
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  text:{
      fontSize:30,
  },
  name:{
      fontSize:40,
      fontWeight:'bold',
      marginBottom:10
  }
});
