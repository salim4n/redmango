import React from "react";

const inputHelper = (e : React.ChangeEvent<HTMLInputElement>, data: any) => {
    const tempData = { ...data };
    tempData[e.target.name] = e.target.value;
    return tempData;
}

export default inputHelper;

