import {ReactNode} from "react";
export interface iList<T>{
    items:T[]
    renderItem: (item:T)=>ReactNode
}
export function List<T>(props:iList<T>){
    const {renderItem, items} = props;
    return <ul className="w3-ul">
        {items?.map(item => renderItem(item))}
    </ul>
}
