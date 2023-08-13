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
            <header className="w3-container w3-blue">
                <span onClick={onClose}className="w3-button w3-display-topright">
                    &times;
                </span>
                <h2>Add a new item to your fridge</h2>
            </header>
            <div className="w3-container w3-padding">
                <Details data={fridgeItem as FridgeItem} onChange={handleOnChange} hide={["actual"]}/>
            </div>
            <footer className="w3-container" style={{margin:10, paddingBottom:10}}>
                <button className={"w3-button w3-right w3-grey"} onClick={onClose}>close</button>
                <button disabled={!fridgeItem?.name} className={"w3-button w3-right w3-blue"} style={{marginRight:5}} onClick={onOkay}>add</button>
            </footer>
        </div>
    </div>;
}

