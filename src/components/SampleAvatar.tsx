import {Avatar, Skeleton, SxProps} from "@mui/material";
import {useEffect, useState} from "react";
import {SampleServiceAPI} from "../service/SampleServiceAPI.ts";

interface Props {
    logo: string;
    sx?: SxProps;
}

function SampleAvatar(props: Props) {
    const [image, setImage] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (props.logo) {
            SampleServiceAPI.getInstance().getSampleLogo(props.logo).then((res) => {
                setImage(URL.createObjectURL(res.data));
            })
        }
    }, [props.logo]);

    return (image ? (<Avatar alt="profile" src={image} sx={props.sx}/>) : (
        <Skeleton sx={{...props.sx, borderRadius: '20%'}} animation={'pulse'}/>));
}

export default SampleAvatar;