import WaveSurfer from "wavesurfer.js";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {useEffect, useRef, useState} from "react";
import {AxiosResponse} from "axios";
import {Container, IconButton, Skeleton} from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface Props {
    id: number;
    isPlaying: boolean;
    onPlay?: () => void;
}

function AudioWave({id, isPlaying, onPlay}: Props) {
    const [wave, setWave] = useState<WaveSurfer | undefined>(undefined);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const waveRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        SampleServiceAPI.getInstance().getSampleAudio(id).then((response: AxiosResponse<Blob>) => {
            const url = URL.createObjectURL(response.data);
            if (waveRef.current) {

                if (waveRef.current.innerHTML) {
                    waveRef.current.childNodes.forEach(element => element.remove());
                }

                const waveSurfer = WaveSurfer.create({
                    container: waveRef.current,
                    waveColor: '#ffffff',
                    progressColor: '#7fdeff',
                    url: url,
                    height: 100,
                });

                waveSurfer.on(('finish'), () => setPlaying(false))
                waveSurfer.on(('ready'), () => setLoading(false));

                setWave(waveSurfer);
            }
        })
    }, [id]);

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

                if (onPlay) {
                    onPlay();
                }
            }
        }
    }

    return (
        <>
            {loading && <Skeleton height={100} width={'100%'} animation={'pulse'}/>}
            <Container
                sx={{
                    display: (loading ? 'none' : 'flex'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 !important'
                }}>
                <div ref={waveRef} style={{width: '100%'}}></div>

                {wave && (
                    <IconButton sx={{height: '100%', fontSize: '2em'}} color={"inherit"} onClick={play}>
                        {playing ? (<PauseCircleIcon fontSize="inherit"/>) : (
                            <PlayCircleIcon fontSize="inherit"/>)}
                    </IconButton>
                )}

            </Container>

        </>
    );
}

export default AudioWave;