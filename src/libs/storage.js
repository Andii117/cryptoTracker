import AsyncStorage from '@react-native-community/async-storage';

class Storage{
    //Sirve para tener una sola instancia en toda la aplicación y ahorra memoria
    static instance= Storage();

        //Servicio Store(Guardar) de storage: solo puede almacenar string.
        store= async () =>{
            try{
                await AsincStorage.setItem(key, value);
                return true;
    
    
            }
            catch(err){
                console.log("storage store err", err);
                //No pudo guardar
                return false;
            }
        }
    
        //Servicio get del Stora
        get = async (Key) =>{
            try{
                return AsyncStorage.getItem(Key);
            }
            catch(err){
                console.log("storage get err", err);
                
                throw Error(err);
            }
        }
    
        //Servicios de remove del storage
        remove = async(key) =>{
            try{
                await AsyncStorage.removeItem(key);
                return true;
            }
            catch(Err){
                console.log("storage remove err",err);
                return false;
            }
        }
    
        //Devolver toda la lista Multiget 
        multiGet = async(Keys) =>{
            try{
                
                return await AsyncStorage.multiGet(Keys);
    
            }
            catch(err){
                console.log("Storage multiGet Err",err);
                throw Error(err);
            }
        }
    
        getAllKeys = async() =>{
            try{
                 return await AsyncStorage.getAllKeys();
            }
            catch(err){
                console.log("Storage getAllKeys Err",err);
                throw Error(err);
        }
    }
}

export default Storage;