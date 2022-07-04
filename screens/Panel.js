import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import {
    useFonts
  } from '@expo-google-fonts/inter';

export default function Panel({props ,url, state}) {
    let [fontsLoaded] = useFonts({
        'PoiretOne': require('../assets/PoiretOne-Regular.ttf')
      });
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
            backgroundColor : '#FF9393',
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
            backgroundColor : '#91E595',
            marginLeft: 'auto',
          },
          task_complete_panel:{
            width: 50,
            height: 50,
            paddingBottom: 10,
          },
          tasks_texts_actions:{
            fontSize: 20,
            fontFamily: 'PoiretOne',
            fontWeight: 'bold',
            letterSpacing: 1.5,
          }
    })

  return (
    <View style={styles.cont_actions_buttons}>
        <View style={styles.container_task_complete}>
          <Image style={styles.task_complete_panel} source={require("../assets/complete-panel.png")} />
          <Text style={styles.tasks_texts_actions}>{
            state.filter(item => item.completed).length
          }</Text>
        </View>

        <TouchableHighlight underlayColor={"transparent"} style={styles.contTask} onPress={() => props.navigation.navigate(url) }>
          <Image style={styles.newTask}  source={require("../assets/button.png")} />
        </TouchableHighlight> 

        <View style={styles.container_task_incomplete}>
          <Text style={styles.tasks_texts_actions}>{
            state.filter(item => !item.completed).length
          }</Text>
          <Image style={styles.task_complete_panel} source={require("../assets/pendiente-panel.png")} />
        </View>
      </View>
  )
}
