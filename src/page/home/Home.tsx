import {Avatar, Container, Typography} from "@mui/material";
import {Sample} from "../../model/Sample.ts";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import AudioWave from "../../components/AudioWave.tsx";
import meme from "../../assets/meme.jpg";
import "./home.css";
import Loading from "../../components/Loading.tsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

function Home() {

    const [playingId, setPlayingId] = useState(-1);

    const {data: samples, isLoading} = useQuery({
        queryKey: ["sampleKey"],
        queryFn: () => SampleServiceAPI.getInstance().getSamples(),
        select: (data) => data.data.content,
    });

    return (
        <>
            {isLoading && <Loading text="Loading..."/>}

            <Container sx={{display: 'flex', flexDirection: 'column', gap: '2em', padding: '2em'}}>
                {samples?.map((sample: Sample) => (
                    <Container key={sample.id} maxWidth={"md"} className={'sample-container'}>

                        <Container sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBlock: '5px',
                            paddingInline: '2px !important',
                            gap: '15px'
                        }}>
                            <Container sx={{padding: '0 !important'}}>
                                <Typography>{sample.title}</Typography>
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: '0 !important'
                                    }}>
                                    <Typography sx={{color: 'var(--primary-bright-color)'}}>{sample.key}</Typography>
                                    <Typography>{sample.createDate}</Typography>
                                </Container>
                            </Container>
                            <Container sx={{width: 'unset', padding: '0 !important'}}>
                                <Avatar alt="profile" src={meme} sx={{width: '60px', height: '60px'}}/>
                            </Container>
                        </Container>

                        <AudioWave id={sample.id} url={sample.url} onPlay={() => {
                            setPlayingId(sample.id)
                        }} isPlaying={sample.id === playingId}/>
                    </Container>)
                )}
            </Container>
        </>
    )
}

export default Home;