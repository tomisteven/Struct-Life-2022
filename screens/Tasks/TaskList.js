import React, {useEffect, useState, memo} from 'react'
import { StyleSheet, Text, View, StatusBar,ScrollView, Image, ActivityIndicator, TouchableHighlight } from 'react-native'

import {
  useFonts
} from '@expo-google-fonts/inter';

import confg from "../../congiruracionGlobal"
import { Alert } from 'react-native';


const myComponentTask = React.memo(function TaskList(props) {

  
  const [state, setState] = useState({
    _tasksState: []
  })
  const [isLoading, setIsLoading] = useState(true);
  
  
  
  let [fontsLoaded] = useFonts({
    'Rampart': require('../../assets/RampartOne-Regular.ttf'),
  });
  
  let [fontsLoaded2] = useFonts({
    'PoiretOne': require('../../assets/PoiretOne-Regular.ttf')
  });
  
  const {url} = confg
  
  
  
  const deleteUser = async (id) => {
    try {
      //alerta en ios
      Alert.alert(
        'Eliminar Tarea',
        '¿Estas seguro de eliminar esta tarea?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Eliminar', onPress: async () => {
            setIsLoading(true)
            const task =  await fetch(`${url}/api/tasks/deletetask/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
            await task.json()
            setTimeout(() => {
              setIsLoading(false)
            }, 500);
          }},
          
        ],
        {cancelable: false},
        );
      } catch (error) {
        console.log(error);
      }
      
    }

    const getTasks = async () => {
      try {
       
        const task = await fetch(`${url}/api/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const _data = await task.json()
      setState({
        _tasksState: _data,
      })
      setIsLoading(false)
    }
      catch (error) {
        console.log(error)
      }
    }
  
  const memoTask = React.useMemo(() => getTasks, [state._tasksState])
  
  const taskCompleted = async (id) => {
    setIsLoading(true)
    const task = await fetch(`${url}/api/tasks/completetask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (task.status === 200) {
      console.log('Task completed')
      getTasks()
    }else{
      console.log('Task not completed')
    }
    setIsLoading(false)
  }

  
  useEffect(() => {
    memoTask()
  } , [state])

  

  //estilos
  const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        color: '#000',
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        
        padding: 12,
        borderRadius: 13,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.55,
        shadowRadius: 5.50,
        elevation: 3,

      },
      loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '40%'
      },

      textName: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        marginLeft: 13,
        marginBottom: 7,
        fontFamily: 'PoiretOne',
      },
      textDate: {
        fontSize: 19,
        marginLeft: 13,
        marginBottom: 7,
        width: '100%',
      },
      cont_name_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff3',
      },
      cont_userlist: {
        backgroundColor: "#fff",
        height: "auto",
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 20,
        marginBottom: 80,
        shadowColor: "#000",
        shadowOffset: {
          width: 0.5,
          height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.50,
        elevation: 3,
      },
      noVisible: {
        display: 'none'
      },
      textPresentation: {
        marginTop: 50,
        marginBottom: 20,

        fontSize: 35,
        textAlign: 'center',
        fontFamily: "Rampart",

      },
      dump: {
        marginTop: 10,
      },
      ok: {
        marginTop: 15,
      },

      newActions: {
        justifyContent: 'space-around',
        flexDirection: 'row',

        marginBottom: 20,
        width: '85%',
        height: 80,
        marginLeft: '7%',
        borderRadius: 30,
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
      refreshCont: {
        marginTop: 8,

      },
      newTask: {
        opacity: 0.6,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
      },
      contTask: {
        width: '100%',

      }
  })


  return (
    <>
      <View  >
        <Text style={isLoading ? styles.noVisible : styles.textPresentation}>
          Listado de <Text style={{color: "#FE7092"}}>Tareas</Text>
        </Text>
      </View>
     
    <ScrollView style={{
      marginBottom: -70,
    }}>


    <View  style={isLoading ? styles.loader : styles.cont_userlist}>

      {isLoading ? 
          <View  style={styles.loader}>
                <ActivityIndicator size="large" color="#FE7092" />
          </View>
          :
          
          (state._tasksState.map(item => {
              
            return (
              
                <View  style={styles.container} key={item._id}>

                  
                    <View style={styles.cont_name_view}>
                      {
                        item.completed ?
                        <Image style={styles.point} source={require("../../assets/PointGREEN.png")} />
                        :
                        <Image style={styles.point} source={require("../../assets/pointsRED.png")} />
                      }
                      <Text style={styles.textDate}>{item.title}</Text>
                    </View>
                    <View style={styles.cont_name_view}>
                      <Image style={styles.point} source={require("../../assets/arrow.png")} /><Text style={styles.textName}>{item.description}</Text>
                    </View>
                  

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: 7,
                  
                }}>
                    <View style={{
                      
                      borderStyle: 'solid',
                      borderColor: '#D6D6D6',
                      borderWidth: 1,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderRadius: 20,
                      paddingBottom: 10,
                    }}>
                      <TouchableHighlight  onPress={() => {taskCompleted(item._id)} }>  
                        {
                          item.completed ?
                          <Image style={styles.ok} source={require("../../assets/ok.png")} />
                          :
                          <Image style={styles.ok} source={require("../../assets/notOk.png")} />
                        }
                      </TouchableHighlight>
                    
                    <View>
                      <TouchableHighlight  onPress={() => deleteUser(item._id) }>  
                          <Image style={styles.dump}  source={require("../../assets/eliminar.png")} />
                      </TouchableHighlight>
                    </View>
                    </View>
                </View>
                
                </View>
            )
        }))
      } 
    </View>
    </ScrollView >
    
      
      <TouchableHighlight underlayColor={"transparent"} style={styles.contTask} onPress={() => props.navigation.navigate('Crear Tarea') }>
          <Image style={styles.newTask}  source={require("../../assets/button.png")} />
      </TouchableHighlight>
      
      
    
    </>
    
  )
})



export default myComponentTask
