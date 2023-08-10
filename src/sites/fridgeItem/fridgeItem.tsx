import {Details} from "../../components/details/details";
import {FridgeContext, useFridgeContext} from "../../App";
import {useParams} from "react-router-dom";
import {FridgeItem} from "../../types/fridgeItem";
import {Toolbar} from "../../components/toolbar/toolbar";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {useEffect, useMemo, useState} from "react";

export const FridgeItemComponent = () => {

    const {id, itemId} = useParams<{id:string, itemId:string}>();
    const {fridges, updateFridgeItem} = useFridgeContext(FridgeContext);

    const [workingData, setWorkingData] = useState<Partial<FridgeItem>>();
    const [modifiedData, setModifiedData] = useState<Partial<FridgeItem>>();

    const onUpdate = async() => {
        updateFridgeItem(id, itemId, modifiedData as FridgeItem);
        setWorkingData(modifiedData);
        setModifiedData(undefined);
    }

    const fridge = fridges.find(fridge=>fridge.id===id);
    const fridgeItem:FridgeItem|undefined = useMemo(()=>{return fridge?.inventory?.find(item=>item?.id?.toString() === itemId)},[fridge, itemId]);
    const toolbarItems:iToolbarItem[] = [
        {title:"Update", onClick:onUpdate, disabled:!modifiedData},
        {title:"Cancel", onClick:()=>setWorkingData(fridgeItem), disabled:!modifiedData}
    ]

    useEffect(()=>{
        if(!workingData || fridgeItem?.id !== workingData?.id) {
            setWorkingData(fridgeItem);
        }
    },[fridgeItem, workingData, modifiedData]);

    return <>
        <Toolbar items={toolbarItems} />
        <Details onChange={setModifiedData} data={modifiedData || workingData}></Details>
    </>
}
