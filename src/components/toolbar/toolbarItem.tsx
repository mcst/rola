import {FC} from "react";

export interface iToolbarItem{
    title:string
    disabled?: boolean
    onClick:()=>void
}
export const ToolbarItem:FC<iToolbarItem> = ({title,onClick, disabled}) => {
    return <button className={"w3-button w3-bar-item"} onClick={onClick} key={title} disabled={disabled}>
        <div>{title}</div>
    </button>
}
