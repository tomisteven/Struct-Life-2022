import React, {
    useState
} from 'react'
import { View, Button, StyleSheet, TextInput, ScrollView,Text, Image} from 'react-native'

import {
    useFonts
  } from '@expo-google-fonts/inter';
  import confg from "../../congiruracionGlobal"
  
import { TouchableHighlight } from 'react-native';


export default function CreateTasks(props) {

    let [fontsLoaded] = useFonts({
        Rampart: require('../../assets/RampartOne-Regular.ttf')
      });
        let [fontsLoaded2] = useFonts({
            
        PoiretOne: require('../../assets/PoiretOne-Regular.ttf')
            
        });

        

    const [states, setName] = useState({
        title: '',
        description: ''
    })
    
    const {url} = confg
    
    const handleTextChange = (key, value) => {
        setName({
            ...states, [key]: value 
        })
    }

    const createNewUser = async () => {
        
        if(states.title === "" || states.description === ""){
            alert("Debes completar todos los campos")
        }
        else{
            try {
                const task = await fetch(url + "/api/tasks/newtask", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: states.title,
                        description: states.description,
                    })
                })
                await task.json() 
                
                alert("Tarea creada")
                
                props.navigation.navigate('Lista de tareas')

                
                
            } catch (error) {
                alert("Error al crear el usuario")
                console.log(error)
            }
        
        
        }

    }

  return (
    <View style={[styles.container, {flexDirection:"column"}]}>
        <View style={styles.titleCont}>
            <Text style={styles.title}>Crear <Text style={{color:"#ff9292"}}>Tarea..</Text></Text> 
        </View>
        <View style={styles.contInput}>
            <Text style={styles.titleInputs}>Titulo de la tarea..</Text>
            <TextInput style={styles.inputGroup} placeholderTextColor={"#fff"} placeholder="Titulo" onChangeText={ (value) =>handleTextChange("title", value)} />
            <Text style={styles.titleInputs}>Descripcion..</Text>
            <TextInput style={styles.inputGroup} placeholderTextColor={"#fff"} placeholder="Descripcion" onChangeText={ (value) =>handleTextChange("description", value)} />
        <View style={styles.inputSave}>
            <Button title="Guardar" color={"#000"} backgroundColor={"#ffebee"} onPress={createNewUser} />
            {/* <Text style={styles.buttonText}>Guardar</Text> */}
            <TouchableHighlight underlayColor={"transparent"} style={styles.contEnviar} onPress={createNewUser}>  
                <Image style={styles.dump}  source={require("../../assets/enviar2.png")} />
            </TouchableHighlight>
        </View>
        
        </View>

        <View style={styles.container}>
            <TouchableHighlight underlayColor={"transparent"} onPress={() => props.navigation.navigate('inicio')}>
                <Image source={require('../../assets/back2.png')} style={styles.back} />
            </TouchableHighlight>

        </View>
    </View>   
  )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffebee',
        flexDirection: 'column',
        justifyContent: 'center',
        
    },
    back: {
        marginTop: 180,
        
    }
    ,
    titleCont: {
        marginTop: 65,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 85,

    },
    title: {
        fontSize: 50,
        color: '#000',
        fontFamily: 'Rampart',
    }
    ,
    contInput: {
        display: 'flex',
        height: "45%",
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        backgroundColor: '#ffcdd2',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1.50,
        shadowRadius:1, 
        elevation: 5,
    }
    ,
    inputGroup: {
        width: "90%",
        height: "12%",
        backgroundColor: '#fff',
        marginTop: 25,

        marginBottom: 15,
        marginLeft: 20  ,
        padding: 20,
        borderRadius: 10,
        padding: 10,
        color: '#000',
        

        shadowColor: "#000",
        shadowOffset: {
            width: 0.3,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1.50, 
        
    }, 
    titleInputs: {
        fontSize: 25,
        letterSpacing: 1,
        fontFamily: 'PoiretOne',
        fontStyle: 'italic',

        marginLeft: 20,
        marginTop: 10,
        
    },
    text: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    
    },
    buttonText:{
        fontSize: 25, 
        letterSpacing: 1, 
        marginTop: 5,
        color: '#000',
        textAlign: 'center',
        fontFamily: "PoiretOne",
    },
    inputSave: {
        flexDirection: 'row',
        backgroundColor: '#ffb2b2',
        padding: 15,
        textDecorationColor: '#fff',
        width: "50%",
        marginLeft: 95,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
       justifyContent: "space-around",

        shadowColor: "#fff",
        shadowOffset: {
            width: 0.1,
            height: 0.5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.50, 
        elevation: 5,

    },
    contEnviar: {
        marginTop: 5,
        textAlign: 'center',
        alignItems: 'center',   
        justifyContent: 'space-around',

    }
})