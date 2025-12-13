import { useEffect, useState } from "react";
import { Title } from "./title";
import { CirclePicker } from 'react-color'

export const PluginPage = () => {

    const [value, setValue] = useState('')


    useEffect(() => {
        localStorage.setItem('selected_color', value)
    }, [value])

    return <>
        <Title />
        <span className="heaer bt-2 bold">
            This is react from plugin. We have installed color picker, to show this plugin
            can easily include npm package and work correctly.
            <br />
            {value}
        </span>
        <CirclePicker color={value} onChange={(e) => {
            setValue(e.hex)
        }} />
    </>
}
