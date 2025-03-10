import {Container, Stack} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";
import AudioPreview from "../../components/audio/AudioPreview.tsx";
import {Controller, useForm} from "react-hook-form";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {useAppDispatch} from "../../state/store/store.ts";
import {setProcess} from "../../state/slice/ProcessSlice.ts";
import {useNavigate} from "react-router-dom";
import TInput from "../../components/input/TInput.tsx";
import TButton from "../../components/button/TButton.tsx";


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

    const {handleSubmit, control} = useForm<SampleUpload>();

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

            <Container sx={{marginTop: '30px'}}>

                <Stack direction={'row'} spacing={2} alignItems={'flex-end'} flexWrap={'wrap-reverse'}>
                    <Stack width={'75%'} spacing={2} direction={'column'} alignItems={'center'} flexGrow={1}>
                        <Controller render={({field}) => <TInput {...field} name={'title'} placeholder={'Title'}/>}
                                    name={'title'} control={control}/>

                        <Controller render={({field}) => <TInput {...field} name={'tempo'} type={'number'}
                                                                 placeholder={'Tempo'}/>} name={'tempo'}
                                    control={control}/>
                        <Controller render={({field}) => <TInput {...field} name={'sampleType'} placeholder={'Type'}/>}
                                    name={'sampleType'} control={control}/>
                        <Controller render={({field}) => <TInput {...field} name={'key'} placeholder={'Key'}/>}
                                    name={'key'} control={control}/>

                        <Controller
                            render={({field}) => <TInput {...field} name={'description'} placeholder={'Description'}/>}
                            name={'description'} control={control}/>

                        <Stack width={'100%'}>
                            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                                <TButton sx={{minWidth: '70px', padding: '10px', height: '40px'}} onClick={() => navigate("/home")}>Cancel</TButton>
                                <TButton sx={{
                                    minWidth: '70px',
                                    height: '40px',
                                    padding: '10px',
                                    '&:hover': {
                                        borderColor: 'var(--primary-bright-color)',
                                        color: 'var(--primary-bright-color)'
                                    }
                                }} onClick={handleSubmit(onSubmit)}
                                >Upload</TButton>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack width={'22%'} flexGrow={1}>
                        <Stack sx={{padding: '10px'}} alignItems={'center'}>

                            {
                                image &&
                                <img src={URL.createObjectURL(image)} className="logo" width={"100%"} style={{
                                    maxWidth: "250px",
                                    minWidth: "100px",
                                    maxHeight: "260px",
                                    borderRadius: '8px'
                                }} alt={"sample logo"}/>
                            }
                            <FileDrop label={"Sample logo"} onUpload={setImage}
                                      sx={{height: '260px', display: (image ? 'none' : 'flex')}}/>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}

export default Upload;