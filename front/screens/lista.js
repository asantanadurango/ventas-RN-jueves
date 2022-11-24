import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

export function ListaScreen({ styles }) {
  const [id, setId] = useState({id:localStorage.getItem('_id')});
  const [lista, setLista] = useState(null)

  const getLista = async (id) => {
  try {
    const req = await fetch(`http://localhost:8080/api/sales/${id}`)
      
    const res = await req.json()
    console.log(res)
      
    if (res.error) {
      alert(res.message)
      return;
    }

    alert(res.message)
    // localStorage.setItem('_id', res._id)
    setLista(res)
  } catch (error) {
    console.log(error);
    console.log('Error inesperado');
    throw new (error)
  }      
};


useEffect(() => {
  setId({ id: localStorage.getItem('_id') })
  getLista(localStorage.getItem('_id'))
  console.log(lista);
}, [])

  return (
    <View style={styles.container}>
      {
        lista ? (
          <View
          style={{
            flex: 1,
            padding: 24,
            justifyContent: "center",
            alignItems: "center",
            textAlign:'center'
          }}
          >
          <Text>La lista existe</Text>
          <Text>{lista.name}</Text>
          <View style={{ marginBottom: 10 }}>
            {lista.sales.map((obj) => (
              <View key={obj._id} style={{
                borderBottomColor: "black",
              borderBottomWidth:5}}>
              <Text>
                total: {obj.total}
                </Text>
                <Text>
                zone: {obj.zone}
              </Text>
              </View>

            ))}
          </View>
          </View> 
        ) : (
          <View>
            <Text>No hay resultados para mostrar</Text>
          </View>
        )
      }
    </View>
  );
}




//  <View
// style={{
//   flex: 1,
//   padding: 24,
//   justifyContent: "center",
//   alignItems: "center",
//   textAlign:'center'
// }}
// >
// <Text>{lista.name}</Text>
// <View style={{ marginBottom: 10 }}>
//   {lista.sales.map((obj) => (
//     <View key={obj._id}>
//     <Text>
//       total: {obj.total}
//       </Text>
//       <Text>
//       zone: {obj.zone}
//     </Text>
//     </View>
//   ))}
// </View>
// </View> 