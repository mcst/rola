import {FC, useState} from "react";
import {FridgeItem} from "../../types/fridgeItem";
import {Details} from "../details/details";

export const Modal: FC<{id:string, onClose: () => void, add: (item: FridgeItem) => void }> = ({onClose, add, id}) => {
    const [fridgeItem, setFridgeItem] = useState<Partial<FridgeItem>>();

    const handleOnChange = (data:Partial<FridgeItem>) =>{
        setFridgeItem(data)
    };
    const onOkay = async() => {
        add(fridgeItem as FridgeItem)
        onClose();
    }

    return <div className="w3-modal" style={{display:"block"}}>
        <div className="w3-modal-content">
            <div className="w3-container">
                <Details data={fridgeItem as FridgeItem} onChange={handleOnChange}/>
                <button onClick={onOkay}>add</button>
                <button onClick={onClose}>close</button>
            </div>
        </div>
    </div>;
}

