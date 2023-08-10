import {useParams} from "react-router-dom";
import {FridgeContext, useFridgeContext} from "../../App";
import {useMemo, useState} from "react";
import {FridgeItemListItem} from "../../components/list/item";
import {Toolbar} from "../../components/toolbar/toolbar";
import {List} from "../../components/list/list";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {Modal} from "../../components/modal/modal";


export const FridgeComponent = () => {
    const {id} = useParams<{id:string}>();
    const {fridges, addFridgeItem} = useFridgeContext(FridgeContext);
    const [showModal, setShowModal] = useState<boolean>(false);

    const inventory = useMemo(()=>{
        return fridges.find(f=>f.id === id)?.inventory||[];
    },[fridges, id]);


    const toolbarItems:iToolbarItem[] = [
        {
            title:"Add Item",
            onClick:()=>setShowModal(true)
        },
        {
            title:"close",
            onClick:()=>setShowModal(false)
        },
    ];

    return <>
        <Toolbar items={toolbarItems}/>
        <List items={inventory} renderItem={item => <FridgeItemListItem key={item?.id} itemId={item?.id?.toString()} title={item.name} id={id}/>}/>
        {showModal?<Modal id={id} onClose={()=>setShowModal(false)} add={(value)=>addFridgeItem(id, value)}/>:null}
    </>
}
