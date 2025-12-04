import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import type { MenuContextType, MenuLayer, MenuProviderProps } from "./definitions";

export const StackedMenuContext = createContext<MenuContextType | undefined>(undefined);

export const StackedMenuProvider: React.FC<MenuProviderProps> = ({ children, defaultState }) => {
    const [layers, setLayers] = useState<{ [key: string]: MenuLayer[] }>(defaultState || {});

    /** Add a layer */
    const addLayer = useCallback((key: string, layer: MenuLayer) => {
        setLayers(prev => ({ ...prev, [key]: [...(prev[key] || []), layer] }));
    }, []);

    /** Remove a layer by id */
    const removeLayer = useCallback((key: string, layerId: string) => {
        setLayers(prev => ({ ...prev, [key]: (prev[key] || []).filter(l => l.id !== layerId) }));
    }, []);


    return (
        <StackedMenuContext.Provider
            value={{ layers, addLayer, removeLayer, }}
        >
            {children}
        </StackedMenuContext.Provider>
    );
};

export const useLayer = (menuId: string, layer: MenuLayer) => {
    const { addLayer, removeLayer } = useStackedMenuContext()
    useEffect(() => {
        addLayer(menuId, layer)

        return () => removeLayer(menuId, layer.id)
    }, [])
}

export const useStackedMenuContext = () => {
    const ctx = useContext(StackedMenuContext);
    if (!ctx) throw new Error("useMenuContext must be used inside MenuProvider");
    return ctx;
};
