import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Cotizacion = ({resultados}) => {
    if(Object.keys(resultados).length===0)return null; //si el objeto esta vacio 

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = resultados
    return (
        <View style={styles.resultado}>
           <Text style={styles.texto} >
               <Text style={[styles.span,styles.precio]}>{PRICE}</Text>
           </Text>
           <Text style={styles.texto} >Precio más alto del día:{' '}
               <Text style={styles.span}>{HIGHDAY}</Text>
           </Text>
           <Text style={styles.texto} >Preci más bajo del dia: {' '}
               <Text style={styles.span}>{LOWDAY}</Text>
           </Text>
           <Text style={styles.texto} >Variación ultimas 24 hrs: {' '}
               <Text style={styles.span}>{CHANGEPCT24HOUR} %</Text>
           </Text>
           <Text style={styles.texto} >Última actualización: {' '} 
               <Text style={styles.span}>{LASTUPDATE}</Text>
           </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    resultado:{
        backgroundColor:'#825AF7',
        padding: 50,
        
       
    },
    texto:{
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom:10
    },
    precio:{
        fontSize: 30
    },
    span:{
        fontFamily: 'Lato-Black',
        fontWeight: '800'
    }
})