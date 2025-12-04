import { useState } from "react";
import { useStackedMenuContext } from "./context";
import type { StackedMenuContextProps } from "./definitions";
import { StackedMenu } from "./StackedMenu";

/**
 * If you want to use with a global context. If you don't, simply use <StackedMenu
 * which is only a component
 * @param props 
 * @returns 
 */
export const StackedMenuManaged = (props: StackedMenuContextProps) => {
    const [currentSelection, setSelector] = useState<string>(props.defaultSelector || '')
    const { layers } = useStackedMenuContext()

    return <StackedMenu
        {...props}
        currentSelection={currentSelection}
        layers={layers[props.id]}
        setSelector={setSelector}
    />
};
