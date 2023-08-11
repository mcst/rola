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

    return <div className="w3-modal" style={{display:"block", color:"black"}}>
        <div className="w3-modal-content w3-card-4">
            <header className="w3-container">
                <span onClick={onClose}className="w3-button w3-display-topright">
                    &times;
                </span>
                <h2>Add a new item to your fridge</h2>
            </header>
            <div className="w3-container">
                <Details data={fridgeItem as FridgeItem} onChange={handleOnChange}/>
            </div>
            <footer className="w3-container" style={{marginTop:10}}>
                <button className={"w3-button"} onClick={onOkay}>add</button>
                <button className={"w3-button"} onClick={onClose}>close</button>
            </footer>
        </div>
    </div>;
}

