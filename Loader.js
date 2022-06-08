import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
    <View style={[ styles.container]}>
        <ActivityIndicator size="large" color="#FE7092" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    width: '100%',
    marginTop: '70%'
  }
});
