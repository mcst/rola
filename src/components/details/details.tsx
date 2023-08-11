import {FC} from "react";
import {FridgeItem} from "../../types/fridgeItem";


export interface iDetails {
    data?: Partial<FridgeItem>
    onChange: (value: Partial<FridgeItem>) => void
    readonly ?: Array<keyof FridgeItem>
}

export const Details: FC<iDetails> = ({data, onChange, readonly}) => {

    const handleTextChange = (key: keyof FridgeItem, value: string) => {
        onChange({...data, name: value});
    }
    const handleNumberChange = (key: keyof FridgeItem, value: number) => {
        if (value >= 0) {
            onChange({...data, target: Number(value)});
        }
    }
    const {name, target, actual} = data || {};

    return <div className="w3-container">
        <form className="w3-card-4 w3-padding">
            <label>Name</label>
            <input className={"w3-input"} value={name || ""}
                   onChange={e => handleTextChange("name", e?.target?.value)} readOnly={readonly?.includes("name")}/>

            <label>Target</label>
            <input className={"w3-input"} type="number" value={target || 0}
                   onChange={e => handleNumberChange("target", Number(e?.target?.value || 0))}/>

            <label>Actual</label>
            <input className={"w3-input"} type="number" readOnly value={actual || 0}/>
        </form>
    </div>

}
