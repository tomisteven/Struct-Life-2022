import React, {
    useState, useEffect
} from 'react'
import { View, Button, StyleSheet, TextInput, ScrollView,Text, Image} from 'react-native'
import {
    useFonts
  } from '@expo-google-fonts/inter';
  import confg from "../congiruracionGlobal"
  
import { TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppLoading from 'expo-app-loading';


export default function CreateTurns(props) {
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [turn, setTurn] = useState({});

    const handleTextChange = (key, value) => {
        setTurn({
            ...turn, [key]: value
        })
        
    }
    let [fontsLoaded] = useFonts({
        pointOne: require('../assets/PoiretOne-Regular.ttf')
    })
    
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let day = tempDate.getDate()
        let month = tempDate.getMonth() + 1
        let year = tempDate.getFullYear()

        

        setTurn({
            ...turn,
            TurnDate: `${year}-${month}-${day}`,
            TurnTime: `${tempDate.getHours()}:${tempDate.getMinutes()}`
        })

        
    }
    console.log(turn);
    const createNewTurn = async () => {
            try {
            const task = await fetch(confg.url + "/api/turns/newturn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...turn, 
                    title: turn.title,
                    description: turn.description
                })
                
                
            })
            console.log(turn);
            const response = await task.json()
            if (response.status === 200) {
                alert("Turno creado")
                props.navigation.navigate('Lista de turnos')
            }
            } catch (error) {
                alert("Error al crear el turno")
                console.log(error)
            }

        }

    

    

    
    
    
    
    
    return (
        <View style={[styles.container, {flexDirection:"column"}]}>
        <View style={styles.titleCont}>
            <Text style={styles.title}>Crear <Text style={{color:"#7e1f81"}}>Turno..</Text></Text> 
        </View>
        <View style={styles.contInput}>
            <Text style={{
                fontFamily: 'Rampart',
                fontSize: 25,
                letterSpacing: 1,
                color: '#000',
                marginLeft: 20,
                marginTop: 10,
            }}>Titulo..</Text>
            <TextInput style={styles.inputGroup}  placeholder="Titulo" onChangeText={ (value) =>handleTextChange("title", value)} />
            <Text style={{
                    fontFamily: 'Rampart',
                    fontSize: 25,
                    letterSpacing: 1,
                    color: '#000',
                    marginLeft: 20,
                    marginTop: 10,
                
            }}>Descripcion..</Text>
            <TextInput style={styles.inputGroup}  placeholder="Descripcion" onChangeText={ (value) =>handleTextChange("description", value)} />

            

            <DateTimePicker style={styles.calendar} is24Hour={true} display='default' onChange={onChange} mode="date" value={date} />

            <DateTimePicker style={styles.calendarTime} onChange={onChange} mode="time" value={date} />



        <View style={styles.inputSave}>
            <Button title="Guardar" color={"#fff"}  backgroundColor={"#ffebee"}         onPress={createNewTurn} />
            
            <TouchableHighlight underlayColor={"transparent"} style={styles.contEnviar} onPress={createNewTurn}>  
                <Image style={styles.dump}  source={require("../assets/calendarEnviar.png")} />
            </TouchableHighlight>
        </View>
        
        </View>

        <View style={styles.container}>
            <TouchableHighlight style={styles.cont_back} underlayColor={"transparent"} onPress={() => props.navigation.navigate('inicio')}>
                <Image source={require('../assets/back2.png')} style={styles.back} />
            </TouchableHighlight>

        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 15,
        backgroundColor: '#EBE4F1',
        flexDirection: 'column',
        justifyContent: 'center',
        
    },
    back: {
        marginTop: 40,
        
    },
    calendar: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        marginRight: 125,
    },
    calendarTime: {
        marginRight: 145,
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
        height: "60%",
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        backgroundColor: '#c992c9',
        opacity: 0.8,
        borderRadius: 20,
        
    }
    ,
    inputGroup: {
        width: "90%",
        height: "8%",
        backgroundColor: '#fff',
        marginTop: 25,
        fontFamily: 'pointOne',
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
    
    text: {
        marginTop: 200,
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
        backgroundColor: '#A563AB',
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

