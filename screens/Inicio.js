import React from 'react'
import AppLoading from "expo-app-loading";
import { Text, View, StyleSheet ,TouchableHighlight, Image } from 'react-native'
import {
    useFonts
  } from '@expo-google-fonts/inter';
  import LinearGradient from 'react-native-linear-gradient';
export default function Inicio(props) {


    let [fontsLoaded] = useFonts({
        'Rampart': require('../assets/RampartOne-Regular.ttf')
        
      });

      if (!fontsLoaded) {
        return <AppLoading/>;
    }

      const styles = StyleSheet.create({

        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
            alignItems: 'center',
            
            height: "100%",
            
        },
        text:{
            
            fontFamily: 'Rampart',
            fontSize: 50,
            marginTop: 50,
            
        },
        text_bold:{

            fontFamily: 'Rampart',
            fontSize: 60,
            fontWeight: 'bold',
            color: "#FF95A1"
        },
        text_userlist:{

            fontFamily: 'Rampart',
            flex: 1,
            fontSize: 30,
            textAlign: 'left',
            marginLeft: 30,
            marginTop: 15,
            
        }
        ,
        image_arrow:{
            marginTop: 22,
            marginRight: 17,
            width: 40,
            height: 40,
            
        },
    
        container_icons: {
            flex: 3,
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            margin: 10,
            height: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 3,
            },
            shadowOpacity: 0.55,
            shadowRadius: 5.50,
            elevation: 3,

        },
        cont_userlist:{
            flex: 3,
            backgroundColor: "#FFE2E2",
            
            padding: 10,
            height: "60%",
            width: "95%",
            borderRadius: 20,
            marginTop: 40,
            marginLeft : 10,
            marginRight: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0.3,
              height: 2,
            },
            shadowOpacity: 0.50,
              shadowRadius: 4.50,
              elevation: 3,


              
        }
        ,
        image_menu:{
            width: 40,
            height: 40,
            marginTop: 5,
        },
        textNewEntry:{
            fontFamily: 'Rampart',
            fontSize: 25,
            
            marginTop: 3,
        },
        cont_menu: {
            
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            margin: 25,
            width: "95%",
            height: 70,
            padding: 10,
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0.3,
              height: 2,
            },
            shadowOpacity: 0.50,
              shadowRadius: 4.50,
              elevation: 3,
        },
        text_nueva:{
            fontFamily: 'Rampart',
            fontSize: 30,
            color: "#FF95A1",
        },
        linearGradient: {
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5
          }
    
    
    }) 


  return (
    
        <View style={styles.container}>
            <View style={styles.container_text}>
                <Text style={styles.text}>
                    Struct<Text style={styles.text_bold}>Life</Text>
                </Text>
            </View>
            <View style={styles.cont_userlist}>
            
                <View style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Tareas
                    </Text>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Lista de tareas")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/arrow2.png")} />
                      </TouchableHighlight>
                </View>
                
                <View style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Turnos
                    </Text>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => {props.navigation.navigate("Lista de turnos")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/turn.png")} />
                      </TouchableHighlight>
                </View>
                <View style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Estudios
                    </Text>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Lista de estudios")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/study.png")} />
                      </TouchableHighlight>
                </View>
                <View style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Metas
                    </Text>
                    <TouchableHighlight  underlayColor={"transparent"} onPress={() => {console.log("hola")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/metas.png")} />
                      </TouchableHighlight>
                </View>
                <View style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Ideas
                    </Text>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {console.log("hola")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/ideas.png")} />
                      </TouchableHighlight>
                </View>

            </View>


                <Text style={styles.textNewEntry}>
                    Agregar <Text style={styles.text_nueva}>Nueva..</Text>
                </Text>
            <View style={styles.cont_menu}>
                <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Crear Tarea")} }>
                    <Image style={styles.image_menu}  source={require("../assets/arrow2.png")} />
                </TouchableHighlight>

                <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("crear turnos")} }>
                    <Image style={styles.image_menu}  source={require("../assets/turn.png")} />
                </TouchableHighlight>

                <TouchableHighlight  underlayColor={"transparent"} onPress={() => {props.navigation.navigate("Configuración")} }>
                    <Image style={styles.image_menu}  source={require("../assets/study.png")} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Configuración")} }>
                    <Image style={styles.image_menu}  source={require("../assets/metas.png")} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("crear idea")} }>
                    <Image style={styles.image_menu}  source={require("../assets/ideas.png")} />
                </TouchableHighlight>
            </View>



        </View>
    

  )
}



