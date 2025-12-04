import type { MenuLayer } from "./react-stacked-menu";

export const actionCenter: MenuLayer[] = [
    {
        id: 'essential',
        items: [
            {
                key: 'home',
                content: 'Home',
                children: [
                    {
                        key: "drawing",
                        content: "Drawing",
                        children: [
                            { key: 'LoadDrawing', content: "Load" },
                            { key: 'SaveDrawing', content: "Save" },
                            { key: 'Reset', content: "Reset" },
                        ],
                    },
                    {
                        content: "Samples",
                        key: "samples",
                        children: [
                            {
                                key: 'OpenSample_Steel_Rebar',
                                content: "Steel Rebar",
                                meta: {
                                    file: "steel-rebar"
                                }
                            },
                            {
                                key: 'OpenSample_Rebar_With_Column',
                                content: "Rebar with column",
                                meta: {
                                    file: "rebar-with-column"
                                }
                            },
                            {
                                key: 'OpenSample_Torabi_Garage',
                                content: "Torabi Garage",
                                meta: {
                                    file: "torabi-garage"
                                }
                            },
                        ],
                    },
                ],
            },
            {

                key: "scene",
                content: "Scene",
                children: [
                    {
                        key: "action",
                        content: "Action",
                        children: [
                            { key: 'Deselect', content: "Deselect" },
                            { key: 'ArMode', content: "AR Mode" },
                            { key: 'VrMode', content: "VR Mode" },
                        ],
                    },
                ],
            },
            {
                key: "Insert",
                content: "Insert",
                children: [
                    {
                        key: "elements",
                        content: "Elements",
                        children: [
                            { key: 'Rebar', content: "Rebar" },
                            { key: 'BendedRod', content: "Bended rod" },
                            { key: 'InsertBrick', content: "Single Brick" },
                            { key: 'HollowBrick', content: "Hollow Brick" },
                            {
                                key: 'InsertPrefabricatedBeam',
                                content: "Prefabricad Beam",
                            },
                        ],
                    },
                    {
                        key: "complex",
                        content: "Complex",
                        children: [
                            { key: 'CreateGableWall', content: "Gable Wall" },
                            { key: 'BrickGridWall', content: "Brick Grid Wall" },
                            { key: 'DimensionWall', content: "Dimension Wall" },
                            { key: 'GarageDoor', content: "Garage Door" },
                            { key: 'ExteriorDoor', content: "Exterior Door" },
                            {
                                key: 'InsertPrefabricatedBeam',
                                content: "Prefabricad Beam",
                            },
                            { key: 'ReinforcedSlab', content: "Structural Slab" },
                            { key: 'RebarMesh', content: "Rebar Mesh" },
                            { key: 'Staircase', content: "Staircase" },
                        ],
                    },
                    {
                        key: "foundation",
                        content: "Foundation",
                        children: [
                            { key: 'CreateFoundation', content: "Foundation" },
                            {
                                key: 'FoundationInsulation',
                                content: "Polystyrene Insulation",
                            },
                        ],
                    },
                    {
                        key: "common",
                        content: "Common",
                        children: [
                            { key: 'CommonWindow', content: "Window" },
                            { key: 'InsertWindow', content: "Commerical Window" },
                        ],
                    },
                ],
            },
            // {
            //     key: "Computed",
            //     children: [
            //         {
            //             key: "elements",
            //             content: "Elements",
            //             children: [
            //                 {
            //                     key: 'InsertDynamicElement',
            //                     content: "Dimension Wall",
            //                 },
            //                 {
            //                     key: 'InsertDynamicElement',
            //                     content: "Staircase",
            //                 },
            //                 {
            //                     key: 'InsertDynamicElement',
            //                     content: "Teriva Roof",
            //                 },
            //                 {
            //                     key: 'InsertDynamicElement',
            //                     content: "Reinforced Slab",
            //                 },
            //                 {
            //                     key: 'InsertDynamicElement',
            //                     content: "Monolithic Lintel",
            //                 },
            //             ],
            //         },
            //     ],
            // },

            // {
            //     key: "Export",
            //     children: [
            //         {
            //             key: "bill_of_material",
            //             content: "Build of material",
            //             children: [{ key: 'BillOfMaterial', content: "View" }],
            //         },
            //     ],
            // },
        ]
    }
]