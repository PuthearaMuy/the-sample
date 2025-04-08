import {Stack} from "@mui/material";
import "./TInput.css";
import {HTMLProps} from "react";

export interface InputProps extends HTMLProps<HTMLInputElement>{
    placeholder?: string;
    value?: string | number;
    name?: string;
    inputStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

function TInput(prop: InputProps) {
    return (
        <Stack width={'100%'} className={'t-custom-input-container'} style={prop.containerStyle}>
            <input style={prop.inputStyle} name={prop.name} placeholder={prop.placeholder}
                   value={prop.value}
                   className={'t-custom-input'} {...prop}/>
        </Stack>
    );
}

export default TInput;