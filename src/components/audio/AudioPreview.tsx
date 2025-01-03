import {useEffect, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {IconButton, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AudioPreview({file, onClose}: { file: File, onClose?: () => void }) {

    const [wave, setWave] = useState<WaveSurfer | undefined>(undefined);
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        const url = URL.createObjectURL(file);
        const waveSuffer = WaveSurfer.create({
            container: "#audio-preview",
            url: url,
            waveColor: '#ffffff',
            progressColor: '#7fdeff',
            height: 100,
        })

        setWave(waveSuffer);
    }, [file]);


    function play() {
        if (wave) {
            if (wave.isPlaying()) {
                wave.pause();
                setPlaying(false);
            } else {
                wave.play();
                setPlaying(true);
            }
        }
    }

    return (
        <>
            <Stack direction={'row'} spacing={2} alignItems={'center'} width={"100%"}>
                {
                    wave && (

                        <IconButton sx={{height: '100%', fontSize: '30px', marginLeft: '0 !important'}} color={"inherit"}
                                    onClick={play}>
                            {playing ? (<PauseCircleIcon fontSize="inherit"/>) : (
                                <PlayCircleIcon fontSize="inherit"/>)}
                        </IconButton>
                    )
                }

                <div id={"audio-preview"} style={{width: '100%', height: '100%'}}></div>

                {wave && (
                    <IconButton sx={{height: '100%', fontSize: '30px', marginLeft: '0 !important'}} color={"inherit"}
                                onClick={onClose}>
                        <CloseIcon fontSize="inherit" color={'warning'}/>
                    </IconButton>
                )}
            </Stack>


        </>
    );
}

export default AudioPreview;