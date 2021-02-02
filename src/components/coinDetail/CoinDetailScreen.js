import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, SectionList, FlatList, Pressable} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinMarketItem from './coinMarketItem';
import Storage from 'cryptoTracker/src/libs/Storage';
import Colors from 'cryptoTracker/src/res/colors';


class CoinDetailScreen extends Component{

    //Seteamos el estado de coin a vacio, se utliza para pasar info entre servicios.
    state = {
        coin:{},
        markets:[],
        isFavorites: false
    };

    getSymbolIcon = (name) => {

        if(name){

            const symbol = name.toLowerCase().replace(" ", "-");

            return `https://c1.coinlore.com/img/25x25/{$symbol}.png`
        }
    }

    getSection=(coin)=>{
        const sections = [
            {
                title: "Market cap",
                data:[coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data:[coin.percent_change_24h]
            }
        ];

        return sections;

    }

    getMarkets = async (coinId) =>{
        const url= `https://api.coinlore.net/api/coin/markets/?id=${coinId}`

        const markets = await Http.instance.get(url);

        this.setState({markets});
    }


    toggleFavorites = () =>{
        if(this.state.isFavorites){
            this.removeFavorite();
        }else{
            this.addFavorite();
        }
    }

    addFavorite = () =>{
        const coin =JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`
    }

    removeFavorite = () =>{

    }

    componentDidMount(){
        //console.log("coin", this.props.route.params);

        //Descomponemos la información que nos llega en coin
        const { coin } = this.props.route.params;

        //Seteamos el titulo de cada moneda con props
        this.props.navigation.setOptions({ title: coin.symbol });

        this.getMarkets(coin.id);

        this.setState({ coin });

    }

    


    render() {

        const {coin , markets, isFavorites} = this.state;

        return (
            <View 
                style={styles.container}
            >
                <View 
                    style={styles.subHeader}>

                    <View style={styles.row}>
                        <Image 
                            style={styles.IconImage} 
                            source = {{ uri: this.getSymbolIcon(coin.name) }}/>
                        
                        <Text style={styles.titleText}>
                            {coin.name}
                        </Text>
                    </View>   
                    

                    <Pressable

                        onPress={this.toggleFavorites}

                        style={[
                            styles.isFavorites,
                            isFavorites ? 
                                styles.btnFavoriteRemove :
                                styles.btnFavoriteAdd
                        ]}
                    >
                        <Text style={styles.btnFavoriteText}>{ isFavorites ? "Remove favorite" : "Add Favorites"}</Text>    
                    </Pressable>                    
                </View>
                <SectionList
                    style={styles.section}
                    sections={this.getSection(coin)}
                    keyExtractor={(item)=>item}
                    renderItem={({item}) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>                        
                    }
                    renderSectionHeader={({section}) =>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                        
                    }
                />

            <Text style={styles.marketsTitle}> Markets</Text>

            <FlatList 
                style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({ item }) => <CoinMarketItem item={item}/> }
            />
            </View> 
        )
    } 
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.charade
    },
    titleText:{
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.white,
        marginLeft: 8 
    },
    subHeader:{
        backgroundColor: "rgba(0,0,0, 0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    row:{
        flexDirection: "row"   
    },
    IconImage:{
        width: 25,
        height: 25
    },
    sectionHeader:{
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 8
    },
    sectionItem:{
        padding:8
    },
    itemText:{
        color: Colors.white,
        fontSize: 14
    },
    sectionText:{
        color: Colors.white,
        fontSize:14,
        fontWeight: "bold"
    },
    section:{
        maxHeight: 220
    },
    list:{
        maxHeight:100,
        paddingLeft: 16
    },
    marketsTitle:{
        color:  Colors.white,
        fontSize: 16,
        fontWeight:"bold",
        marginBottom: 16,
        marginLeft: 16
    },
    btnFavorite:{
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteAdd:{
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove:{
        backgroundColor: Colors.carmine
    },
    btnFavoriteText:{
        color: Colors.white
    }

})

export default CoinDetailScreen;