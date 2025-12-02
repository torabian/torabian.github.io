import type { MenuLayer } from "./definitions";

export const sampleMenu: MenuLayer[] = [
    {
        id: 'default',
        items: [

            // Changing component changes the li component itself,
            {
                content: 'Home',
                key: 'home',
                Component: (props) => <span>{props.depth} - {props.item.content as string}</span>
            },

            // Changing content, only changes the content inside of the menu.
            {
                content: () => <span>Sce<strong>ne</strong></span>,
                key: 'scene',
            },
            {
                content: 'Insert',
                key: 'insert',
                children: [
                    {
                        content: "Element",
                        key: "element",
                        children: [
                            { key: "Rebar", content: "Rebar" },
                            { key: "Bended rod", content: "Bended rod" },
                            { key: "Single Brick", content: "Single Brick" },
                            { key: "Hollow Brick", content: "Hollow Brick", Component: () => "Baa" },
                            { key: "Prefabricad Beam", content: "Prefabricad Beam" },
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'modify',
        items: [
            {
                key: 'insert',
                children: [
                    {
                        content: 'Hole',
                        key: 'hole',
                    }
                ]
            },
            {
                key: 'modify',
                content: 'Modify',
                children: [
                    {
                        key: 'transform',
                        content: "Trasform"
                    }
                ]
            },
        ]
    },
    {
        id: 'custom3',
        items: [
            {
                key: 'insert',
                children: [
                    {
                        key: 'element',
                        children: [
                            {
                                content: 'Double Brick',
                                key: 'double_brick'
                            }
                        ]
                    }
                ]
            },

        ]
    }
]