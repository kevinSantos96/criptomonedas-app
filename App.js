import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

import { Header } from './components/Header';
import { Formulario } from './components/Formulario';
import { Cotizacion } from './components/Cotizacion';

const App = () => {
  
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [ consultarAPI, setGuardarAPI ] = useState(false);
  const [resultados, setGuardarResultados]= useState({});
  const [cargando, setCargando]= useState(false); // pantalla de carga

  useEffect(() => {
    const cotizarCriptomoneda = async ()=>{
      if(consultarAPI){//Listo para cotizar API
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda},ETH&tsyms=${moneda}`; 
        const resultado = await axios.get(url); 
        //mostrar spiner 
        setCargando(true);
        //Ocultar el spiner y mostrar resultado
        setTimeout(() => {
          setGuardarResultados(resultado.data.DISPLAY[criptomoneda][moneda]);
          setGuardarAPI(false);
          setCargando(false);
        },3000);
      }
    }
    cotizarCriptomoneda();
  }, [consultarAPI])

  //Pantalla de carga
  const componente = cargando? <ActivityIndicator size='large' color='#6363F7'/>:<Cotizacion resultados ={ resultados }/>

  return (
    <>
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={ require('./assets/img/cryptomonedas.png') }
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          setMoneda={setMoneda}
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          setGuardarAPI={ setGuardarAPI }
        />
        
        
      </View>
      <View style={{marginTop:40}}>
        {componente}
      </View>
      
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
