import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { HostAPI, PluginRoute } from "./plugin-api";
import { baseRoutes } from "./routes";

type HookCallback<R = any> = (...args: any[]) => R;

interface HooksContextType {
    registerHook: (name: string, cb: HookCallback) => void;
    unregisterHook: (name: string) => void;
    hasHook: (name: string) => boolean;
    callHook: <R = any>(name: string, ...args: any[]) => R | undefined;
    setRoutes: React.Dispatch<React.SetStateAction<PluginRoute[]>>
    routes: PluginRoute[]
    api: HostAPI
}

const HooksContext = createContext<HooksContextType | null>(null);


// Create a global namespace if not exists
export const pluginRegistry = (window as any).pluginRegistry || ((window as any).pluginRegistry = {
    plugins: {} as Record<string, (api: HostAPI) => void>,
    registerPlugin: (name: string, plugin: (api: HostAPI) => void) => {
        (window as any).pluginRegistry.plugins[name] = plugin;
    },
    unregisterPlugin: (name: string, api: HostAPI) => {
        const plugin = (window as any).pluginRegistry.plugins[name];
        if (!plugin) return;
        // Plugins should optionally implement cleanup
        if ((plugin as any)._cleanup) (plugin as any)._cleanup(api);
        delete (window as any).pluginRegistry.plugins[name];
    },
});

/// Loads plugin as javascript, directly into the pluginRegistery
export function loadPlugin(url: string, name: string, api: HostAPI) {
    return new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = url;
        s.type = "module"; // allow ES modules
        s.onload = () => {
            const plugin = (window as any).pluginRegistry?.plugins[name];
            if (!plugin) return reject(`Plugin ${name} did not register itself`);
            plugin(api);
            resolve();
        };
        s.onerror = () => reject(`Failed to load plugin from ${url}`);
        document.head.appendChild(s);
    });
}

// Helper to register routes immediately
export function registerPluginRoute(name: string, plugin: (api: HostAPI) => void, api: HostAPI) {
    pluginRegistry.registerPlugin(name, plugin);
    plugin(api);
}


export const useHooks = () => {
    const context = useContext(HooksContext);
    if (!context) throw new Error("useHooks must be used within HooksProvider");
    return context;
};

export const HooksProvider = ({ children }: { children: ReactNode }) => {
    const hooksRef = useRef<Record<string, HookCallback>>({});
    const [routes, setRoutes] = useState<PluginRoute[]>(baseRoutes);

    const registerHook = (name: string, cb: HookCallback) => {
        hooksRef.current[name] = cb;
    };

    const unregisterHook = (name: string) => {
        delete hooksRef.current[name];
    };

    const hasHook = (name: string): boolean => {
        return name in hooksRef.current;
    };

    const callHook = (name: string, ...args: any[]): any => {
        const cb = hooksRef.current[name];
        if (!cb) return undefined;
        return cb(...args);
    };

    const api: HostAPI = {
        registerRoute: route => {
            setRoutes(prev => {
                if (prev.some(r => r.path === route.path)) return prev; // skip duplicates
                return [...prev, route];
            });
        },
        unregisterRoute: path => {
            setRoutes(prev => prev.filter(r => r.path !== path));
        },
        callHook,
        registerHook,
        unregisterHook
    };



    useEffect(() => {
        for (const plugin of window.PluginsEnabled) {
            loadPlugin(plugin.location, plugin.name, api)
                .then(() => console.log("Plugin loaded"))
                .catch(err => console.error(err));

        }

        return () => {
            for (const plugin of window.PluginsEnabled) {
                pluginRegistry.unregisterPlugin(plugin.name, api);
            }
        }

    }, []);


    return (
        <HooksContext.Provider value={{ registerHook, unregisterHook, hasHook, callHook, routes, setRoutes, api }}>
            {children}
        </HooksContext.Provider>
    );
};
