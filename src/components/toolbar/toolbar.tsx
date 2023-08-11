import {FC} from "react";
import {iToolbarItem, ToolbarItem} from "./toolbarItem";

export interface iToolbar{
    items:Array<iToolbarItem>
}

export const Toolbar:FC<iToolbar> = ({items}) => {
    return <div  className="w3-bar w3-card">
        {items.map(item => <ToolbarItem key={item.title} {...item}/>)}
    </div>
}
