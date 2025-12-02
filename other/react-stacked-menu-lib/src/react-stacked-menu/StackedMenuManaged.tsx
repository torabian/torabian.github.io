import { useState } from "react";
import { useStackedMenuContext } from "./context";
import type { StackedMenuContextProps } from "./definitions";
import { StackedMenu } from "./StackedMenu";


export const StackedMenuManaged = (props: StackedMenuContextProps) => {
    const [currentSelection, setSelector] = useState<string>('')
    const { layers } = useStackedMenuContext()

    return <StackedMenu
        {...props}
        currentSelection={currentSelection}
        layers={layers[props.id]}
        setSelector={setSelector}
    />
};
