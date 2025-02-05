import {Box, Container, Grow, Modal, Stack, Typography} from "@mui/material";
import {Sample} from "../../model/Sample.ts";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import AudioWave from "../../components/audio/AudioWave.tsx";
import "./home.css";
import Loading from "../../components/Loading.tsx";
import {useQuery} from "@tanstack/react-query";
import React, {MouseEventHandler, useState} from "react";
import SampleAvatar from "../../components/SampleAvatar.tsx";

function Home(sample: Sample) {

    const sampleFocusModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--secondary-background-color)',
        minWidth: '300px',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        color: '#000000',
        padding: '20px',
    }

    const [playingId, setPlayingId] = useState(-1);
    const [focus, setFocus] = useState(false);

    const {data: samples, isLoading} = useQuery({
        queryKey: ["sampleKey"],
        queryFn: () => SampleServiceAPI.getInstance().getSamples(),
        select: (data) => {
            return data.data.content;
        },
    });

    const timeout = (index: number) => {
        return 500 * index;
    }

    function getFormatDate(timeStamp: number) {
        const date = new Date(timeStamp);
        return date.toLocaleDateString("en-US")
    }

    function handleFocusSample(sample: Sample, event: React.MouseEvent<HTMLDivElement>) {
        setFocus(true);
    }

    return (
        <>
            {isLoading && <Loading text="Loading..."/>}

            <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                <Stack width={'10%'}>

                </Stack>
                <Stack width={'80%'}>
                    <Stack sx={{paddingInline: '2em'}} spacing={2} justifyContent={"center"} alignItems={"center"}>
                        {samples?.map((sample: Sample, index: number) => (
                                <Grow key={index} in={true} timeout={timeout(index + 1)} style={{transformOrigin: '0 0 0'}}>
                                    <Container key={sample.id} maxWidth={"md"} className={'sample-container'}
                                               onClick={(event) => handleFocusSample(sample, event)}>

                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                                               alignContent={"center"} spacing={1}>

                                            <Container sx={{padding: '0 !important'}}>
                                                <Stack direction={"row"} justifyContent={"space-between"}>
                                                    <Typography>{sample.title}</Typography>
                                                    <Typography>{getFormatDate(sample.createDate)}</Typography>
                                                </Stack>
                                                <Stack direction={"row"} justifyContent={"space-between"}
                                                       color={"var(--primary-bright-color)"}>
                                                    <Typography>{sample.sampleType}</Typography>
                                                    <Typography>{sample.key}</Typography>
                                                </Stack>
                                            </Container>

                                            <Container sx={{width: 'unset', padding: '0 !important'}}>
                                                <SampleAvatar logo={sample.logo} sx={{width: '50px', height: '50px'}}/>
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
                </Stack>
                <Stack width={'10%'}>

                </Stack>
            </Stack>

            <Modal open={focus}>
                <Box sx={sampleFocusModalStyle}>
                </Box>
            </Modal>
        </>
    )
}

export default Home;