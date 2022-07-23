import React, {useEffect, useState, memo} from 'react'
import { StyleSheet, Text, View, StatusBar,ScrollView, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import Panel from '../Panel';
import {
  useFonts
} from '@expo-google-fonts/inter';

import{
  PoiretOne_400Regular
} from "@expo-google-fonts/poiret-one"
import{
  Koulen_400Regular
} from "@expo-google-fonts/koulen"
import confg from "../../congiruracionGlobal"
import { Alert } from 'react-native';
import CardTask from './CardTask';



export default function TaskList(props) {
  const [state, setState] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  
  let [fontsLoaded] = useFonts({
    'Rampart': require('../../assets/RampartOne-Regular.ttf'),
  });
  

  let [fontsLoaded2] = useFonts({
    PoiretOne_400Regular,
    Koulen_400Regular
  });

  
  const {url} = confg
  
  
  
  const deleteTask = async (id) => {
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
            getTasks()
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
      setState(_data)
      setIsLoading(false)
    }
      catch (error) {
        console.log(error)
      }
    }
  
  
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
    getTasks()
  } , [])

  

  //estilos
  const styles = StyleSheet.create({
    container1: {
        fontSize: 18,
        color: '#000',
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        
        padding: 15,
        borderRadius: 13,
        backgroundColor: '#F3D9D9',
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
      container2: {
         
          fontSize: 18,
          color: '#000',
          marginTop: 12,
          marginLeft: 8,
          marginRight: 8,
          padding: 12,
          borderRadius: 13,
          backgroundColor: '#E4EEE0',
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
        fontSize: 17,
        fontWeight: 'bold',
        width: '100%',
        marginLeft: 13,
        marginBottom: 7,
        fontFamily: 'PoiretOne_400Regular',
      },
      textDate: {
        fontSize: 20,
        marginLeft: 13,
        marginBottom: 7,
        width: '100%',
        fontFamily: 'Koulen_400Regular',
        letterSpacing: 1,
      },
      cont_name_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
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
        marginTop: 20,
        width: '25%',

      }
      ,
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
        fontFamily: 'PoiretOne_400Regular',
        fontWeight: 'bold',
        letterSpacing: 1.5,
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
          
          (state.map(item => {
            return (
            <CardTask completed={item.completed} _id={item._id} key={item._id} description={item.description} title={item.title} deleteTask={deleteTask} taskCompleted={taskCompleted} />
            )
        }))
      } 
    </View>
    </ScrollView >
    
      <Panel props={props} url="Crear Tarea" state={state}/>
    
      
    
    </>
    
  )
}







     