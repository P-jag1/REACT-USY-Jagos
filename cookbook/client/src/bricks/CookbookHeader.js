import React from "react";
import headerStyle from "../css/cookbookHeader.module.css";

function CookbookHeader(props) {
    return <h1 className={headerStyle.cookbookHeader}>
        {props.title.name}
        </h1> 
}

export default CookbookHeader;