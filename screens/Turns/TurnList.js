
import React from 'react'
import { useEffect, useState, memo } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import {
  useFonts
} from '@expo-google-fonts/inter';
import { Alert } from 'react-native';
import {
  Oswald_600SemiBold
} from "@expo-google-fonts/oswald"

import {
  KottaOne_400Regular
} from "@expo-google-fonts/kotta-one"

import moment from 'moment';
import {es} from 'moment/locale/es';
import confg from "../../congiruracionGlobal"
import Panel from '../Panel';


const myComponent = React.memo(function TurnList(props) {
  const [fontsLoaded] = useFonts({
    KottaOne_400Regular,
    Oswald_600SemiBold
  });


  moment().locale(es);

  const [state, setState] = useState({
    _turnState: [],
    loader: true
  })
  
  const {url} = confg

  const getTurns = async () => {
    try{ 
    const turns = await fetch(`${url}/api/turns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const turnsJson = await turns.json()
    setState({
      _turnState: turnsJson,
      loader: false
    })
    }catch(err){
      console.log(err)
    }
    
  } 
  const parseDate = (date) => {
    let dateArray = date.split('T')
    dateArray = dateArray[0].split('-')
    dateArray = dateArray.reverse()
    return dateArray.join('/')

  }
  const turnCompleted = async (id) => {
    const turn = await fetch(`${url}/api/turns/completeturn/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (turn.status === 200) {
      getTurns()
    }
  }
  
  const deleteTurn = async (id) => {
    try {
      //alerta en ios
      Alert.alert(
        'Eliminar Turno',
        '¿Estas seguro de eliminar esta Turno?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Eliminar', onPress: async () => {
            setState({
              ...state,
              loader: true
            })
            const turn = await fetch(`${url}/api/turns/deleteturn/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            await turn.json()
            setTimeout(() => {
              getTurns()
              
            }, 1000);
          }},
          
        ],
        {cancelable: false},
        );
      } catch (error) {
        console.log(error);
      }
      
    

  }

useEffect(() => { 
  getTurns()
}, [])


const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#fff',
    
  },
  container_list:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  

  text_list:{
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
    fontFamily: 'Rampart',
    height: "10%",
  },
  textTurn:{
    fontSize: 40,
    fontWeight: 'bold',
    color: "#B42ACA",
  },
  contTurn:{
    width: 0,
   height: 0,
    backgroundColor: "transparent",
    flex: 1,
  },
  newTurn: {
   bottom: 80,
   left: 176,
   justifyContent: 'center',
   alignItems: 'center',
   opacity: 0.7,

  }
  ,
  ListaTurns:{
    flex: 1,
    flexDirection: 'column',
    
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 5,
    marginBottom: 10,
    paddingBottom: 70,
    width: "100%",
    height: "auto",
    borderRadius: 22,
  },

  /* item de turno */
  container_card_turn : {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    width: "90%",
    height: "auto",
    padding: 10,
    shadowColor: "#5D5D5D",
      shadowOffset: {
        width: 0.1,
        height: 1,
      },
      shadowOpacity: 1.50,
        shadowRadius: 4.50,
        elevation: 1,
  }
  ,
  titles_container_turns:{
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  date_info_turn:{
    backgroundColor: "#FFD78A",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 7,
    borderRadius: 13,
    width: "45%",
    
  },
  text_date_turn:{
    fontSize: 18,
    textAlign: "center",
    fontFamily: "KottaOne_400Regular",
  },
  hour_info_turn:{
    backgroundColor: "#BCDBFF",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 7,
    borderRadius: 13,
    width: "45%",
  },
  text_hour_turn:{
    paddingTop: 2,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "KottaOne_400Regular"
  },
  body_container_turns:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  img_container_turn: {
    width: "25%",
    
  },
  image_time:{
    borderRadius: 15,
    width: 85,
    height: 85,
  },
  img_delete_turn:{
    width: "10%",
    height: "auto",
    display: "flex",
    justifyContent: "flex-end",
    

  },
  img_delete:{
    width: 33,
    height: 33,
    borderRadius: 5,
  },
  info_container_turn: {
    width: "50%",
    marginLeft: "4%",
    marginRight: "4%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

  },
  title_info_turn:{
    fontSize: 18,
    fontFamily: "Oswald_600SemiBold", 
    fontWeight: "bold",
    flexWrap: "nowrap",
  },
  title_info_turn2:{
    fontSize: 15,
    fontFamily: "Oswald_600SemiBold", 
    fontWeight: "bold",
    flexWrap: "nowrap",
  },
  description_info_turn:{
    fontSize: 18,
    fontFamily: "KottaOne_400Regular",
    marginTop: 4,
  },
  button_complete_turn:{
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009846",
    borderRadius: 10,
    paddingBottom: 3,
    paddingTop: 3,
    marginTop: 10,
  },
  button_pendiente_turn:{
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F26273",
    borderRadius: 10,
    paddingBottom: 3,
    paddingTop: 3,
    marginTop: 10,
  },
  text_complete_turn:{
    fontSize: 15,
    fontFamily: "KottaOne_400Regular",
    color: "#fff",
    letterSpacing: 1,
  },
})

  return (
    <>
    <ScrollView style={styles.container}>
    {
      state.loader ? <ActivityIndicator style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100%',
        marginLeft: 10,

      }} size="large" color="#a585e7" /> :

    <View style={styles.container_list}>
        <Text style={styles.text_list}>Lista de <Text style={styles.textTurn}>Turnos</Text></Text>
          <View style={styles.ListaTurns}>
          {
            state._turnState > 0 ?
            (
              <>
              <Text>No hay turnos</Text>
              <Image style={styles.image} source={require("../../assets/empty.png")} />
              
              </>
            ):

              state._turnState.map(item => {
                return (
                  <View key={item._id} style={styles.container_card_turn}>
                    <View style={styles.titles_container_turns}>
                      <View style={styles.date_info_turn}>
                        <Text style={styles.text_date_turn}>{parseDate(item.Date)}</Text>
                      </View>
                      <View style={styles.hour_info_turn}>
                        <Text style={styles.text_hour_turn}>A las.. {item.TurnTime}</Text>  
                      </View>
                    </View>
                    <View style={styles.body_container_turns}>
                      <View style={styles.img_container_turn}>
                        <Image style={styles.image_time} source={require("../../assets/img_time.png")} />
                      </View>
                      <View style={styles.info_container_turn}>
                        <Text style={item.title.length < 12 ? styles.title_info_turn : styles.title_info_turn2}>• {item.title}</Text>
                        <Text style={styles.description_info_turn}>• {item.description}</Text>
                        <View style={item.completed ? styles.button_complete_turn : styles.button_pendiente_turn }>
                          <Text onPress={() => turnCompleted(item._id)} style={styles.text_complete_turn} >{
                            item.completed ? "Completado" : "Pendiente"
                          }</Text>
                        </View>
                      </View>
                      <View style={styles.img_delete_turn}>
                      <Text onPress={() => deleteTurn(item._id)} style={styles.buttonComplete}>
                        <Image style={styles.img_delete} source={require("../../assets/img_delete.png")} />
                      </Text>
                      </View>
                    </View>
                </View>)
              })
        }
          </View>

    </View>
    }
    </ScrollView>

    <Panel props={props} url="crear turnos" state={state._turnState}/>
   
</>

    
    
  )
})




export default myComponent;






