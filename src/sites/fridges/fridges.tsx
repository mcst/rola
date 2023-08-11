import {Toolbar} from "../../components/toolbar/toolbar";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {List} from "../../components/list/list";
import {FridgesListItem} from "../../components/list/item";
import React from "react";
import {FridgeContext, useFridgeContext} from "../../App";
import {Outlet, useParams} from "react-router-dom";
import {useSize} from "../../components/size/size";

export const FridgesComponent = () => {

    const {createFridge, fridges, } = useFridgeContext(FridgeContext);
    const {id, itemId=""} = useParams();
    const handleOnCreateFridge = () => {
        createFridge();
    }

    const {width} = useSize();

    const createFridgeButton = {
        key:"createFridgeButton",
        title:"create fridge",
        onClick:handleOnCreateFridge
    }
    const title={
        title:"Fridges"
    };

    const toolbarItems:iToolbarItem[] = [title,createFridgeButton];

    return <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
            <div  style={{flexGrow:itemId?0.5:1}} className={`${(id && (width<600)) || (itemId && (width<800))?'hidden':''}`}>
                <Toolbar items={toolbarItems}/>
                <List items={fridges} renderItem={item=><FridgesListItem key={item?.id} title={item?.id || ""} id={item.id}/>}/>
            </div>
            {id?
                <div style={{flexGrow:itemId?2:1}}>
                    <Outlet/>
                </div>
                :
                null
            }
    </div>
}
