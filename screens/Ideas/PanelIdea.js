import React from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,ActivityIndicator } from 'react-native'
import * as Progress from 'react-native-progress';
import {Svg} from "react-native-svg"

  import{
    PoiretOne_400Regular,
    useFonts
  } from "@expo-google-fonts/poiret-one"


export default function PanelIdea({props ,tamaño, url, margBottom}) {

    let [fontsLoaded2] = useFonts({
        PoiretOne_400Regular
      });

       if (!fontsLoaded2) {
        return <ActivityIndicator size="large" color="#FE7092" />;
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
            marginLeft: '5%',
            marginRight: 'auto',
            marginBottom:margBottom,
            width: '90%',
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
            position: 'absolute',
            bottom: 0,
          }
          ,
          
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
          container_task_complete:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '65%',
            height: 70,
            padding: 5,
            borderRadius: 20,
            backgroundColor : '#f5c3a8',
            marginLeft: 'auto',
          }
          
    })

    
    
    
   

return (
    <View style={styles.cont_actions_buttons}>
        <View style={styles.container_task_complete}>
          <Image style={styles.task_complete_panel} source={require("../../assets/idea_panel.png")} />
          <Text style={styles.tasks_texts_actions}>{tamaño}</Text>
        </View>

        <TouchableHighlight underlayColor={"transparent"} style={styles.contTask} onPress={() => props.navigation.navigate(url) }>
          <Image style={styles.newTask}  source={require("../../assets/button.png")} />
        </TouchableHighlight> 
    </View>
      
        
        
    
  )
}
