import {
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { VendedorScreen } from './screens/vendedor.js'
import { VentaScreen } from './screens/ventas.js';
import { ListaScreen } from './screens/lista.js';
import { useEffect } from 'react';
import {clearDatabase} from './initialized.js'

const Tab = createBottomTabNavigator();

const VendedorScreenTab =()=> <VendedorScreen styles={styles} />
const VentaScreenTab = () => <VentaScreen styles={styles} />
const ListaScreenTab = () => <ListaScreen styles={styles} />  
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Vendedor" component={VendedorScreenTab} />
      <Tab.Screen name="Ventas" component={VentaScreenTab} />
      <Tab.Screen name="Lista" component={ListaScreenTab} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    clearDatabase()
      .then(res => console.log(res))
      .catch(error => console.log(error))
    console.log('app');
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: "Sistema De Ventas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center'
  },
  buttons: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginBottom: 10,
    width: 200,
  },
  inputs: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    marginTop: 5,
    textAlign: "center",
    padding: 5,
    width: 200,
    color: 'black',
    backgroundColor: 'white',
    height:30
  },
});