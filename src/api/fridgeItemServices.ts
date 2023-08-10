//post /fridge
// import {Fridge} from "../types/fridge";
import {FridgeItem} from "../types/fridgeItem";
import headers from './authentication';
import {apiServer} from "./fridgeServices";

//post /fridge/{id}/item
export const createFridgeItem = async(id:string, fridgeItem:FridgeItem):Promise<FridgeItem> =>{
    const requestOptions = {
        method:'Post',
        headers,
        body:JSON.stringify(fridgeItem)
    }
    const url = `${apiServer}/fridge/${id}/item`
    let responseFridgeItem;
    try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            responseFridgeItem = await response.json();
        }
    }
    catch(e){
        console.warn(e);
    }
    console.log(responseFridgeItem)
    return responseFridgeItem;
}

// //get /fridge/{id}/item/{itemId}
// const getFridgeItem = async(fridgeId:Pick<Fridge,'id'>, itemId:Pick<FridgeItem, 'id'>):Promise<FridgeItem> => {
//     return new Promise((resolve, reject)=>{
//         // resolve({id:1,name:"22",actual:1,target:1})
//     })
// }
//
//post /fridge/{id}/item/{itemId}

export const postFridgeItem = async(id:string, itemId:string, fridgeItem:FridgeItem ):Promise<FridgeItem> => {
    const requestOptions = {
        method:'Post',
        headers,
        body:JSON.stringify(fridgeItem)
    }
    const url = `${apiServer}/fridge/${id}/item/${itemId}`
    let responseFridgeItem;
    try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            responseFridgeItem = await response.json();
        }
    }
    catch(e){
        console.warn(e);
    }
    return responseFridgeItem;
}
