import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export default function AppWrapper({ children }){
    const [sharedState, setSharedState] = useState({});
    const [sharedCartState, setSharedCartState] = useState({});

    const updateState = (user) => {
        setSharedState(user)
    }

    const updateCart = (cart) => {
        setSharedCartState(cart)
    }

    return (
        <AppContext.Provider value={{user: sharedState, updateUser: updateState, cart: sharedCartState, updateCart: setSharedCartState}}>
            {children}
        </AppContext.Provider>
    );

}

export function useAppContext(){
    return useContext(AppContext);
}