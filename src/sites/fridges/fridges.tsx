import {Toolbar} from "../../components/toolbar/toolbar";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {List} from "../../components/list/list";
import {FridgesListItem} from "../../components/list/item";
import React from "react";
import {FridgeContext, useFridgeContext} from "../../App";

export const FridgesComponent = () => {

    const {createFridge, fridges} = useFridgeContext(FridgeContext);

    const handleOnCreateFridge = () => {
        createFridge();
    }

    const createFridgeButton = {
        key:"createFridgeButton",
        title:"create fridge",
        onClick:handleOnCreateFridge
    }


    const toolbarItems:iToolbarItem[] = [createFridgeButton];

    return <div>
            <Toolbar items={toolbarItems}/>
            <List items={fridges} renderItem={item=><FridgesListItem key={item?.id} title={item?.id || ""} id={item.id}/>}/>
    </div>
}
