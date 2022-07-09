import React, {
    useState,
    useEffect,
} from 'react'
import { Text, View, StyleSheet ,TouchableHighlight, Image, ActivityIndicator, ScrollView} from 'react-native'
import { Alert } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
import {Svg} from "react-native-svg"
import confg from "../../congiruracionGlobal"
import PanelStudy from './PanelStudy';
import{
  Koulen_400Regular,
  useFonts
} from "@expo-google-fonts/koulen"

export default function StudyList({data, _url}) {

    const [study, setStudy] = useState({
      data: [],
    })
    const [suma_, setSuma] = useState(0)
    const [isLoading, setLoading] = useState(true)
  
    const {url} = confg
    const [fontsLoaded] = useFonts({ 
      Koulen_400Regular
    });

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
          data: _data.studies,
        })
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    const deleteStudy = async (id) => {
      try {
        //alerta en ios
        Alert.alert(
          'Eliminar estudio',
          '¿Estas seguro de eliminar este estudio?',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Eliminar', onPress: async () => {
              setLoading(true)
              const study =  await fetch(`${url}/api/studies/deletestudy/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
              await study.json()
              setTimeout(() => {
                setLoading(false)
              }, 500);
            }},

          ],
          {cancelable: false},
        );
      } catch (error) {
        console.log(error);
      }
    }

    const editPorcent_5 = async (id, number) => {
      try {
        setLoading(true)
        const study =  await fetch(`${url}/api/studies/editstudy/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            porcentajeAvance: number
        }
        )})
        await study.json()
        setLoading(false)
        getStudys()

      }
      catch (error) {
        console.log(error);
      }


    }

    const sumarPromedio = async () => {
      let suma = 0;
      study.data.forEach(element => {
        suma += element.porcentajeAvance;
      }
      )
      suma = Math.floor(suma / study.data.length);
      setSuma(suma)
    }

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
      height: 150,
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
        fontFamily: 'Koulen_400Regular',
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
      },
      opacity:{
        opacity: 0.5
      },
      noOpacity:{
        opacity: 1
      },
      actions:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
      },
      text_action:{
        fontSize: 15,
        
        
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 40,
        shadowColor: "#000",
      shadowOffset: {
        width: 0.7,
        height: 2,
        
    }
      },

      img_delete:{
        width: 20,
        height: 20
      }
      
      
    })

  return (
    <>
      <View>
        <Text style={ isLoading ? styles.noVisible : styles.textPresentation}>
          Lista de <Text style={{color: "#f4a261"}}>Estudio</Text>
        </Text>
      </View>

      <ScrollView >

          <View style={ isLoading ? styles.loader : styles.cont_userlist}>
            {
              isLoading ? 
                  <View  style={styles.loader}>
                    <ActivityIndicator size="large" color="#FE7092" />
                  </View>
                  :
                  study.data.map((item) => (
                    <View key={item._id} style={styles.cont_study_item}>
                      <View style={styles.img_study_item}>
                        {
                          item.porcentajeAvance != 100 ?
                          <Image source={require("../../assets/studyList.png")} style={styles.img_study}/>
                          :
                          <Image source={require("../../assets/Finalizado!.png")} style={styles.img_study}/>
                        }
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
                        <View style={styles.actions}>
                        
                          <TouchableHighlight underlayColor={"transparent"} style={styles.cont_text_actions} onPress={() => {
                            editPorcent_5(item._id, item.porcentajeAvance-5);
                          } }>
                            <Image source={require("../../assets/bajar.png")} style={styles.img_delete}/>
                          </TouchableHighlight>
                          <TouchableHighlight underlayColor={"transparent"} style={styles.cont_text_actions} onPress={() => {
                            editPorcent_5(item._id, item.porcentajeAvance+5);
                          } }>
                            <Image source={require("../../assets/subir.png")} style={styles.img_delete}/>
                          </TouchableHighlight>

                          <TouchableHighlight underlayColor={"transparent"} style={styles.cont_text_actions} onPress={() => {
                            deleteStudy(item._id);
                            
                          } }>
                            <Image source={require("../../assets/eliminar.png")} style={styles.img_delete}/>
                          </TouchableHighlight>
                        </View>
                            

                      </View>
                    

                    </View>


                  ))
            }

          </View>

      </ScrollView>
       <PanelStudy data={study} _url="crear estudio"/> 
    </>
  )
}

{/*  */}


{/* <View style={styles.cont_actions_buttons}>
  <View style={styles.container_task_complete}>
    <Image style={styles.task_complete_panel} source={require("../../assets/libro-panel.png")} />
    <Text style={styles.tasks_texts_actions}>{
      study.data.length
    }</Text>
  </View>

  <TouchableHighlight underlayColor={"transparent"} style={styles.contTask} onPress={() => props.navigation.navigate(url) }>
    <Image style={styles.newTask}  source={require("../../assets/button.png")} />
  </TouchableHighlight> 

  <View style={styles.container_task_incomplete}>
      <Progress.Circle progress={suma_/100} size={60} width="auto" height="auto"  animated={true} color="#000" ></Progress.Circle>
    
    <Text style={styles.text_circle}>{
      suma_
    }</Text>
  </View>
</View> */}