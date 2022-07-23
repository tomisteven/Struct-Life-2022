import React, {useState} from 'react'
import AppLoading from "expo-app-loading";
import { Text, View, StyleSheet ,TouchableHighlight, Image, ScrollView, ActivityIndicator } from 'react-native'
import {
    useFonts
  } from '@expo-google-fonts/inter';
  import { LinearGradient } from 'expo-linear-gradient';
import Notificaciones from './Notificaciones';
import { useEffect } from 'react';

import confg from "../congiruracionGlobal"

export default function Inicio(props) {

    let [fontsLoaded] = useFonts({
        'Rampart': require('../assets/RampartOne-Regular.ttf')
      });

      const styles = StyleSheet.create({
        loader:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: '40%'
          },

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
            color: "#292929"
        },
        text_userlist:{

            fontFamily: 'Rampart',
            flex: 1,
            fontSize: 30,
            textAlign: 'left',
            marginLeft: 30,
            marginTop: 10,
            color: "#000"
            
        }
        ,
        image_arrow:{
            marginTop: 15,
            marginRight: 25,
            width: 40,
            height: 40,
            
        },
    
        container_icons: {
            flex: 3,
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 1,
            marginBottom: 1,
            
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
            backgroundColor: "#FFf",
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 20,
            height: "65%",
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
            width: "90%",
            height: 70,
            padding: 10,
            borderRadius: 30
        },
        text_nueva:{
            fontFamily: 'Rampart',
            fontSize: 30,
            color: "#000",
        },
        button: {
            padding: 15,
            alignItems: 'center',
            borderRadius: 5,
            flex: 3
            
        },
        container_icons2: {
            flex: 3,
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            margin: 10,
            height: 10,
            backgroundColor: "#fff",
            borderRadius: 25,
            

        }
    
    }) 

    
    if(!fontsLoaded) {
        return <AppLoading />;
    }

    
    
    


  return (
    
        <View style={styles.container}>
            <View style={styles.container_text}>
                <Text style={styles.text}>
                    Struct<Text style={styles.text_bold}>Life</Text>
                </Text>
            </View>
            <View style={styles.cont_userlist}>
            

            <View style={{
                flex: 1,
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 2,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6
                }}>
                    <LinearGradient start={{x:0.8, y:1.5}}  colors={[  '#f4af8a', '#c07cd0']} style={styles.container_icons}>
                                <Text style={styles.text_userlist}>
                                    Tareas
                                </Text>
                                <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Lista de tareas")} }>  
                                    <Image style={styles.image_arrow}  source={require("../assets/arrow2.png")} />
                                </TouchableHighlight>
                    </LinearGradient>
                </View>
                <Notificaciones color="red" req={"/api/tasks"}/>

                <View style={{
                flex: 1,
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 2,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6,
                }}>
                <LinearGradient start={{x:0.8, y:1.5}}  colors={[  '#f4af8a', '#55b0df']} style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Turnos
                    </Text>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => {props.navigation.navigate("Lista de turnos")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/turn.png")} />
                      </TouchableHighlight>   
                      
                </LinearGradient>
                </View>
                <Notificaciones color="red" req={"/api/turns"} />

                <View style={{
                flex: 1,
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 2,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6,
                }}>               
                    <LinearGradient start={{x:0.8, y:1.5}}  colors={[  '#f4af8a', '#fecdcd']} style={styles.container_icons}>
                        <Text style={styles.text_userlist}>
                            Estudios
                        </Text>
                        <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Lista de estudios")} }>  
                            <Image style={styles.image_arrow}  source={require("../assets/study.png")} />
                        </TouchableHighlight>
                    </LinearGradient>
                </View> 
                <Notificaciones color="#12BA26" req={"/api/studies"} />

                <View style={{
                flex: 1,
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 2,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6,
                }}>       
                    <LinearGradient start={{x:0.9, y:0.7}}  colors={[  '#f4af8a', '#9ad08b']} style={styles.container_icons}>
                        <Text style={styles.text_userlist}>
                            Ideas
                        </Text>
                        <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("lista de ideas")} }>  
                            <Image style={styles.image_arrow}  source={require("../assets/ideas.png")} />
                        </TouchableHighlight>
                    </LinearGradient>
                </View>
                <Notificaciones color="#12BA26" req={"/api/ideas"} />

                <View style={{
                flex: 1,
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 2,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6,
                }}>       
                <LinearGradient start={{x:0.8, y:1.1}}  colors={[  '#f4af8a', '#ffec70']} style={styles.container_icons}>
                    <Text style={styles.text_userlist}>
                        Compras
                    </Text>
                    <TouchableHighlight  underlayColor={"transparent"} onPress={() => {props.navigation.navigate("lista de compras")} }>  
                        <Image style={styles.image_arrow}  source={require("../assets/metas.png")} />
                      </TouchableHighlight>
                </LinearGradient>
                </View>
            <Notificaciones color="#947BD3" req={"/api/compras"} />
            
            </View>


                <Text style={styles.textNewEntry}>
                    Agregar <Text style={styles.text_nueva}>Nueva..</Text>
                </Text>
                <View style={{
                    width: "100%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0.5,
                        height: 4,
                    },
                    shadowOpacity: 0.70,
                    shadowRadius: 4.70,
                    elevation: 6,
                }}>
                <LinearGradient start={{x:0.8, y:0.2}}  colors={[   '#709bff', '#febebe']} style={styles.cont_menu}>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("Crear Tarea")} }>
                        <Image style={styles.image_menu}  source={require("../assets/arrow2.png")} />
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("crear turnos")} }>
                        <Image style={styles.image_menu}  source={require("../assets/turn.png")} />
                    </TouchableHighlight>

                    <TouchableHighlight  underlayColor={"transparent"} onPress={() => {props.navigation.navigate("crear estudio")} }>
                        <Image style={styles.image_menu}  source={require("../assets/study.png")} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("crear idea")} }>
                        <Image style={styles.image_menu}  source={require("../assets/ideas.png")} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"transparent"}  onPress={() => {props.navigation.navigate("crear compra")} }>
                        <Image style={styles.image_menu}  source={require("../assets/metas.png")} />
                    </TouchableHighlight>
                </LinearGradient>
                </View>



        </View>
    

  )
}



