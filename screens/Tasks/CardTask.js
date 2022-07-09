import React from 'react'
import { StyleSheet, Text, View, StatusBar,ScrollView, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import{
    PoiretOne_400Regular,
    useFonts
  } from "@expo-google-fonts/poiret-one"
  import{
    Koulen_400Regular
  } from "@expo-google-fonts/koulen"

  import {
    BebasNeue_400Regular
  } from "@expo-google-fonts/bebas-neue"

export default function CardTask({completed, title, description, _id, deleteTask, taskCompleted}) {

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
          cont_name_view: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            
          },
          textDate: {
            fontSize: 20,
            marginLeft: 13,
            marginBottom: 7,
            width: '100%',
            fontFamily: 'BebasNeue_400Regular',
            letterSpacing: 1,
          },
          textName: {
            fontSize: 17,
            fontWeight: 'bold',
            width: '100%',
            marginLeft: 13,
            marginBottom: 7,
            fontFamily: 'PoiretOne_400Regular',
          },
          dump: {
            marginTop: 10,
          },
          ok: {
            marginTop: 15,
          },
    });

    let [fontsLoaded2] = useFonts({
        PoiretOne_400Regular,
        Koulen_400Regular,
        BebasNeue_400Regular
      });

    if (!fontsLoaded2) {
        return <ActivityIndicator size="large" color="#FE7092" />;
    }


  return (
    <View  style={completed ? styles.container2 : styles.container1} key={_id}>

                  
                    <View style={styles.cont_name_view} key={_id}>
                      {
                        completed ?
                        <Image style={styles.point} source={require("../../assets/PointGREEN.png")} />
                        :
                        <Image style={styles.point} source={require("../../assets/pointsRED.png")} />
                      }
                      <Text style={styles.textDate}>{title}</Text>
                    </View>
                    <View style={styles.cont_name_view}>
                      <Image style={styles.point} source={require("../../assets/arrow.png")} /><Text style={styles.textName}>{description}</Text>
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
                      backgroundColor: '#fff',
                    }}>
                      <TouchableHighlight  onPress={() => {taskCompleted(_id)} }>  
                        {
                          completed ?
                          <Image style={styles.ok} source={require("../../assets/ok.png")} />
                          :
                          <Image style={styles.ok} source={require("../../assets/notOk.png")} />
                        }
                      </TouchableHighlight>
                    
                    <View>
                      <TouchableHighlight  onPress={() => deleteTask(_id) }>  
                          <Image style={styles.dump}  source={require("../../assets/eliminar.png")} />
                      </TouchableHighlight>
                    </View>
                    </View>
                </View>
                
                </View>
  )
}
