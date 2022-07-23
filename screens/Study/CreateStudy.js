import React, {
    useState
} from 'react'
import {View, Button, StyleSheet, TextInput,Text, Image, ImageBackground, ActivityIndicator} from 'react-native'
import { SliderPicker } from 'react-native-slider-picker';
import{
    Koulen_400Regular,
    useFonts
  } from "@expo-google-fonts/koulen"
  import confg from "../../congiruracionGlobal"
  
import { TouchableHighlight } from 'react-native';



export default function CreateStudy(props) {


    let [fontsLoaded] = useFonts({
        Koulen_400Regular
      });
      
       

    const [states, setState] = useState({
        materia: '',
        tiempoEstimado: "",
        porcentajeAvance: 0,
        finalizado: false
    })
    
    const [isLoading, setIsLoading] = useState(false);
    
    const {url} = confg
    
    const handleTextChange = (key, value) => {
        setState({
            ...states, [key]: value
        })
        console.log(states);
    }

    const createNewStudy = async () => {

        
        if(states.materia === "" || states.tiempoEstimado === "" ){
            alert("Debes completar todos los campos")
        }
        else{
            try {
                setIsLoading(true);
                const study = await fetch(url + "/api/studies/newStudy", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        materia: states.materia,
                        tiempoEstimado: states.tiempoEstimado,
                        porcentajeAvance: states.porcentajeAvance,
                        finalizado: states.finalizado
                    })
                })
                await study.json() 
                
                setIsLoading(false);
                
                
                props.navigation.navigate('Lista de estudios')
                
            } catch (error) {
                alert("Error al crear el usuario")
                console.log(error)
            }
        
        
        }

    }
    const clearInputs = () => {
        setState({
            materia: '',
            tiempoEstimado: '',
            porcentajeAvance: 0,
            finalizado: false
        })
    }

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
            marginTop: '23%',
            
            borderRadius: 20,
            
        },
        title_turns: {
            fontSize: 50,
            color: '#fff',
            fontFamily: 'Rampart',
        },
        cont_input_title: {
            
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
            marginTop: '-15%',
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
            height: '26%',
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
        cont_picker: {
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            
        },
        text_picker: {
            fontSize: 20,
            color: '#fff',
            fontFamily: "Koulen_400Regular",
            marginRight: '5%',
            marginBottom: '10%',
            backgroundColor: '#000',
            
            marginTop: '14%',
            marginLeft: '5%',
            paddingLeft: '10%',
            paddingRight: '10%',
        }
       ,
       cont_input_porcent:{
        marginTop: 20,
        height: 80,
        width:80,
        borderRadius: 60,
        marginLeft:"auto",
        marginRight:"auto",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
       },
       text_porcent:{
        fontSize: 35,
        color: '#fff',
        fontFamily: "Koulen_400Regular",
        letterSpacing: 1,
       }
    
    }) 
    
    const image = "../../assets/567.jpg"

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
                        <Text style={styles.title_turns}>Crear Estudio..</Text> 
                    </View>
                    <View style={[styles.cont_input_description, {marginTop:5, marginBottom:25}]}>
                        <Text style={styles.text_picker}>Porcentaje de aprendizaje</Text>
                        <View style={styles.cont_input_porcent}>
                            <Text style={styles.text_porcent}>{states.porcentajeAvance}%</Text>
                        </View> 
                    </View>
                    <View style={styles.cont_input_description}>
                        <Image source={require('../../assets/title.png')} style={[styles.icon_description, {marginTop:20}]} />
                        <View style={styles.cont_picker}>
                            
                        <SliderPicker 
                            minLabel={'0'}
                            midLabel={'50'}
                            maxLabel={'100'}
                            maxValue={100}
                            callback={position => {
                                setState({
                                    ...states,
                                    porcentajeAvance: position
                                })
                            }}
                            
                            showSeparatorScale={true}
                            labelFontColor={"#fff"}
                            labelFontSize={18}
                            labelFontWeight={'500'}
                            showFill={true}
                            fillColor={'red'}
                            showNumberScale={true}
                            defaultValue={0}
                            buttonBackgroundColor={'#fff'}
                            buttonBorderColor={"#fff"}
                            buttonBorderWidth={0.5}
                            scaleNumberFontWeight={'300'}
                            buttonDimensionsPercentage={5}
                            heightPercentage={0.5}
                            widthPercentage={75}
                        />
                    </View>
                       
                      

                    </View>
                    
                    <View style={styles.cont_input_title}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_title}  placeholder="Materia / Tecnologia" placeholderTextColor={"#9E9E9E"} onChangeText={ (value) =>handleTextChange("materia", value)} value={states.materia} />
                    </View>
                    <View style={styles.cont_input_description}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_description} placeholderTextColor={"#9E9E9E"}  placeholder="Tiempo Estimado a terminar" onChangeText={ (value) =>handleTextChange("tiempoEstimado", value)} value={states.tiempoEstimado} />
                    </View>
                    

                    <View style={styles.cont_buttons_actions}>
                        <TouchableHighlight style={styles.button_back} onPress={() => props.navigation.navigate('Lista de turnos')}>
                            <Image source={require('../../assets/goback.png')} style={styles.img_back} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button_send} onPress={createNewStudy}>
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
