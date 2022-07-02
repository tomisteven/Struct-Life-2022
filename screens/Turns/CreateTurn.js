import React, {
    useState, useEffect
} from 'react'
import { View, Button, StyleSheet, TextInput, ScrollView,Text, Image, ImageBackground, ActivityIndicator} from 'react-native'
import {
    useFonts
} from '@expo-google-fonts/inter';
import confg from "../../congiruracionGlobal"

import { TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';




export default function CreateTurns(props) {
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [turn, setTurn] = useState({});

    const handleTextChange = (key, value) => {
        setTurn({
            ...turn, [key]: value
        })
        console.log(turn);
    }
    let [fontsLoaded] = useFonts({
        pointOne: require('../../assets/PoiretOne-Regular.ttf')
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
        console.log(turn);
        
    }
    
    const createNewTurn = async () => {
            try {
            const _turn = await fetch(confg.url + "/api/turns/newturn", {
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
            
            const response = await _turn.json()
            
            if (response) {
                alert("Turno creado")
                props.navigation.navigate('Lista de turnos')
            }
            } catch (error) {
                alert("Error al crear el turno")
                console.log(error)
            }

        }
        const clearInputs = () => {
            setTurn({
                ...turn,
                title: "",
                description: "",
                TurnDate: "",
                TurnTime: ""
            })
        }

        const [isLoading, setIsLoading] = useState(false);
        
        
        const image = "../../assets/backturns.jpg"

        
        const styles = StyleSheet.create({
            container : {
                flex: 1,
                height: "100%",
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
        
            },
            turns_container_title: {
                width: '100%',
                height: '7%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '25%',
                
                borderRadius: 20,
                
            },
            title_turns: {
                fontSize: 50,
                color: '#fff',
                fontFamily: 'Rampart',
            },
            cont_input_title: {
                marginTop: '15%',
                width: '95%',
                height: '17%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 1,
            },
            input_title:{
                width: '85%',
                height: '30%',
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingLeft: '5%',
                fontSize: 20,
                color: '#000',
        
            },
            icon_description: {
                width: 30,
                height: 30,
                marginLeft: '5%',
                marginRight: '5%',
            },
            cont_input_description:{
                position: 'relative',
                marginTop: '-10%',
                width: '95%',
                height: '17%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 1,
            },
            input_description:{
                width: '85%',
                height: '30%',
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingLeft: '5%',
                fontSize: 20,
                color: '#000'
            },
            cont_datapicker: {
                position: 'relative',
                marginTop: '-10%',
                width: '100%',
                height: '15%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 1,
                
            },
            icon_calendar: {
                width: 35,
                height: 35,
                marginRight: '24%',
            },  
            calendar:{
                position: 'relative',
                left: '-50%',
                width: '30%',
                height: '100%',
                
            },
            calendarTime:{
                width: '30%',
                height: '100%',
                position: 'relative',
                left: '-70%',
            },
            cont_buttons_actions: {
                width: '100%',
                height: '35%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
               
                
            },
            button_back: {
                marginBottom: '10%',
            },
            img_back: {
                width: 55,
                height: 55,
            },
            button_send: {
                marginBottom: '10%',
            },
            img_send: {
                width: 95,
                height: 95,
            },
            button_clear: {
                marginBottom: '10%',
            },
            img_clear: {
                width: 55,
                height: 55,
            },
        
        
        
        })    

        
    return (
        <View style={styles.container}>
            {
                isLoading ? 
                <View  style={styles.loader}>
                    <ActivityIndicator size="large" color="#FE7092" />
                </View>
                :
                <ImageBackground resizeMode="cover" source={require(image)} style={{
                    width: '100%',
                    height: '100%',
                }} > 
                    <View style={styles.turns_container_title}>
                        <Text style={styles.title_turns}>Crear Turno..</Text> 
                    </View>
                    <View style={styles.cont_input_title}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_title}  placeholder="Titulo" placeholderTextColor={"#9E9E9E"} onChangeText={ (value) =>handleTextChange("title", value)} value={turn.title} />
                    </View>
                    <View style={styles.cont_input_description}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_description} placeholderTextColor={"#9E9E9E"}  placeholder="Descripcion" onChangeText={ (value) =>handleTextChange("description", value)} value={turn.description} />
                    </View>
                    <View style={styles.cont_datapicker}>
                        <Image source={require('../../assets/calendar.png')} style={styles.icon_calendar} />
                        <DateTimePicker style={styles.calendar} is24Hour={true} display='default' onChange={onChange} mode="date" value={date} />
                        <DateTimePicker textColor='#fff' style={styles.calendarTime} onChange={onChange} mode="time" value={date} />
                    </View>
                    <View style={styles.cont_buttons_actions}>
                        <TouchableHighlight style={styles.button_back} onPress={() => props.navigation.navigate('Lista de turnos')}>
                            <Image source={require('../../assets/goback.png')} style={styles.img_back} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button_send} onPress={createNewTurn}>
                            <Image source={require('../../assets/send.png')} style={styles.img_send} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button_clear} onPress={clearInputs}>
                            <Image source={require('../../assets/limpiartask.png')} style={styles.img_clear} />
                        </TouchableHighlight>
                    </View>
                </ImageBackground> 
            }

        
    </View>
  )
}

 





/* <View style={styles.contInput}>
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
                <Image style={styles.dump}  source={require("../../assets/calendarEnviar.png")} />
            </TouchableHighlight>
        </View>
        
        </View> */