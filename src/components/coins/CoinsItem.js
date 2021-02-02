import React from 'react';
import {View, Text, Image, StyleSheet, Platform, Pressable} from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';  
 


const CoinsItem = ({item, onPress}) => {

    getImageArrow = () =>{
        //Si el valor de la moneda subio se muestra la imagen arrow up
        if (item.percent_change_1h > 0){
            return require("cryptoTracker/src/assets/arrow_up.png"); 
        }       
        else{
            return require("cryptoTracker/src/assets/arrow_down.png"); 
        }
    }

    return (
            <Pressable onPress={onPress} style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.symbolText}>
                        {item.symbol}
                    </Text>
                    <Text style={styles.nameText}>
                        {item.name}
                    </Text>
                    <Text style={styles.priceText}>
                        {`$${item.price_usd}`}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                    <Image 
                        style={styles.imageIcon}
                        source={getImageArrow()}
                    />
                </View>
            </Pressable>
    );
}

const styles = StyleSheet.create({
        container:{
            flexDirection:"row",
            justifyContent: "space-between",
            padding: 16,
            borderBottomColor: Colors.zircon,
            borderBottomWidth: 1,
            marginLeft: Platform.OS == 'android' ? 16 : 0 
        },
        row:{
            flexDirection: "row"
        },
        symbolText:{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            marginRight: 8
        },
        nameText:{
            color:"#fff",
            marginRight:16,
            fontSize:14
        },
        percentText:{
            color:"#fff",
            fontSize: 12
        },
        priceText:{
            color:"#fff",
            fontSize: 14,
            marginRight: 8,
            marginLeft: 8
        },
        imageIcon:{
            width:22,
            height:22
        }
    }
);


export default CoinsItem;