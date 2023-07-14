import { Button, StyleSheet,TouchableOpacity, SafeAreaView, AsyncStorage, Picker  } from 'react-native';

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


export default function Faculty({navigation}) {
    const [scan, setScan] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState<any>(false);
    const [color,setColor] = useState("#6527f9");
    const [color1,setColor1] = useState("#262626")
    const[personalDetail,setPersonalDetail] = useState<any>()
    const[attendance,setAttendance] = useState<any>()
    const[grades,setGrades] = useState<any>()
    const[cgpa,setCgpa] = useState<any>()
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const[loading,setLoading] = useState(Boolean)
    const[semester,setSemester] = useState<any>()
    const[selectedSem,SetSelectedSem] = useState<any>();
    const[faculty,setFaculty] = useState<any>();

    useEffect( ()=>{
      setLoading(true)
      fetchDetails();
    },[]);
    const fetchFaculty = async () => {
      try{
        setLoading(true)
        const jsonValue = await AsyncStorage.getItem('@credentials')
        let result= await fetch(`https://juit-webkiosk-api.onrender.com/v1.0/faculty/${selectedSem}`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
        },
        body:jsonValue
        });
        result = await result.json()
      
        console.log(result);
        setFaculty(result);
        setLoading(false)
        }
    
    catch(e){
      console.log(e);
    }
    }
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const jsonValue = await AsyncStorage.getItem('@credentials')

         let result= await fetch('https://juit-webkiosk-api.onrender.com/v1.0/semesters',{
          method:'POST',
          headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
          },
          body:jsonValue
          });
          result = await result.json()
          console.log(result);
          await setSemester(result);
          setLoading(false)
      }
      catch(e){
        console.log(e);
      //save error
      }
    }
  return semester != undefined ?  ( 
    <SafeAreaView style={{flex:1,flexDirection:'column'}}>
      
          <View style={{margin:20}}>
          <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
            <Entypo name="menu" size={40} color="white" onPress={()=>navigation.openDrawer()}  />
            <Text style={{fontSize:40,fontWeight:'bold',marginLeft:10}}>Faculty</Text>  
            </View>
            <View>
            {/* <Picker
        selectedValue={selectedSem}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => SetSelectedSem(itemValue)}
      >
        {
          semester.map((semester:{}))
        }
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
            </View>
            <ScrollView>
                  {/* {faculty
            
            .map((attendance: { SubjectName: string, CGPA: string, Tutorial:number, LectureTutorial: number, Practical:number}, index: Key | null | undefined) => {
              return (
                <View>
                <AttendanceBox subject={`Semester ${index+1}`} lecAttendance={attendance.CGPA} tutAttendance={attendance.Tutorial} pracAttendance={attendance.Practical}  />
                </View>
              );
            })} */}
            </ScrollView>
              
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
