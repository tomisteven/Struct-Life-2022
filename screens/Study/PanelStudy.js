import React from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,ActivityIndicator } from 'react-native'
import * as Progress from 'react-native-progress';
import {Svg} from "react-native-svg"

  import{
    PoiretOne_400Regular,
    useFonts
  } from "@expo-google-fonts/poiret-one"


export default function PanelStudy({data, url}) {

  const [suma_, setSuma] = useState(0)

    let [fontsLoaded2] = useFonts({
        PoiretOne_400Regular
      });

       if (!fontsLoaded2) {
        return <ActivityIndicator size="large" color="#FE7092" />;
      }


      const sumaPromedio = () => {
        let suma  = 0 
        data.data.forEach(element => {
          suma += element.porcentajeAvance
        })
        return Math.floor(suma / data.data.length) || 0
      }

      
    

    const styles = StyleSheet.create({
        newTask: {
            opacity: 0.6,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 15,
          },
        contTask: {
            marginTop: 20,
            width: '25%',
          },
          cont_actions_buttons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom:15,
            marginTop: 20,
            width: '95%',
            
            borderRadius: 30,
            height: 90,
            backgroundColor: '#fff',
    
            shadowColor: "#000",
            shadowOffset: {
              width: 0.3,
              height: 2,
            },
            shadowOpacity: 0.50,
            shadowRadius: 4.50,
            elevation: 3,
          },
          container_task_incomplete:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '35%',
            height: 70,
            padding: 5,
            borderRadius: 20,
            backgroundColor : '#FFB37C',
            marginRight: 'auto',
            
          }
          ,
          container_task_complete:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '35%',
            height: 70,
            padding: 5,
            borderRadius: 20,
            backgroundColor : '#B38ADD',
            marginLeft: 'auto',
          },
          task_complete_panel:{
            width: 50,
            height: 50,
            paddingBottom: 10,
          },
          tasks_texts_actions:{
            fontSize: 23,
            fontFamily: 'PoiretOne_400Regular',
            fontWeight: 'bold',
            letterSpacing: 1.5,
          },
          text_circle:{
            fontSize: 17,
            position: 'absolute',
            left: '40%',
            fontFamily: 'PoiretOne_400Regular',
          }
    })


return (
    <View style={styles.cont_actions_buttons}>
        <View style={styles.container_task_complete}>
          <Image style={styles.task_complete_panel} source={require("../../assets/libro-panel.png")} />
          <Text style={styles.tasks_texts_actions}>{
            data.data.length
          }</Text>
        </View>

        <TouchableHighlight underlayColor={"transparent"} style={styles.contTask} onPress={() => props.navigation.navigate(url) }>
          <Image style={styles.newTask}  source={require("../../assets/button.png")} />
        </TouchableHighlight> 

        <View style={styles.container_task_incomplete}>
            <Progress.Circle progress={sumaPromedio()/100} size={50} width="auto" height="auto"  animated={true} color="#000" ></Progress.Circle>
          
          <Text style={styles.text_circle}>{
            sumaPromedio() + "%"
          }</Text>
        </View>
      </View>
        
        
    
  )
}
