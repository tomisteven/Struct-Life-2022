
import React from 'react'
import { useEffect, useState, memo } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import {
  useFonts
} from '@expo-google-fonts/inter';

import moment from 'moment';
import {es} from 'moment/locale/es';
import confg from "../../congiruracionGlobal"


const myComponent = React.memo(function TurnList(props) {
  let [fontsLoaded2] = useFonts({
    'Osward': require('../../assets/Oswald-VariableFont_wght.ttf')
    
  });
  const [fontsLoaded] = useFonts({ 
    'Koulen' : require('../../assets/Koulen.ttf'),
    'KottaOne': require('../../assets/KottaOne-Regular.ttf'),
  });

  moment().locale(es);

  const [state, setState] = useState({
    _turnState: [],
    loader: true
  })
  


  const {url} = confg

  const getTurns = async () => {
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
     if (turn.status === 200) {
      getTurns()
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
    flex: 1,
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 20,
    marginBottom: 10,
    paddingBottom: 70,
    width: "95%",
    height: "auto",
    borderRadius: 22,
    
    shadowColor: "#000",

    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 3.50,
    shadowRadius: 4.50,
    elevation: 3,
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
    shadowColor: "#000",
      shadowOffset: {
        width: 0.3,
        height: 2,
      },
      shadowOpacity: 2.50,
        shadowRadius: 4.50,
        elevation: 3,
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
    fontFamily: "KottaOne",
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
    fontFamily: "KottaOne"
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
    fontFamily: "Osward", 
    fontWeight: "bold",
    flexWrap: "nowrap",
  },
  title_info_turn2:{
    fontSize: 15,
    fontFamily: "Osward", 
    fontWeight: "bold",
    flexWrap: "nowrap",
  },
  description_info_turn:{
    fontSize: 18,
    fontFamily: "KottaOne",
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
    fontFamily: "KottaOne",
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
    <TouchableHighlight underlayColor={"transparent"} style={styles.contTurn} onPress={() => props.navigation.navigate('crear turnos')}>
      <Image style={styles.newTurn}  source={require("../../assets/buttonTurn.png")} />
    </TouchableHighlight>
</>

    
    
  )
})




export default myComponent;






/* <View style={styles.container_list_items_item}>
                    <Text style={styles.text_list_item_date}>{parseDate(item.Date)}</Text>
                    
                      <View style={styles.contTurnIcons}>
                      {
                            item.completed ?
                            <Image style={styles.point} source={require("../assets/24-hours.png")} />
                            :
                            <Image style={styles.point} source={require("../assets/turnRED.png")} />
                      }
                      <Text style={styles.text_list_item}>{item.title}</Text>
                      </View>
                      <View style={styles.contTurnIcons}>
                          <Image style={styles.point2} source={require("../assets/desccription.png")} />
                          <Text style={styles.text_list_item}>{item.description}</Text>
                      </View>
                      <View style={styles.line}></View>
                      </View>   
                      <View style={styles.contTime}>
                        <Text style={styles.textDate}>Turno Creado hace..</Text>  
                        <TimeAgo style={styles.textDate} time={item.Date} /> 
                      </View>
                      <View style={styles.line}></View>
                      <View style={styles.contTime}>
                        <Text style={styles.textDate}>Tiempo para turno..</Text>  
                        <TimeAgo style={styles.textDate} time={item.TurnDate} /> 
                      </View>
                      <View style={styles.line}></View>

                      <View style={styles.contActions}>
                          {
                            item.completed ?
                            <View style={styles.contButtoncomplete}>
                                  <Text onPress={() => turnCompleted(item._id)} style={styles.textComplete} >Completado</Text>
                            </View>
                                  : 
                            <View style={styles.contButtonIncomplete}>
                                  <Text onPress={() => turnCompleted(item._id)} style={styles.textComplete}>Pendiente</Text>
                            </View>
                          }
                        <View style={styles.contButtonEliminar}>
                          <Text onPress={() => deleteTurn(item._id)} style={styles.buttonComplete}>  Eliminar  </Text>
                        </View>
                  </View> */