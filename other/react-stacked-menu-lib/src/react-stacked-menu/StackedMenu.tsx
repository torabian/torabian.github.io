import { useMemo } from "react";
import { DefaultLiItemComponent, DefaultUlComponent } from "./components";
import { computeFinalMenu } from "./compute";
import type { StackedMenuProps } from "./definitions";

export const StackedMenu = ({
    LiItemComponent = DefaultLiItemComponent,
    UlComponent = DefaultUlComponent,
    layers,
    currentSelection,
    setSelector,
    appendClass,
    onTrigger,
}: StackedMenuProps) => {

    const menu = useMemo(() => {
        return computeFinalMenu(layers)
    }, [])

    // If developer wants to override the menu
    const wrapperClass = ("react-stacked-menu" + (" " + (appendClass || ""))).trim()

    return (
        <div className={wrapperClass}>
            <UlComponent
                LiItemComponent={LiItemComponent}
                depth={0}
                currentSelection={currentSelection}
                setSelector={setSelector}
                menuItems={menu}
                onTrigger={onTrigger}
            />
        </div>
    );
};
