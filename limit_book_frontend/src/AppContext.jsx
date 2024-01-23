import { createContext, useContext, useReducer } from "react";
import { AppReducer } from "./hooks/AppReducer";

export { AppProvider, useApp, useAppDispatch };

const initAppData = {};

const AppContext = createContext();
const AppDispatchContext = createContext();

function AppProvider({ children }) {
    const [appData, appDispatch] = useReducer(AppReducer, initAppData);

    return (
        <AppContext.Provider value={appData}>
            <AppDispatchContext.Provider value={appDispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}

function useApp() {
    return useContext(AppContext);
}

function useAppDispatch() {
    return useContext(AppDispatchContext);
}