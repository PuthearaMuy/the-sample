import {useEffect, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {IconButton, Skeleton, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AudioPreview({file, onClose}: { file: File, onClose?: () => void }) {

    const [wave, setWave] = useState<WaveSurfer | undefined>(undefined);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        const waveSurfer = WaveSurfer.create({
            container: "#audio-preview",
            url: url,
            waveColor: '#ffffff',
            progressColor: '#7fdeff',
            height: 100,
        })
        waveSurfer.on(('finish'), () => setPlaying(false))
        waveSurfer.on(('ready'), () => setLoading(false));

        setWave(waveSurfer);
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
            <Stack direction={'row'} spacing={2} alignItems={'center'}
                   sx={{backgroundColor: 'var(--secondary-background-color)', borderRadius: '8px', padding: '10px'}}>

                {loading && <Skeleton height={"100px"} width={'100%'} animation={'pulse'}/>}
                <div id={"audio-preview"}
                     style={{width: '100%', height: '100%', display: (loading ? 'none' : 'block')}}></div>

                {wave && (
                    <Stack>
                        <IconButton sx={{height: '100%', fontSize: '30px', marginLeft: '0 !important'}}
                                    color={"inherit"}
                                    onClick={onClose}>
                            <CloseIcon fontSize="inherit" color={'warning'}/>
                        </IconButton>

                        <IconButton sx={{height: '100%', fontSize: '30px', marginLeft: '0 !important'}}
                                    color={"inherit"}
                                    onClick={play}>
                            {playing ? (<PauseCircleIcon fontSize="inherit"/>) : (
                                <PlayCircleIcon fontSize="inherit"/>)}
                        </IconButton>
                    </Stack>
                )}
            </Stack>


        </>
    );
}

export default AudioPreview;