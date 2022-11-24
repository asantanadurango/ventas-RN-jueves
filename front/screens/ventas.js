import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
  } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
  
export function VentaScreen({styles}) {
  const [venta, setVenta] = useState({ id: localStorage.getItem('_id') });
  const countries = ["Norte", "Sur"]
  
    const createVenta = async () => {
      const { id, zone, total } = venta;
      console.log(venta);
      if ([id, zone, total].some((key) => !key)) {
        alert("id del vendedor, zona y total son campos requeridos");
        setVenta({...venta})
        return;
        }
      
    const req = await fetch("http://localhost:8080/api/sales", {
      method: "POST",
      body: JSON.stringify(venta),
      headers: {
        "Content-Type": "application/json",
      },
    })
      
      const res = await req.json()
      if (res.error) {
        console.log(res.error);
        alert(res.error);
        setVenta({ ...venta })
        return
      }
      console.log(res);
      alert(res.message)
  };

  const searchVentas = async () => {
    const id = localStorage.getItem('_id');
    if (!id) {
      alert("Ingrese un id");
      return;
    }
    const req = await fetch(`http://localhost:8080/api/vendors/${id}`)
    const res = await req.json();
      
    if (res.err) {
      console.log(res.message);
      alert(res.message)
    }

    alert(`Ventas de ${res.name} recuperadas con exito!`)
    console.log(`Ventas de ${res.name} recuperadas con exito!`);
    console.log(res);
  };

  const addField = (e) =>
    setVenta((pre) => ({ ...pre, [e.target.id]: e.nativeEvent.text }));

  const inputs = [
    {
      placeholder: "Ingrese id del vendedor",
      nameId: "id",
    },
    {
      placeholder: "Ingrese total",
      nameId: "total",
    },
  ];

  useEffect(() => {
    setVenta({ id: localStorage.getItem('_id') })
    console.log('ventas');
  },[])

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
            <SelectDropdown
                data={countries}
      
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setVenta((pre) => ({ ...pre, zone: selectedItem.toLowerCase() }));
                }}
                defaultButtonText={'Ingrese zona'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.inputs}
                buttonTextStyle={stylesDropdown.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={stylesDropdown.dropdown2DropdownStyle}
                rowStyle={stylesDropdown.dropdown2RowStyle}
                rowTextStyle={stylesDropdown.dropdown2RowTxtStyle}
              />
        </View>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "green" }]}
          onPress={searchVentas}
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

const stylesDropdown = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width:200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {color: '#000', fontSize:10, fontWeight:200},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width:200, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },
  dropdown2BtnTxtStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 8,
    height:55
  },
  dropdown2RowStyle: {
     borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdownRowImage: {width: 45, height: 30, resizeMode: 'cover'},
});