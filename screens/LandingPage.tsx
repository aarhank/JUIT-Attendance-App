import { Button, StyleSheet,TouchableOpacity, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function LandingPage({navigation}) {
  return (
    <SafeAreaView style={{flex:1,margin:5,flexDirection:'column'}}>
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.bio}>The Official JUIT App {"\n"} Tracks your attendance and academic performances</Text>
      </View>
      <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={()=>navigation.navigate("Login")}
          >
          <Text >Login</Text>
        </TouchableOpacity>
        <Text>Not a registered user ? Contact Bhatt</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor:'black',
    marginBottom:40
  },
  text:{
    flexDirection:'column',
    textAlign:'center',
    marginBottom:30
  },
  loginScreenButton:{
    backgroundColor:'#6527f9',
    paddingHorizontal:120,
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
