import React, { useEffect, useState} from 'react'
import { Text, View} from 'react-native'

export default function Notificaciones({color, req}) {

  const url = "https://struclife-db.herokuapp.com"

  const [data, setData] = useState([])

  const request = async () => {
    const response = await fetch(`${url}${req}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      })

      const json = await response.json();
      setData(json)
  }
  
  useEffect(() => {
    request()
  }
  ,[data])


  return (
    <View style={{
        width:30,
        height:30,
        position: "relative",
        backgroundColor: color,
        borderRadius: 25,
        alignItems: "center",
        left: "92%",
        bottom: "16r%",
        display: "flex",
        justifyContent: "center",
      }}>
        <Text style={{color:"#fff", fontSize:18}}>
            {
              data.length || 0
            }
        </Text>
      </View>
  )
}
