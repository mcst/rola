import {FC} from "react";

export interface iToolbarItem{
    title:string
    disabled?: boolean
    onClick?:()=>void
    icon?:string
    alignRight?:boolean
}
export const ToolbarItem:FC<iToolbarItem> = ({title,icon, onClick, disabled, alignRight}) => {
    return(onClick?<button className={`w3-button w3-bar-item${alignRight?" w3-right":""}`} onClick={onClick} key={title} disabled={disabled}>
                    {icon ? <i className={icon}/> : <div>{title}</div>}
                </button>
        :<div className={"w3-bar-item"}>{title}</div>
    )
}
