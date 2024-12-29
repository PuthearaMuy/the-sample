import WaveSurfer from "wavesurfer.js";
import {SampleServiceAPI} from "../service/SampleServiceAPI.ts";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {Container, IconButton} from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface Props {
    id: number;
    url: string;
    isPlaying: boolean;
    onPlay?: any;

}

function AudioWave({id, url, isPlaying, onPlay}: Props) {
    const [wave, setWave] = useState<WaveSurfer>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        SampleServiceAPI.getInstance().getSampleAudio(url).then((response: AxiosResponse<Blob>) => {
            const url = URL.createObjectURL(response.data);
            const wave = WaveSurfer.create({
                container: "#waveform" + id,
                waveColor: '#ffffff',
                progressColor: '#7fdeff',
                url: url,
                height: 100,
            });
            wave.on(('finish'), () => setPlaying(false))
            setWave(wave);
        })
    }, []);

    useEffect(() => {
        if (wave && wave.isPlaying() && !isPlaying) {
            wave.pause();
            setPlaying(false);
        }
    }, [isPlaying, wave]);

    function play() {
        if (wave) {
            if (playing) {
                wave.pause();
                setPlaying(false);
            } else {
                wave.play();
                setPlaying(true);
                onPlay();
            }
        }
    }

    return (
        <Container
            sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', padding: '0 !important'}}>
            <div id={"waveform" + id} style={{width: '100%'}}></div>

            {wave && (
                <IconButton size="large" sx={{height: '100%'}} color={"inherit"} onClick={play}>
                    {playing ? (<PauseCircleIcon fontSize="inherit"/>) : (<PlayCircleIcon fontSize="inherit"/>)}
                </IconButton>
            )}

        </Container>
    );
}

export default AudioWave;