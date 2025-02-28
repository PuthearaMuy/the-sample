import {useNavigate} from "react-router-dom";
import AudioWave from "../../components/audio/AudioWave.tsx";
import {useEffect} from "react";
import {Container} from "@mui/material";

function SampleDetail() {

    const navigation = useNavigate();
    const pop = location.pathname.split("/").pop();
    if (!pop) {
        navigation("/home", {replace: true})
    }
    const id = Number(pop);

    useEffect(() => {

    }, []);

    return (<Container>
        <AudioWave id={id} isPlaying={false}/>
    </Container>)
}

export default SampleDetail;