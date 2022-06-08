import React, {
    useState,
    useEffect
} from 'react'
import { Text, View, StyleSheet ,TouchableHighlight, Image, ActivityIndicator, ScrollView, ProgressBarAndroidComponent } from 'react-native'
//import * as Progress from 'react-native-progress';

import ProgressBar from 'react-native-progress/Bar';
import {
  useFonts
} from '@expo-google-fonts/inter';

import confg from "../../congiruracionGlobal"


export default function StudyList() {
  
    const [fontsLoaded] = useFonts({ 
      'Koulen' : require('../../assets/Koulen.ttf')
    });



  const {url} = confg

    const [study, setStudy] = useState({
        loading: true,
        data: []
    })

    const getStudys = async () => {
      try {
        const study =  await fetch(`${url}/api/studies`, {	
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
          })
        const _data = await study.json()
  
        setStudy({
          loading: false,
          data: _data.studies
        })
      } catch (error) {
        console.log(error);
      }
    }

    console.log(study);

    useEffect(() => {
        getStudys()
    }, [])


    const styles = StyleSheet.create({
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
        alignItems: "center",
        marginTop: '40%'
      },
      cont_userlist:{
        backgroundColor: "#fff3",
        height: "auto",
        borderRadius: 20,
        marginTop: 10,
        marginLeft : 10,
        marginRight: 10,
        paddingBottom: 20,
        marginBottom: 80,
        shadowColor: "#000",
        shadowOffset: {
          width: 0.3,
          height: 2,
        },
        shadowOpacity: 0.50,
          shadowRadius: 4.50,
          elevation: 3,
    },
    cont_study_item:{
      width: '95%',
      height: 130,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
        width: 0.3,
        height: 2,
        
    }
    
    
    },
    img_study_item:{  
      width: '25%',
      height: '80%',
      margin: 10,
    }, 
    img_study: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
    },
    item_suty_info:{
      width: '62%',
      height: '100%',
      marginLeft: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 10,
    
    },
    view_item_study_materia:{
      width: '100%',
      backgroundColor: '#FFD27B',
      padding: 1,
      borderRadius: 20,
      textAlign: 'center',
      marginBottom: 10,
      },
      item_study_materia:{
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Koulen',
        fontWeight: "400",

      },
      item_study_tiempo:{
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
        fontFamily: 'Rampart',
      },
    
      porcentaje_info:{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        height: 10,
        margin: 10
      },
      item_study_porcentaje:{
        fontSize: 13,
        textAlign: 'center',
        color: '#0066FF',
        marginLeft: 20,
        bottom:  3,
        height: 20,
      }
      
    })

  return (
    <>
      <View>
        <Text style={study.loading ? styles.noVisible : styles.textPresentation}>
          Lista de <Text style={{color: "#f4a261"}}>Estudio</Text>
        </Text>
      </View>

      <ScrollView >


          <View style={study.loading ? styles.loader : styles.cont_userlist}>
            {
              study.loading ? 
                  <View  style={styles.loader}>
                    <ActivityIndicator size="large" color="#FE7092" />
                  </View>
                  :
                  study.data.map((item) => (
                    <View key={item._id} style={styles.cont_study_item}>
                      <View style={styles.img_study_item}>
                        <Image source={require("../../assets/studyList.png")} style={styles.img_study}/>
                      </View>
                      <View style={styles.item_suty_info}>
                        <View style={styles.view_item_study_materia}>
                          <Text style={styles.item_study_materia}>{item.materia}</Text>
                        </View>
                        <Text style={styles.item_study_tiempo}>Tiempo estimado: {item.tiempoEstimado} Dias</Text>
                        <View style={styles.porcentaje_info}>
                            <ProgressBar progress={item.porcentajeAvance / 100} height={8} borderColor={"transparent"} unfilledColor={"#84BDFF"} width={180} />
                            <Text style={styles.item_study_porcentaje}>{item.porcentajeAvance}%</Text>
                        </View>
                      </View>
                    </View>
                  ))
            }
          </View>

      </ScrollView>


    </>
  )
}