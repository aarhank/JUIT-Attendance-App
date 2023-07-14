import { Button, StyleSheet,TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native';
import { Text, View } from '../components/Themed';



export default function Loading() {
  
  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <View>
          <Text style={styles.loadingText}>LOADing...</Text>
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:20
  },
  loadingText:{
    fontSize:40,
    fontWeight:'bold'
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
