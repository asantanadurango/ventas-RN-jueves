import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
import React, { useEffect, useState } from "react";

export function VendedorScreen({ styles }) {
  const [vendedor, setVendedor] = useState({});
  
    const createVendedor = async () => {
      const { name, email } = vendedor;
      if ([name, email].some((key) => !key)) {
        alert("name, email y son requeridos");
        return;
      }
    try {
      const req = await fetch("http://localhost:8080/api/vendors", {
        method: "POST",
        body: JSON.stringify(vendedor),
        headers: {
          "Content-Type": "application/json",
        },
      })
        
      const res = await req.json()
      console.log(res)
        
      if (res.error) {
        alert(res.message)
        setVendedor({})
        return;
      }
  
      alert(res.message)
      localStorage.setItem('_id', res._id)
      setVendedor({id:res._id})
    } catch (error) {
      console.log('Error inesperado');
      throw (error)
    }      
  };
  
  const searchVendedorById = async () => {
    console.log(vendedor);
    const idByLocalStorage = localStorage.getItem('_id')
    const id = vendedor?.id || idByLocalStorage
      if (!id) {
        alert("Ingrese un id");
        return;
      }
      fetch(`http://localhost:8080/api/vendors/${id}`)
        .then((res) => res.json())
        .then(res => {
          console.log(res);
          if (res.error) {
            alert(res.message)
            setVendedor({})
            return 
          }
          
          const {name, email}= res
          alert(`Bienvenido ${name}`)
          setVendedor({name, email, id: localStorage.getItem('_id')})
          console.log(res)
        })
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
      }
  ];
  
  useEffect(() => {

    localStorage.clear()
    setVendedor({ id: localStorage.getItem('_id') })
    console.log('vendedor');
  },[])
  
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            padding: 24,
            justifyContent: "center",
            alignItems: "center",
            textAlign:'center'
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
            onPress={searchVendedorById}
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