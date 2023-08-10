import React, {Context, FC, ReactNode, useContext, useState} from 'react';
import './App.css';
import {FridgesComponent} from "./sites/fridges/fridges";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {FridgeComponent} from "./sites/fridge/fridge";
import {Fridge} from "./types/fridge";
import {postFridge} from "./api/fridgeServices";
import {FridgeItem} from "./types/fridgeItem";
import {createFridgeItem, postFridgeItem} from "./api/fridgeItemServices";
import {FridgeItemComponent} from "./sites/fridgeItem/fridgeItem";

export interface iFridgeContext{
    fridges?:Array<Fridge>
    setFridges?:(fridges:Array<Fridge>)=>void
    selectedFridgeId?:string
    setSelectedFridgeId?:(fridgeId:string)=>void
    addFridgeItem?:(fridgeId:string, fridgeItem:FridgeItem)=>void
}
export const FridgeContext = React.createContext<iFridgeContext>({});

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <FridgeContextProvider>
                    <BrowserRouter>
                        <Switch>
                                <Route exact path="/" component={FridgesComponent}/>
                                <Route exact path="/fridges/:id" component={FridgeComponent}/>
                                <Route path="/fridges/:id/items/:itemId" component={FridgeItemComponent}/>
                        </Switch>
                    </BrowserRouter>
                </FridgeContextProvider>
            </header>
        </div>
    );
}

export default App;

const FridgeContextProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [fridges, setFridges] = useState<Fridge[]>([]);


    return  <FridgeContext.Provider value={{fridges, setFridges}}>
        {children}
    </FridgeContext.Provider>
}

interface iUseFridgeContext{
    fridges:Array<Fridge>
    createFridge:()=>void
    addFridgeItem:(fridgeId:string, item:FridgeItem)=>void
    updateFridgeItem:(fridgeId:string, fridgeItemId:string, fridgeItem:FridgeItem)=>void
}
export const useFridgeContext = (context:Context<any>):iUseFridgeContext => {
    const {fridges,  setFridges} = useContext(context);

    const createFridge = async() => {
        const fridge = await postFridge();
        if(fridge){
            setFridges([...[], fridge, ...fridges]);
        }
    }

    const addFridgeItem =  async(fridgeId: string, fridgeItem: FridgeItem) => {
        const item = await createFridgeItem(fridgeId, fridgeItem);
        setFridges(fridges.map((fridge:Fridge)=>{
            if(fridge.id === fridgeId){
                return {...fridge, inventory:[...[], item, ...fridge.inventory]}
            }
            return fridge;
        }));
    }

    const updateFridgeItem = async(fridgeId:string, fridgeItemId:string, fridgeItem:FridgeItem)=>{
        const responseItem = await postFridgeItem(fridgeId, fridgeItemId, fridgeItem);
        console.log(responseItem)
        if(responseItem) {
            setFridges(fridges.map((fridge: Fridge) => {
                if (fridge.id === fridgeId) {
                    return {
                        ...fridge, inventory: fridge?.inventory?.map(item => {
                            console.log(item, responseItem, fridgeItemId)
                            return item?.id?.toString() === fridgeItemId ? responseItem : item
                        })
                    }
                }
                return fridge;
            }));
        }
        console.log(fridges, responseItem)
    }
    return {
        fridges,
        createFridge,
        addFridgeItem,
        updateFridgeItem
    }
}
