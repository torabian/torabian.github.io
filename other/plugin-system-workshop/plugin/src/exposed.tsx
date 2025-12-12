import type { HostAPI } from "../../host/src/plugin-api";
import { PluginPage } from "./PluginPage";

// Default export function that host will call
export default function register(api: HostAPI) {
    const path = "/plugin-page";

    api.registerRoute({
        path,
        label: "Plugin Page",
        component: PluginPage,
    });

    // Attach cleanup so host can unregister later
    (register as any)._cleanup = (api: HostAPI) => {
        api.unregisterRoute(path);
    };


    api.registerHook('on_bmi_calculated', function (value) {
        const selectedColor = localStorage.getItem('selected_color')

        if (selectedColor) {
            return <span style={{ color: selectedColor }}>{value}</span>
        }

        return 'No color selected!:' + value
    })
}

// Attach to global plugin registry if it exists
if ((window as any).pluginRegistry) {
    (window as any).pluginRegistry.registerPlugin("my-plugin", register);
}
