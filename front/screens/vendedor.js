import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";

export function VendedorScreen({ styles }) {
    const [vendedor, setVendedor] = useState({});
  
    const createVendedor = () => {
      const { name, email, total } = vendedor;
      if ([name, email, total].some((key) => !key)) {
        alert("name, email y total son requeridos");
        return;
      }
      fetch("http://localhost:8080/api/vendors", {
        method: "POST",
        body: JSON.stringify(vendedor),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(console.log)
        .catch((err) => console.error(err));
    };
  
    const searchVendedor = () => {
      const { id } = vendedor;
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
      setVendedor((pre) => ({ ...pre, [e.target.id]: e.nativeEvent.text.trim() }));
  
    const inputs = [
      {
        placeholder: "Ingrese id",
        nameId: "id",
      },
      {
        placeholder: "Ingrese nombre",
        nameId: "name",
      },
      {
        placeholder: "Ingrese email",
        nameId: "email",
      },
      {
        placeholder: "Ingrese comision",
        nameId: "total",
      },
    ];
  
    useEffect(() => {
      // console.log(vendedor);
    }, [vendedor]);
  
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
          <Text>Vendedor</Text>
          <View style={{ marginBottom: 10 }}>
            {inputs.map((obj) => (
              <TextInput
                key={obj.nameId}
                placeholder={obj.placeholder}
                style={styles.inputs}
                nativeID={obj.nameId}
                value={vendedor[obj.nameId] || ""}
                onChange={(e) => addField(e)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "green" }]}
            onPress={searchVendedor}
          >
            <Text style={{ color: "yellow" }}>Buscar por Id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "green" }]}
            onPress={createVendedor}
          >
            <Text style={{ color: "yellow" }}>Crear usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }