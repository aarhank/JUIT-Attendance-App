import { StyleSheet, View, Text } from 'react-native';



export default function ScheduleBox({subject,time,day}) {
  return (
    <View style={styles.container}>
      <View style={styles.subject}>
        <Text style={{color:'white'}}>{subject}</Text>
      </View>
      <View style={styles.attendance}>
        <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:15}} >{time}</Text>
        <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:10}} >{day}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flexDirection:'row',
   justifyContent:'space-between',
    width:'100%',
   marginVertical:10
  },
  subject:{
    padding:20,
    width:'70%',
    backgroundColor:'#262626',
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  attendance:{
    padding:20,
    width:'30%',
    backgroundColor:'#6729ff',
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    justifyContent:'center'
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
