import WaveSurfer from "wavesurfer.js";
import {SampleServiceAPI} from "../service/SampleServiceAPI.ts";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

function AudioWave(prop: {id: number}) {

    const [wave, setWave] = useState<WaveSurfer>(null);

    useEffect(() => {
        SampleServiceAPI.getInstance().getSampleAudio(prop.id).then((response: AxiosResponse<Blob>) => {
            const url = URL.createObjectURL(response.data);
            // response.data as Blob;
            // console.log(URL.createObjectURL(blob));
            const wave = WaveSurfer.create({
                container: '#waveform' + prop.id,
                waveColor: '#ffffff',
                progressColor: '#7fdeff',
                url: url,
            });
            setWave(wave);
        })
    }, []);

    function play() {
        if (wave) {
            wave.play();
        }
    }

    function pause() {
        if (wave) {
            wave.pause();
        }
    }

    return (
        <>
            <div id={"waveform" + prop.id} onClick={play}></div>
            {/*<LinearProgress />*/}
        </>);
}

export default AudioWave;