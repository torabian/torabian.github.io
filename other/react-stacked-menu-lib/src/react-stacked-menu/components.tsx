import type { ComponentType } from "react";
import type { BaseStackedMenuUlRenderProps, StackMenuItemProps } from "./definitions";

/**
 * You can copy this component, and create your custom menu item.
 * Please be aware, this is not entire <ul> element, rather the selectable part of list.
 * If you want to modify the entire ul, use DefaultUlComponent. That component receives depth as well,
 * so you can fully customize what happens on that level.
 * @param props 
 * @returns 
 */
export const DefaultLiItemComponent = (props: StackMenuItemProps) => {

    const M = props.item.content as ComponentType<any>
    const Content = typeof props.item.content === 'string' ? props.item.content : <M />
    return <button onClick={() => props.setSelector(props.currentSelector)}>
        {Content}
    </button>
}

/**
 * This component is the main render of the stacked menu.
 * If you want to override more than offered here, copy this menu, and inject it to
 * the stacked Menu
 * @param param0 
 * @returns 
 */
export const DefaultUlComponent = ({
    menuItems,
    setSelector,
    prefix,
    currentSelection,
    depth = 0,
    LiItemComponent,
    onTrigger
}: BaseStackedMenuUlRenderProps) => {
    // If the menu path is in selection, to show child by child
    const isSelected = currentSelection.startsWith(prefix || '') || depth === 0


    return <ul className={`${isSelected ? 'active' : ''} stack-menu-ul-depth-${depth}`}>
        {menuItems.map(item => {
            const Component = item.Component || LiItemComponent
            const currentSelector = (prefix ? prefix + '.' : '') + item.key
            return <li key={item.key}>
                {Component ? <Component
                    depth={depth}
                    currentSelector={currentSelector}
                    item={item}
                    setSelector={item.children ? setSelector : () => onTrigger?.(currentSelector)}
                /> : null}
                {item.children ?
                    <DefaultUlComponent
                        setSelector={setSelector}
                        menuItems={item.children}
                        prefix={currentSelector}
                        onTrigger={onTrigger}
                        depth={depth + 1}
                        LiItemComponent={LiItemComponent}
                        currentSelection={currentSelection}
                    />
                    : null}
            </li>
        })}
    </ul>
}
