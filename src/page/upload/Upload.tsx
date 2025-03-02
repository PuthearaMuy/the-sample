import {Button, Container, Stack, TextField} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";
import AudioPreview from "../../components/audio/AudioPreview.tsx";
import {useForm} from "react-hook-form";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {useAppDispatch} from "../../state/store/store.ts";
import {setProcess} from "../../state/slice/ProcessSlice.ts";
import {useNavigate} from "react-router-dom";

export interface SampleUpload {
    file: File;
    title: string;
    sampleType: string;
    tempo: number;
    key: string;
    description: string;
}

function Upload() {

    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
    const [image, setImage] = useState<File | undefined>(undefined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<SampleUpload>();

    function isAudioFile(file: File) {
        return file && file.type.includes("audio/");
    }

    function onSubmit(data: SampleUpload) {
        const formData = new FormData();
        if (audioFile) {
            formData.append("file", audioFile);
        }
        if (image) {
            formData.append("logo", image);
        }
        formData.append("title", data.title);
        formData.append("sampleType", data.sampleType);
        formData.append("key", data.key);
        formData.append("tempo", '' + data.tempo);
        formData.append("description", data.description);
        SampleServiceAPI.getInstance().uploadSample(formData, progressEvent => {
            if (progressEvent.progress) {
                dispatch(setProcess({
                    process: Math.round(progressEvent.progress * 100)
                }));
            }
        }).then((res) => {
            const data = res.data;
            navigate("/upload/" + data.id);
        }).finally(() => dispatch(setProcess({
            process: -1
        })));
    }

    return (
        <>
            <Container sx={{height: "120px"}}>
                {
                    audioFile ?
                        (
                            <Stack>
                                <AudioPreview file={audioFile} onClose={() => setAudioFile(undefined)}/>
                            </Stack>
                        )
                        : (<FileDrop label={"please drop your stolen file 🔪🔪"}
                                     acceptType={"audio/*"}
                                     onUpload={(file: File) => setAudioFile(file)} validation={isAudioFile}/>)
                }
            </Container>

            <Container sx={{marginTop: '10px'}}>

                <Stack direction={'row'} spacing={2} alignItems={'flex-end'} flexWrap={'wrap-reverse'}>
                    <Stack width={'75%'} spacing={2} direction={'column'} alignItems={'center'} flexGrow={1}>
                        <TextField
                            // label="Error"
                            // defaultValue="Hello World"
                            placeholder={'Please enter title.'}
                            fullWidth={true}
                            {...register("title")}
                        />
                        <Stack spacing={2} direction={'row'} width={'100%'}>
                            <TextField
                                // label="Error"
                                // defaultValue="Hello World"
                                placeholder={'Tempo'}
                                fullWidth={true}
                                type={'number'}
                                {...register("tempo")}
                            />
                            <TextField
                                // label="Error"
                                // defaultValue="Hello World"
                                placeholder={'Type'}
                                fullWidth={true}
                                {...register("sampleType")}
                            />
                        </Stack>
                        <TextField
                            // label="Error"
                            // defaultValue="Key"
                            placeholder={'Key'}
                            fullWidth={true}
                            {...register("key")}
                        />
                        <TextField
                            // label="Error"
                            // value="Description doesn't supported"
                            placeholder={'Description'}
                            fullWidth={true}
                            {...register("description")}
                        />
                        <Stack width={'100%'}>
                            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                                <Button color={'primary'} variant="outlined"
                                        sx={{minWidth: '100px', textTransform: 'capitalize'}}
                                        onClick={() => navigate(-1)}>Cancel</Button>
                                <Button color={'primary'} variant="contained"
                                        sx={{minWidth: '100px', textTransform: 'capitalize'}}
                                        onClick={handleSubmit(onSubmit)}>Upload</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack width={'22%'} flexGrow={1}>
                        <Stack sx={{padding: '10px'}} alignItems={'center'}>

                            {image ?
                                (
                                    <img src={URL.createObjectURL(image)} className="logo" width={"100%"} style={{
                                        maxWidth: "250px",
                                        minWidth: "100px",
                                        maxHeight: "260px",
                                        borderRadius: '8px'
                                    }} alt={"meme"}/>
                                ) : (
                                    <FileDrop label={"Hi file"} onUpload={setImage} sx={{minHeight: '260px'}}/>
                                )
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}

export default Upload;