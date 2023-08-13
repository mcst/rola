import {Details} from "../../components/details/details";
import {FridgeContext, useFridgeContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import {FridgeItem} from "../../types/fridgeItem";
import {Toolbar} from "../../components/toolbar/toolbar";
import {iToolbarItem} from "../../components/toolbar/toolbarItem";
import {useEffect, useMemo, useState} from "react";

export const FridgeItemComponent = () => {

    const {id="", itemId=""} = useParams<{id:string, itemId:string}>();
    const {fridges, updateFridgeItem} = useFridgeContext(FridgeContext);
    const navigate = useNavigate();

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
        {title:"Fridge Item"},
        {title:"Update", onClick:onUpdate, disabled:!modifiedData},
        {title:"Cancel", onClick:()=> {
                setWorkingData(fridgeItem);
                setModifiedData(undefined);
        }, disabled:!modifiedData},
        {
            title:"close",
            onClick:()=>navigate(`/fridges/${id}`),
            icon:  "fa fa-close",
            alignRight: true
        },
    ]

    useEffect(()=>{
        if(!workingData || fridgeItem?.id !== workingData?.id) {
            setWorkingData(fridgeItem);
        }
    },[fridgeItem, workingData, modifiedData]);

    return <>
        <Toolbar items={toolbarItems} />
        <div style={{height: "calc(100% - 38px)",  overflowY: "auto"}}>
            <Details onChange={setModifiedData} data={modifiedData || workingData} readonly={["name"]}></Details>
        </div>
    </>
}
