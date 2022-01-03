import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
export const Header = () => {
    return (
        <Text style={styles.encabezado}>Criptomonedas</Text>
    )
}

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS==='ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#6363F7',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 30

    }
})