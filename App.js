import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudyList from './screens/Study/StudyList';
import CreateTasks from './screens/Tasks/Creatasks';
import CreateTurns from './screens/Turns/CreateTurn';
import Inicio from './screens/Inicio';
import TurnList from './screens/Turns/TurnList';
import TaskList from './screens/Tasks/TaskList';
import CreateIdea from './screens/Ideas/CreateIdea';

 

function RoutesCrud() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="inicio" options={{
        headerShown: false
      }} component={Inicio} />
      
      <Stack.Screen name="Lista de tareas" options={{
          headerShown: false,
      }}  style={styles.container_listatareas}  component={TaskList} />


      <Stack.Screen name="Crear Tarea" options={{
          headerShown: false,
      }} component={CreateTasks} /> 

      <Stack.Screen name="crear turnos"  style={styles.container} options={{
          headerShown: false,
      }}  component={CreateTurns} />
      
      <Stack.Screen name="crear idea"  style={styles.container} options={{
          headerShown: false,
      }}  component={CreateIdea} />
      
      <Stack.Screen name="Lista de turnos"  style={styles.container} options={{
          headerShown: false,
      }}  component={TurnList} />

      <Stack.Screen name="Lista de estudios"  style={styles.container} options={{
          headerShown: false,
      }}  component={StudyList} />


    </Stack.Navigator>
  );
}
//stack para navegar entre las pantallas
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <RoutesCrud/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_listatareas: {
    flex: 1,
    margin: 10,
    
    
    alignItems: 'center',
    justifyContent: 'center',
  }
});
