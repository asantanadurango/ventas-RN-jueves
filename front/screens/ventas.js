import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
import { useEffect, useState } from "react";


  
export function VentaScreen({styles}) {
    const [venta, setVenta] = useState({});

    const createVenta = () => {
        const { id_vendedor, zona, total } = venta;
    if ([id_vendedor, zona, total].some((key) => !key)) {
      alert("id del vendedor, zona y total son campos requeridos");
      return;
    }
    fetch("http://localhost:8080/api/sales", {
      method: "POST",
      body: JSON.stringify(venta),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((err) => console.error(err));
  };

  const searchVenta = () => {
    const { id } = venta;
    if (!id) {
      alert("Ingrese un id");
      return;
    }
    fetch(`http://localhost:8080/api/vendors/${id}`)
      .then((res) => res.json())
      .then(console.log)
      .catch((err) => console.error(err));
  };

  const addField = (e) =>
    setVenta((pre) => ({ ...pre, [e.target.id]: e.nativeEvent.text }));

  const inputs = [
    {
      placeholder: "Ingrese id del vendedor",
      nameId: "id_vendedor",
    },
    {
      placeholder: "Ingrese zona",
      nameId: "zona",
    },
    {
      placeholder: "Ingrese total",
      nameId: "total",
    },
  ];

  useEffect(() => {
  }, [venta]);

  return (
      <View style={styles.container}>
          
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Venta</Text>
        <View style={{ marginBottom: 10 }}>
          {inputs.map((obj) => (
            <TextInput
              key={obj.nameId}
              placeholder={obj.placeholder}
              style={styles.inputs}
              nativeID={obj.nameId}
              value={venta[obj.nameId] || ""}
              onChange={(e) => addField(e)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "green" }]}
          onPress={searchVenta}
        >
          <Text style={{ color: "yellow" }}>Buscar por Id</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "green" }]}
          onPress={createVenta}
        >
          <Text style={{ color: "yellow" }}>Guardar venta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}