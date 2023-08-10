import {FC} from "react";
import {iToolbarItem, ToolbarItem} from "./toolbarItem";

export interface iToolbar{
    items:Array<iToolbarItem>
}

export const Toolbar:FC<iToolbar> = ({items}) => {
    return <ul className="w3-bar">{items.map(item => <ToolbarItem key={item.title} {...item}/>)}</ul>
}
