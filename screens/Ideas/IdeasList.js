
import React from 'react'
import { useEffect, useState} from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableHighlight, Image, ActivityIndicator} from 'react-native'

import { Alert } from 'react-native';
import {
  Oswald_600SemiBold
} from "@expo-google-fonts/oswald"

import {
  KottaOne_400Regular, useFonts
} from "@expo-google-fonts/kotta-one"
import confg from "../../congiruracionGlobal"
import { LinearGradient } from 'expo-linear-gradient';
import PanelIdea from './PanelIdea';

export default function IdeasList(props) {

  const {url} = confg

  const [ideas, setIdeas] = useState()
  const [tamaño, setTamaño] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [fontsLoaded] = useFonts({ 
    Oswald_600SemiBold,
    KottaOne_400Regular
  });

  const getIdeas = async () => {
    try{

      const _ideas = await fetch(`${url}/api/ideas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const _ideasJson = await _ideas.json()
      setIdeas(_ideasJson)
      setTamaño(_ideasJson.length)
      setIsLoading(false)

    }catch(err){
      console.log(err)
    }

  }
  
    const deleteIdea = async (id) => {
      try {
        //alerta en ios
        Alert.alert(
          'Eliminar Idea',
          '¿Estas seguro de eliminar esta Idea?',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Eliminar', onPress: async () => {
              setIsLoading(true)
              const idea =  await fetch(`${url}/api/ideas/deleteidea/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
              await idea.json()
              getIdeas()
              setTimeout(() => {
                setIsLoading(false)
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
    getIdeas()
  }, [ideas])


  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#fff',
      
    },
    no_hay_idea: {
      color: '#000',
      fontSize: 20,
      textAlign: 'center',
      marginTop: '50%',
    },

    noVisible:{
      display: 'none'
    },
    textPresentation:{
      marginTop: 50,
      marginBottom: 20,
      fontSize: 40,
      textAlign: 'center',
      fontFamily:"Rampart",
    
    },
    loader:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    cont_idea_list:{
      display: 'flex',
      width: '100%',
      height: '100%',
      margin: '1.5%',
      paddingBottom: '10.5%',
    },
    container_card_idea:{
      width: '94%',
      height: 160,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: '1.8%',
      borderRadius: 20,
      padding: '3.5%',
      
    },
    image:{
      width: 100,
      height: 100,
    },
    cont_img:{
      width: '40%',
    },
    cont_body_text:{
      width: '70%',
      height: '100%',
      padding: '1.5%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    container_scroll:{
      width: '100%',
      height: '100%',
      marginBottom: '50%',
    },
    text_description:{
      fontSize: 15,
      fontFamily: "KottaOne_400Regular",
      color: '#000',
      letterSpacing: 1,
    },
    text_title:{
      fontSize: 18,
      fontFamily: "Oswald_600SemiBold",
      color: '#000',
      letterSpacing: 0.5,
    },
    button_pendiente_idea:{
      width: '95%',
      height: 'auto',
      backgroundColor: '#fdea72',
      borderRadius: 20,
      paddingLeft: '3%',
      paddingRight: '3%',
      paddingTop: '2.5%',
      paddingBottom: '2.5%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '2.5%',
      
    },
    text_pendiente_idea:{
      fontSize: 17,
      fontFamily: "KottaOne_400Regular",
      color: '#000',
    }, 
    sombras:{
      shadowColor: "#000",
      shadowOffset: {
      width: 0.2,
      height: 1,
      },
      shadowOpacity: 0.70,
      shadowRadius: 3.70,
      elevation: 2
    }
  })


  return (
    <>
     <View>
        <Text style={ isLoading ? styles.noVisible : styles.textPresentation}>
          Lista de <Text style={{color: "#f4a261"}}>Estudio</Text>
        </Text>
      </View>

      <View style={ isLoading ? styles.loader : styles.cont_idea_list}>
      {
        isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#f4a261" />
        </View>
        :
        ideas.length > 0 ?
        <ScrollView style={styles.container_scroll}>
        {
          ideas.map((idea, index) => {
            return (
              <View style={styles.sombras} key={idea._id}>
            <LinearGradient colors={['#f5c3a8', '#c69ad0']} start={{x:0.1, y:1.3}} style={styles.container_card_idea} >
              <View style={styles.cont_img} >
                <Image style={styles.image} source={require("../../assets/idea.png")} />
              </View>
              <View style={styles.cont_body_text}>
                <View style={styles.cont_idea_text}>
                  <Text style={styles.text_title}>• {idea.title}</Text>
                </View>  
                <View style={styles.cont_idea_text}>
                  <Text style={styles.text_description}>• {idea.description}</Text>
                </View> 
                <TouchableHighlight onPress={()=> deleteIdea(idea._id)} style={styles.button_pendiente_idea}>
                  <Text style={styles.text_pendiente_idea}>Eliminar</Text>
                </TouchableHighlight>
              </View>
            </LinearGradient>
            </View>
            )
          })
        }
        </ScrollView>
          :
          <Text style={styles.no_hay_idea}>No hay ideas</Text>
        }
      </View>
        <PanelIdea props={props} margBottom={17} url="crear idea" tamaño={tamaño} />
    </>
  )
}
