import {FC} from "react";
import {FridgeItem} from "../../types/fridgeItem";


export interface iDetails {
    data?: Partial<FridgeItem>
    onChange: (value: Partial<FridgeItem>) => void
    readonly ?: Array<keyof FridgeItem>
    hide? :Array<keyof FridgeItem>
}

export const Details: FC<iDetails> = ({data, onChange, hide, readonly}) => {

    const handleTextChange = (key: keyof FridgeItem, value: string) => {
        onChange({...data, name: value});
    }
    const handleNumberChange = (key: keyof FridgeItem, value: number) => {
        if (value >= 0) {
            onChange({...data, target: Number(value)});
        }
    }
    const {name, target, actual} = data || {};

    const _name = !hide?.includes("name") ?
        <>
            <label>Name</label>
            <input className={"w3-input"} value={name || ""} onChange={e => handleTextChange("name", e?.target?.value)} readOnly={readonly?.includes("name")}/>
        </>
    : null;

    const _target = !hide?.includes("target") ?
        <>
            <label>Target</label>
            <input className={"w3-input"} type="number" value={target || 0}
               onChange={e => handleNumberChange("target", Number(e?.target?.value || 0))}/>
        </>
    : null;

    const _actual = !hide?.includes("actual") ?
        <>
            <label>Actual</label>
            <input className={"w3-input"} type="number" readOnly value={actual || 0}/>
        </>
    : null;

    return <div className="w3-container">
        <form className="w3-card-4 w3-padding">
            {_name}
            {_target}
            {_actual}
        </form>
    </div>

}
