import {Avatar, Container, Grow, Stack, Typography} from "@mui/material";
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

    const timeout = (index: number) => {
        return 500 * index;
    }

    return (
        <>
            {isLoading && <Loading text="Loading..."/>}

            <Stack sx={{padding: '2em'}} spacing={2} justifyContent={"center"} alignItems={"center"}>
                {samples?.map((sample: Sample, index: number) => (
                        <Grow key={index} in={true} timeout={timeout(index + 1)} style={{transformOrigin: '0 0 0'}}>
                            <Container key={sample.id} maxWidth={"md"} className={'sample-container'}>

                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                                       alignContent={"center"} spacing={1}>

                                    <Container sx={{padding: '0 !important'}}>
                                        <Stack direction={"row"} justifyContent={"space-between"}>
                                            <Typography>{sample.title}</Typography>
                                            <Typography>{sample.createDate}</Typography>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"}
                                               color={"var(--primary-bright-color)"}>
                                            <Typography>{sample.sampleType}</Typography>
                                            <Typography>{sample.key}</Typography>
                                        </Stack>
                                    </Container>

                                    <Container sx={{width: 'unset', padding: '0 !important'}}>
                                        <Avatar alt="profile" src={meme} sx={{width: '60px', height: '60px'}}/>
                                    </Container>
                                </Stack>

                                <AudioWave id={sample.id} url={sample.url} onPlay={() => {
                                    setPlayingId(sample.id)
                                }} isPlaying={sample.id === playingId}/>
                            </Container>
                        </Grow>
                    )
                )}
            </Stack>
        </>
    )
}

export default Home;