import React, {useState} from 'react'
import { View, Button, StyleSheet, TextInput, ScrollView,Text, Image, ImageBackground, ActivityIndicator, TouchableHighlight} from 'react-native'
import confg from '../../congiruracionGlobal'

const CreateIdea = (props) => {

    const {url} = confg


    const [idea, setIdea] = useState({
        title: '',
        description: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleTextChange = (key, value) => {
        setIdea({
            ...idea, [key]: value 
        })
        console.log(idea);
    }

    const createNewIdea = async () => {
        try {
            
        const _idea = await fetch(url + "/api/ideas/newidea", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: idea.title,
                description: idea.description,
            })
        })
            await _idea.json()
            alert("Idea creada")
            props.navigation.navigate('Lista de turnos')
        
            
        } catch (error) {
            console.log(error);
        }
    }

    const clearInputs = () => {
        setIdea({
            title: '',
            description: ''
        })
    }

    const image = "../../assets/backidea.jpg"

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
            height: '45%',
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
                        <Text style={styles.title_turns}>Crear Idea..</Text> 
                    </View>
                    <View style={styles.cont_input_title}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_title}  placeholder="Titulo" placeholderTextColor={"#9E9E9E"} onChangeText={ (value) =>handleTextChange("title", value)} value={idea.title} />
                    </View>
                    <View style={styles.cont_input_description}>
                        <Image source={require('../../assets/title.png')} style={styles.icon_description} />
                        <TextInput style={styles.input_description} placeholderTextColor={"#9E9E9E"}  placeholder="Descripcion" onChangeText={ (value) =>handleTextChange("description", value)} value={idea.description} />
                    </View>
                    <View style={styles.cont_buttons_actions}>
                        <TouchableHighlight style={styles.button_back} onPress={() => props.navigation.navigate('Lista de turnos')}>
                            <Image source={require('../../assets/goback.png')} style={styles.img_back} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button_send} onPress={createNewIdea}>
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

export default CreateIdea