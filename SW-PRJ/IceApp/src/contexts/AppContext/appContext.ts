import { createContext, useContext, useState } from "react";

const initState = {
    test:'test'
}

const TestContext = createContext(initState);

export const TestProvider = ({children}) {
    
    const [test,setTest] = useState(initState)

    return <TestContext.Provider value = {test,setTest}>
    {children}
    </TestContext.Provider>k
}

export const useTestContext = () => useContext(TestContext);

export const TestProvider;
