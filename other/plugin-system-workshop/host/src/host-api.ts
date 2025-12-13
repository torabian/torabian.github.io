import type React from "react";

/**
 * Represents a single route that a plugin can add to the host application.
 */
export interface PluginRoute {
    /** The path for the route (used in react-router) */
    path: string;

    /** The label or name of the route (used for menus or navigation) */
    label: string;

    /** The React component to render when the route is active */
    component: React.FC;
}

/**
 * A callback function that can be registered as a hook.
 * Plugins can register functions to react to certain events or modify data.
 */
export type HookCallback = (...args: any[]) => any;

/**
 * API exposed by the host application to plugins.
 * Plugins use this to register/unregister routes and hooks, 
 * and to trigger hooks.
 */
export interface HostAPI {
    /**
     * Adds a new route to the host application.
     * @param route The route object containing path, label, and component
     */
    registerRoute(route: PluginRoute): void;

    /**
     * Removes a previously registered route by its path.
     * @param path The route path to remove
     */
    unregisterRoute(path: string): void;

    /**
     * Registers a hook function under a specific name.
     * Multiple plugins can register hooks for the same event name.
     * @param name The hook name (e.g., "on_bmi_calculated")
     * @param cb The callback function to execute when the hook is called
     */
    registerHook(name: string, cb: HookCallback): void;

    /**
     * Unregisters a previously registered hook function.
     * @param name The name of the hook
     * @param cb The exact callback function to remove
     */
    unregisterHook(name: string, cb: HookCallback): void;

    /**
     * Calls all registered hooks for a given name with provided arguments.
     * @param name The hook name
     * @param args Arguments to pass to each registered hook
     */
    callHook(name: string, ...args: any[]): any;
}
