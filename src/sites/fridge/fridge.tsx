import {Outlet, useNavigate, useParams} from "react-router-dom";
import {FridgeContext, useFridgeContext} from "../../App";
import React, {useMemo, useState} from "react";
import {FridgeItemListItem} from "../../components/list/item";
import {Toolbar} from "../../components/toolbar/toolbar";
import {List} from "../../components/list/list";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {Modal} from "../../components/modal/modal";
import {useSize} from "../../components/size/size";


export const FridgeComponent = () => {
    const {id="", itemId=""} = useParams<{id:string, itemId:string}>();
    const {fridges, addFridgeItem} = useFridgeContext(FridgeContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const inventory = useMemo(()=>{
        return fridges.find(f=>f.id === id)?.inventory||[];
    },[fridges, id]);

    const {width} = useSize();

    const toolbarItems:iToolbarItem[] = [
        {
            title:"Add Item",
            onClick:()=>setShowModal(true)
        },
        {
            title:"close",
            onClick:()=>navigate("/")
        },
    ];

    return <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
        <div style={{flexGrow:1}} className={`${itemId && (width<600)?'hidden':''}`}>
            <Toolbar items={toolbarItems}/>
            <List items={inventory} renderItem={item => <FridgeItemListItem key={item?.id} itemId={item?.id?.toString()} title={item.name} id={id}/>}/>
        </div>
        {id && itemId?
            <div style={{flexGrow:1}}>
                <Outlet/>
            </div>
            :
            null
        }
        {showModal?<Modal id={id} onClose={()=>setShowModal(false)} add={(value)=>addFridgeItem(id, value)}/>:null}
    </div>
}
