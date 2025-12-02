import React, { createContext, useContext, useState } from "react";
import type { MenuContextType, MenuLayer, MenuProviderProps } from "./definitions";

export const StackedMenuContext = createContext<MenuContextType | undefined>(undefined);

export const StackedMenuProvider: React.FC<MenuProviderProps> = ({ children, defaultState }) => {
    const [layers, _] = useState<{ [key: string]: MenuLayer[] }>(defaultState || {});

    // Implement react solution, which would complete 

    return (
        <StackedMenuContext.Provider value={{ layers }}>
            {children}
        </StackedMenuContext.Provider>
    );
};


export const useStackedMenuContext = () => {
    const ctx = useContext(StackedMenuContext);
    if (!ctx) throw new Error("useMenuContext must be used inside MenuProvider");
    return ctx;
};
