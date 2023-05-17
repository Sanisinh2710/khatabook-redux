import React, { children, createContext, useState } from 'react';
import { intialvalues } from '../utils/constant';
import { useContext } from 'react';


const transectionContext = createContext({})


export const UsetransData = ()=> useContext(transectionContext)



const TableContext = ({children}) => {

    const [contextData,setcontextData] = useState(intialvalues)

    return (
        <transectionContext.Provider value={{contextData,setcontextData}}>
            {children}
        </transectionContext.Provider>
    );
};

export default TableContext;