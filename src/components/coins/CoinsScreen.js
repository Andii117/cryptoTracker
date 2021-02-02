import React, { Component } from "react";
import { View, FlatList , ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

import Colors from 'cryptoTracker/src/res/colors';

class CoinsScreen extends Component
{

    //Inicializamos el estado
    state = { 
        coins: [],
        allCoins:[],
        loading: false
    }
    
    componentDidMount = () => {
        this.getCoins();
    }

    /* Funcionalidad para obtener las monedas y inicializa el estado para el
    componente de carga(icono)  */
    getCoins = async () =>{
        //Inicializamos el cargar
        this.setState({loading: true});

        //Recibimos la información en la variable res
        const res = await http.instance.get("https://api.coinlore.net/api/tickers/");
        //Obtenemos la información y la seteamos en el estado.

        this.setState({ coins: res.data, allCoins:res.data ,loading: false});
    }

    /*Cambio de pantalla usando handlePress */
    handlePress = (coin) =>{
    
        this.props.navigation.navigate('CoinsDetail',{coin});
    }

    /* Servicio para buscar: Primero guarda una copia del estado anterior,
        despues devuelve el filtro de las monedas con la función tolowerCase para
        que el usuario lo escriba como quiera pero se obtenga correctamente por el nombre
        y por el symbolo.
        Si obtiene la moneda seta el nuevo estado en un array nuevo.
    */
    handleSearch=(query)=>{
        const {allCoins}= this.state;

        const coinsFiltered = allCoins.filter((coin)=>{
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                    coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({coins: coinsFiltered });
    }

    /* Renderiza las pantallas con los container*/
    render(){

        const { coins, loading } = this.state;

        return (
            <View style = { styles.container }>

            <CoinsSearch onChange={this.handleSearch}/>

            { loading ? 
            <ActivityIndicator
                style= {styles.loader}
                color='#fff' 
                size = "large"
            />
            : null
            }
                <FlatList
                    data={coins}
                    renderItem={({ item }) => 
                        <CoinsItem 
                            item = {item} 
                            onPress={()=> this.handlePress(item)} />
                    }
                />    
            </View>
        );
    }
}

/*Estilos utilizados para frontEnd con StyleSheet de react native */
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.charade
    },

    titleText:{
        color: "#fff",
        textAlign: "center"
    },    
    btn:{
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },

    btnText:{
        color: "#fff",
        textAlign: "center"
    },

    loader :{
        marginTop : 60
    }

});

export default CoinsScreen;