import {Collapse, Container, Grow, IconButton, LinearProgress, Stack, Typography} from "@mui/material";
import {Sample} from "../../model/Sample.ts";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import AudioWave from "../../components/audio/AudioWave.tsx";
import "./home.css";
import Loading from "../../components/Loading.tsx";
import {useQuery} from "@tanstack/react-query";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import SampleAvatar from "../../components/SampleAvatar.tsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import {SampleDetail} from "../../model/SampleDetail.ts";
import {useSnackbar} from "notistack";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

interface AudioCardProps {
    sample: Sample;
    playingId: number;
    setPlayingId: Dispatch<SetStateAction<number>>;
}

function AudioCard(props: AudioCardProps) {
    const sample = props.sample;
    const [collapse, setCollapse] = useState(false);
    const [detail, setDetail] = useState<SampleDetail | undefined>(undefined);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (collapse && !detail) {
            SampleServiceAPI.getInstance().getSampleDetail(sample.id).then((res) => {
                const detailData = res.data as SampleDetail;
                setDetail(detailData);
            });
        }
    }, [collapse, detail, sample.id]);

    function getFormatDate(timeStamp: number) {
        const date = new Date(timeStamp);
        return date.toLocaleDateString("en-US")
    }

    function handleClickOnSample() {
        setCollapse(prev => !prev);
    }

    function handleSendToEmail(id: number) {
        navigate("/home/" + id)
    }

    function handleDownload() {
        enqueueSnackbar("Download");
        SampleServiceAPI.getInstance().downloadSample(sample.id).then((response: AxiosResponse<Blob>) => {
            const url = URL.createObjectURL(response.data);
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = contentDisposition.split("filename=")[1];
            fileName = fileName.substring(1, fileName.length - 1);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();

            setTimeout(() => {
                downloadLink.remove();
                URL.revokeObjectURL(url);
            }, 100);
        });
    }

    return (
        <Container key={sample.id} maxWidth={"md"} className={'sample-container'}>

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

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <AudioWave id={sample.id} onPlay={() => {
                    props.setPlayingId(sample.id)
                }} isPlaying={sample.id === props.playingId}/>
                <IconButton sx={{height: '100%'}} color={"inherit"} onClick={handleClickOnSample}>
                    <MoreHorizIcon fontSize="small"/>
                </IconButton>
            </Stack>


            <Collapse in={collapse}>
                {detail ?
                    <Stack paddingTop={'10px'} direction={'row'} justifyContent={'space-between'}
                           alignItems={'flex-start'}>
                        <Stack>
                            <Typography color={"var(--primary-bright-color)"}
                                        sx={{fontSize: '12px'}}>Owner: {detail.ownerInfo.username}</Typography>
                            <Typography
                                sx={{fontSize: '12px', wordBreak: 'break-word'}}>{detail?.description}</Typography>
                        </Stack>
                        <Stack direction={'row'}>
                            <IconButton sx={{height: '100%'}} color={"inherit"}
                                        onClick={() => handleSendToEmail(sample.id)}>
                                <SendIcon fontSize="small"/>
                            </IconButton>
                            <IconButton sx={{height: '100%'}} color={"inherit"} onClick={handleDownload}>
                                <DownloadIcon fontSize="small"/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    :
                    collapse &&
                    <Stack paddingBlock={'10px'}><LinearProgress variant="indeterminate" color={'primary'}/></Stack>
                }
            </Collapse>


        </Container>
    );
}

function Home() {

    const [playingId, setPlayingId] = useState(-1);

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
                                    <Container>
                                        <AudioCard sample={sample} playingId={playingId} setPlayingId={setPlayingId}/>
                                    </Container>
                                </Grow>
                            )
                        )}
                    </Stack>
                </Stack>
                <Stack width={'10%'}>

                </Stack>
            </Stack>
        </>
    )
}

export default Home;