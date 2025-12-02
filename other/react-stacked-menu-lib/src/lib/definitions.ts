import type { ComponentType } from "react";

export type ISetSelector = (selector: string) => void

export type MenuProviderProps = {
    children: React.ReactNode,
    defaultState?: { [key: string]: MenuLayer[] }
};

export type StackMenuItemProps = {
    item: MenuItem
    setSelector: ISetSelector
    currentSelector: string;
    depth: number;
}

export type MenuItem = {
    key: string;
    content?: string | ComponentType<any>;

    /// How to make this a react component, with specific props
    Component?: ComponentType<StackMenuItemProps>;
    icon?: string;
    onSelect?: () => void;
    href?: string;
    children?: MenuItem[];
};

export type MenuLayer = {
    id: string; // layer id, e.g., "default", "page-xyz", "component-abc"
    items: MenuItem[];
};

export type MenuContextType = {
    layers: { [key: string]: MenuLayer[] };
};

/**
 * The props that recursive menu renderer will recieve.
 * This is extracted, so you can create your custom component, if needed.
 * Your component needs to recieve these props.
 */
export type BaseStackedMenuUlRenderProps = {
    /**
     * The current menu selector, which if be used in setSelector, will make the menu to change.
     */
    prefix?: string,

    /**
     * @description Menu items at the level, with their children.
     */
    menuItems: MenuItem[],

    /**
     * @description Function that comes from the stacked menu, to set the selection, to activate menu
     */
    setSelector: ISetSelector,

    /**
     * @description Indication of current menu selection, to add 'active' class to menu
     */
    currentSelection: string,

    /**
     * Depth of menu rendering, starting from zero for first level, which usually you want it to be visible.
     */
    depth: number,

    /**
     * The component, which will be rendering the menu item, before adding another ul, for it's children.
     */
    LiItemComponent: ComponentType<StackMenuItemProps>


    onTrigger?: (selector: string) => void
}


/**
 * This component wrapps the StackedMenu component, but has fewer parameters,
 * because it would manage the menu fully in context.
 * Each menu need to have a unique id, because layers of each menu goes to the id,
 * therefor a single context can manage all menus in the app.
 */
export type StackedMenuContextProps = {
    LiItemComponent?: ComponentType<StackMenuItemProps>,
    UlComponent?: ComponentType<BaseStackedMenuUlRenderProps>,
    id: string;

    onTrigger?: (selector: string) => void
}

/**
 * Unmanaged StackedMenu component props.
 * Has no side effect or context; user needs to handle the layers, selection, and changes to the selected path.
 */
export type StackedMenuProps = {
    /**
     * Override the list item component, which is generally a button by default, to open the next menu, or if has no
     * children, it would trigger an event.
     */
    LiItemComponent?: ComponentType<StackMenuItemProps>,

    /**
     * Override the main recursive list items. Every menu starts with a ul, and then
     * it would place a LiItemComponent first, and under it, li+n items, and if children,
     * it would use UlComponent recursively again.
     */
    UlComponent?: ComponentType<BaseStackedMenuUlRenderProps>,

    /**
     * Pre-computed layers, which would coming as an array, and Stacked Menu would compute them and 
     * render the final result, by applying rules, logic, and more.
     */
    layers: MenuLayer[],

    /**
     * Current menu selection value, separated by . which is an string.
     * main.tools.brush, means now user sees the third level menu.
     * empty or null, means no selection at all.
     */
    currentSelection: string,

    /**
     * Sets the menu selection tree. When user clicks on next menu, this will be called, with selection tree path as string,
     * and you need to store it into the state or context.
     * @param selection 
     * @returns 
     */
    setSelector: (selection: string) => void,


    /**
     * By default, the menu has a wrapper class name.
     * If appendClass property is there, it would add something to that class, instead of cleaning it all
     */
    appendClass?: string;


    /**
     * If a menu has no children, instead of opening, it would trigger this function.
     * and then from selector you can take further actions.
     * @param selector 
     * @returns 
     */
    onTrigger?: (selector: string) => void
}
