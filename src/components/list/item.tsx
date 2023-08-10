import {FC} from "react";
import {Link} from "react-router-dom";

export interface iFridgesListItem {title:string, id:string}
export interface iFridgesItemListItem extends iFridgesListItem{itemId:string}
export const FridgesListItem:FC<iFridgesListItem> = ({id, title}) => {
    return <li key={title}>
        <Link to={`/fridges/${id}`}>{title}</Link>
    </li>
}

export const FridgeItemListItem:FC<iFridgesItemListItem> = ({id,itemId, title}) => {
    return <li key={title}>
        <Link to={`/fridges/${id}/items/${itemId}`}>{title}</Link>
    </li>
}
