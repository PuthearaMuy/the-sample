import {Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Sample} from "../model/Sample.ts";
import {SampleServiceAPI} from "../service/SampleServiceAPI.ts";
import AudioWave from "../component/AudioWave.tsx";

function Home() {
    const [samples, setSamples] = useState<Sample[]>([]);

    useEffect(() => {
        SampleServiceAPI.getInstance().getSamples().then((response) => {
            const SampleResponse = response.data.content as Sample[];
            console.log(SampleResponse);
            setSamples(SampleResponse);
        })
    }, []);

    return (
        <>
            {samples.map((sample: Sample) => (
                <Container key={sample.id} maxWidth={"sm"}>
                    <Typography variant="body2" color="textSecondary">{sample.title}</Typography>
                    <AudioWave id={sample.id}/>
                </Container>)
            )}
        </>
    )
}

export default Home;