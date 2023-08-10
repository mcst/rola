import {Fridge} from "../types/fridge";
import headers from "./authentication";

export const apiServer = "https://innovations.rola.com/build/rola/coolschrank/ongoing/application";


//post /fridge
export const postFridge = async():Promise<Fridge> => {
    const requestOptions = {
        method:'Post',
        headers
    }
    const url = `${apiServer}/fridge`
    let responseFridge;
    try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            responseFridge = await response.json();
        }
    }
    catch(e){
        console.warn(e);
    }
    console.log(responseFridge)
    return responseFridge;
}

//get /fridge/{id}
export const getFridge = async(id:Pick<Fridge,'id'>):Promise<Fridge> => {
    return new Promise((resolve, reject)=>{
        // resolve({id:123,inventory:[]})
    })
}
