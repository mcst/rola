import {FC} from "react";
import {FridgeItem} from "../../types/fridgeItem";



export interface iDetails{
    data?:Partial<FridgeItem>
    onChange: (value:Partial<FridgeItem>)=>void
}
export const Details:FC<iDetails> = ({data, onChange}) => {

    const handleNameChange = (e:any) => {
        const value = e.target.value;
        onChange({...data, name:value});
    }
    const handleTargetChange = (e:any) => {
        const value = e.target.value;
        onChange({...data, target: Number(value)});
    }
    const {name, target} = data||{};

    return <div>
        <label>Name</label><input value={name||""} onChange={handleNameChange}/>
        <label>Target</label><input type="number" value={target||0} onChange={handleTargetChange}/>
    </div>

}
