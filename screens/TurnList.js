
import React from 'react'
import { useEffect, useState, memo } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import {
  useFonts
} from '@expo-google-fonts/inter';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {es} from 'moment/locale/es';
import confg from "../congiruracionGlobal"


const myComponent = React.memo(function TurnList(props) {
  let [fontsLoaded2] = useFonts({
    'Osward': require('../assets/Oswald-VariableFont_wght.ttf')
    
  });

  moment().locale(es);

  const [state, setState] = useState({
    _tasksState: [],
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
      _tasksState: turnsJson,
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
    const task = await fetch(`${url}/api/turns/completeturn/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (task.status === 200) {
      getTurns()
    }
  }
  const deleteTurn = async (id) => {
    setState({
      ...state,
      loader: true
    })
    const task = await fetch(`${url}/api/turns/deleteturn/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
     if (task.status === 200) {
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
  container_list_items : {
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
  text_list_item : {
    fontSize: 20,
    fontFamily: 'Osward',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },

  text_list_item_date : {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 15,
    fontFamily:'Rampart',
    textAlign: 'center',
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
  contTurnIcons:{
    flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,

  },
  
 
  
  contButtoncomplete:{
    backgroundColor: "#00C00B",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
  },
  contButtonIncomplete:{
    backgroundColor: "#FF0000",
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
  },
  contButtonEliminar:{
    backgroundColor: "#0095FF",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
  }
  ,
  buttonComplete:{
    color: "#fff",
    fontFamily: 'Osward',
    fontSize: 16,
    letterSpacing: 1,
  }
  , textComplete: {
    fontFamily: 'Osward',
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1,
  },
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
  point:{
    width: 50,
    height: 50,
  }
  ,
  point2:{
    width: 34,
    height: 34,
    marginLeft: 10,
    marginRight: 5,
  },
  contTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
    

  },
  line:{
    
    alignItems: 'flex-start',
    margin: 9,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',

    
    height: 2,
    backgroundColor: "#000",
  },
  textDate: {
    fontFamily: 'Rampart',
    fontSize: 17,
    paddingLeft: 10,
    paddingRight: 10,
  }


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
            state._tasksState > 0 ?
            (
              <>
              <Text>No hay turnos</Text>
              <Image style={styles.image} source={require("../assets/empty.png")} />
              
              </>
            ):

              state._tasksState.map(item => {
                return (
                  <View key={item._id} style={styles.container_list_items}>
                
                  <View style={styles.container_list_items_item}>
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
                  </View>
                </View>)
              })
        }
          </View>

    </View>
    }
    </ScrollView>
    <TouchableHighlight underlayColor={"transparent"} style={styles.contTurn} onPress={() => props.navigation.navigate('crear turnos')}>
      <Image style={styles.newTurn}  source={require("../assets/buttonTurn.png")} />
    </TouchableHighlight>
</>

    
    
  )
})




export default myComponent;
