import type { MenuItem, MenuLayer } from "./definitions";


export const mergeItems = (base: MenuItem[], incoming: MenuItem[]): MenuItem[] => {
    const map = new Map(base.map(item => [item.key, { ...item, children: item.children ? [...item.children] : undefined }]));

    for (const item of incoming) {
        const existing: any = map.get(item.key);
        if (!existing) {
            // clone incoming so we don't mutate original
            map.set(item.key, { ...item, children: item.children ? [...item.children] : undefined });
            continue;
        }

        // merge non-children props (incoming overrides)
        for (const k of Object.keys(item)) {
            if (k === 'children') continue;
            existing[k] = (item as any)[k];
        }

        // deep merge children only if incoming has children
        if (item.children) {
            existing.children = mergeItems(existing.children || [], item.children);
        }
        // if incoming has no children, keep existing.children as-is
    }

    return Array.from(map.values());
}

export const computeFinalMenu = (layers: MenuLayer[]): MenuItem[] => {
    let result: MenuItem[] = [];
    for (const layer of (layers || [])) {
        result = mergeItems(result, layer.items);
    }
    return result;
};