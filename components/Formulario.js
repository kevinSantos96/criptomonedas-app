import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableHighlight,Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';


export const Formulario = ({moneda, setMoneda, criptomoneda, setCriptomoneda, setGuardarAPI}) => {

    
    const [criptomonedas, setGuardarCriptomoneda] = useState([]);

    useEffect(() => {
        const consultarAPI = async ()=>{
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const res = await axios.get(url);
            setGuardarCriptomoneda(res.data.Data);
        }
        consultarAPI()
    }, [])
    //ALMACENA LAS SELECCIONES DEL USUARIO  
    const obtenerMoneda= money =>{
        setMoneda(money)
    }

    const obtenerCriptomoneda= cripto=>{
        setCriptomoneda(cripto)
    }
    //cotizar

    const CotizarPrecio = ()=>{
        if(moneda.trim()===''|| criptomoneda.trim()===''){
            mostrarAlerta();
            return
        }
        //Pasa la validacion cambiamos el state de consultar API
        setGuardarAPI(true);

    }
    //VALIDACION
    const mostrarAlerta = ()=>{
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [
                {text: 'Aceptar'}
            ]
        )
    }


    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ money=> obtenerMoneda(money)}
                itemStyle={{height: 120}}
            
            >
                <Picker.Item label='-Seleccione--' value=""/>
                <Picker.Item label='Dolar Estadounidense' value="USD"/>
                <Picker.Item label='Lempira' value="HNL"/>
                <Picker.Item label='Euro' value="EUR"/>
                <Picker.Item label='Libra' value="GBP"/>
                <Picker.Item label='Yen' value="JPY"/>
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto=> obtenerCriptomoneda(cripto)}
                itemStyle={{height: 100}}
            >
                <Picker.Item label='-Seleccione--' value=""/>
                {
                    criptomonedas.map(cripto=>(
                        <Picker.Item key={cripto.CoinInfo.Id}
                                    label={cripto.CoinInfo.FullName} 
                                    value={cripto.CoinInfo.Name}/>
                    ))
                }
            </Picker>

            <TouchableHighlight style={styles.btnCotizar}
                                onPress={CotizarPrecio}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>

        </View>
    )
}
const styles= StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar:{
        backgroundColor: '#6363F7',
        padding: 10,
        marginTop:25,
        borderRadius: 10,
        marginHorizontal: 15

    },
    textoCotizar:{
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontWeight: '600'
    }
})