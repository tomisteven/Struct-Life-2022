import React,{useState, useEffect} from 'react'
import { Text, View, Button, TextInput, ActivityIndicator, StyleSheet, Image, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native'
import{
  Koulen_400Regular,
  useFonts
} from "@expo-google-fonts/koulen"
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import confg from '../../congiruracionGlobal'
import PanelIdea from '../Ideas/PanelIdea';

export default function ListCompras(props) {
    const {url} = confg

    const [fontsLoaded] = useFonts({ 
      Koulen_400Regular
    });

  const [compras, setCompras] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tamaño, setTamaño] = useState(0)
  const [items, setItems] = useState({
    product: '',
    cantidad: '',
  })

  const getCompras = async () => {
    try {
      setIsLoading(true)
      const compras = await fetch(url + "/api/compras", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const comprasJson = await compras.json()
      
      setCompras(comprasJson)
      setIsLoading(false)
      setTamaño(comprasJson.length)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCompra = async (id) => {
    try {
      //alerta en ios
      Alert.alert(
        'Eliminar Idea',
        '¿Estas seguro de eliminar esta Compra?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Eliminar', onPress: async () => {
            setIsLoading(true)
            const idea =  await fetch(`${url}/api/compras/deletecompra/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
            await idea.json()
            getCompras()
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


   const deleteItemCompra = async (idCompra, idItem) => {
    try{
      setIsLoading(true)
      const itemCompra = await fetch(url + "/api/compras/newCompra/" + idCompra + "/delitem/" + idItem, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      await itemCompra.json()
      getCompras()
      setIsLoading(false)
      alert("Item eliminado")
    }catch(error){
      console.log(error)
    }

  } 

  const addItemCompra = async (idCompra) => {

    try{
      console.log(items, idCompra);
      setIsLoading(true)
      const itemCompra = await fetch(url + "/api/compras/newCompra/additem/" + idCompra, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'acept': 'application/json',
        },
        body: JSON.stringify({
          product: items.product,
          cantidad: items.cantidad,
        })
      })
      await itemCompra.json()
      getCompras()
      setIsLoading(false)
      alert("Item agregado")
    }catch(error){
      console.log(error)
    }

  }

  const onChangeText = (key, value) => {
    setItems({
      ...items, [key]: value
    })
  }

  

  useEffect(() => {
    getCompras()
  }, [])

  const styles = StyleSheet.create({
    scroll_card: {
      backgroundColor: '#E2E2E2',
      display: 'flex',
      flexDirection: 'column',
      width: '99%',
      height: 100,
      borderRadius: 20,
      marginBottom: '40%',
      marginTop: '5%',

    },
    container: {
      width: '100%',
      height: '103%',
      flexDirection: 'column',
      marginTop: '5%',
      marginBottom: '3%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      
    },
    text_compras: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#000',
      marginTop: '5%',
      marginBottom: '5%',
      
      textAlign: 'center',
      fontFamily: 'Rampart',
    },

    container_compra: {
      
      borderRadius:20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '98%',
      height: 300,
      marginBottom: '5%',
      alignItems: 'center',
      backgroundColor: '#fff',
      
      
    },
    container_add_item: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '37%',
      height: 290,
      borderRadius: 20,
      marginRight: '1%',
      backgroundColor: '#fff',
    },
    text_add_item: {
      fontSize: 19,
      fontWeight: 'bold',
      color: '#000',
      fontFamily: 'Koulen_400Regular',
      textAlign: 'center',
    },
    text_delete_item: {
      fontSize: 19,
      fontWeight: 'bold',
      color: '#fff',
      letterSpacing: 1,
      fontFamily: 'Koulen_400Regular',
      textAlign: 'center',
    },
    container_items: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '60%',
      height: 290,
      borderRadius: 20,
      padding: '2%',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      
    },
    container_form_item: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',  
      width: '98%',
      height: 150,
      borderRadius: 20,
      
    },
    container_item_info:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '99%',
      height: 35,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#fff',
      marginBottom: '3%',
      borderRadius: 20,
    },
    inputCompras: {
            width: '99%',
            height: '25%',
            backgroundColor: '#e1e1e1',
            borderRadius: 10,
            paddingLeft: '5%',
            marginBottom: '5%',
            fontSize: 15,
            color: '#000',
            
    },
    viewAdd: {
      width: '100%',
    },


    //items
    image_item: {
      width: '10%',
      marginTop: '2%',
    },
    text_item: {
      
      fontSize: 13,
      fontWeight: 'bold',
      marginTop: '4%',
    }
    ,
    container_item_cantidad: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '15%',
      height: 25,
      marginTop: '2%',
      backgroundColor: '#e1e1e1',
      borderRadius: 50,
      alignItems: 'center',
    },
    cont_text_actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '10%',
      marginTop: '2%',
    },

  })

  return (  
    <>
      {
        isLoading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <View style={styles.container}>
            <Text style={styles.text_compras}>Lista de <Text style={{
              fontSize: 40,
              color: "#FF9441"
            }}>Compras</Text></Text>
          <ScrollView style={styles.scroll_card}>
            <View style={{alignItems:"center", marginTop:15}}>
            {
              compras.map((compra, index) => {
                return (
                <View key={compra._id} style={styles.container_compra}>
                  <View style={styles.container_add_item}>
                    <View style={{backgroundColor:"#FFCA63", borderRadius:15, width:"94%", marginTop: '5%', height:35, display:"flex", justifyContent:"center"}}>
                      <Text style={styles.text_add_item}>{compra.nombre}</Text>
                    </View>
                    <View style={styles.container_form_item}>
                        <TextInput maxLength={20}  placeholderTextColor={"#737373"} style={styles.inputCompras}  onChangeText={(value)=> onChangeText("product", value)} placeholder="Item" />
                        <TextInput keyboardType='number-pad' placeholderTextColor={"#737373"}  style={styles.inputCompras} onChangeText={(value)=> onChangeText("cantidad", value)} placeholder="Cantidad" />
                    </View>
                    <LinearGradient start={{x:0.9, y:1.1}} style={{
                      width: '80%',
                      borderRadius: 18,
                      marginBottom: '5%',
                    }}  colors={[  '#A39ADD', '#E9C3C0']}>
                      <TouchableOpacity style={styles.viewAdd} onPress={()=> addItemCompra(compra._id)}>
                        <Text style={styles.text_add_item}>Agregar</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{x:0.9, y:1.1}} style={{
                      width: '95%',
                      borderRadius: 18,
                      marginBottom: '5%',
                    }}  colors={[  '#FF675C', '#FF0000']}>
                      <TouchableOpacity style={styles.viewAdd} onPress={()=> deleteCompra(compra._id)}>
                        <Text style={styles.text_delete_item}>Eliminar</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                  <View style={styles.container_items}>
                    {
                      compra.items.length > 0 ? 
                      <ScrollView style={{
                        width: '100%',
                      }} scrollsToTop={"false"} showsHorizontalScrollIndicator={"false"} horizontal={"false"}>
                      {
                      compra.items.map((item, index) => {
                        return (
                        <View key={item._id} style={styles.container_item_info}>
                          <Image source={require('../../assets/star.png')} style={styles.image_item} />
                          <Text style={styles.text_item}>{item.product}</Text>
                          <View style={styles.container_item_cantidad}>
                            <Text style={styles.text_item}>{item.cantidad}</Text>
                          </View>
                          <TouchableHighlight underlayColor={"transparent"} style={styles.cont_text_actions} onPress={() => {deleteItemCompra(compra._id, item._id)}}>
                              <Image source={require("../../assets/deleteItem.png")} style={styles.img_delete}/>
                          </TouchableHighlight>
                        </View>
                        )
                      })
                    }
                      </ScrollView>
                      :
                      <Text style={styles.text_item}>No hay items</Text>
                    }
                  </View>
                </View>
                )
            })
          }
          </View>
        </ScrollView>
        <PanelIdea tamaño={tamaño} margBottom={67} url="crear compra" props={props} />
        </View>
      }
    </>
  )
}
