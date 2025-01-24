import {Button, Container, Stack, TextField} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";
import AudioPreview from "../../components/audio/AudioPreview.tsx";

function Upload() {

    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
    const [image, setImage] = useState<File | undefined>(undefined);

    function isAudioFile(file: File) {
        if (file && file.type.includes("audio/")) {
            return true;
        }
        return false;
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

                <Stack direction={'row'} spacing={2} alignItems={'center'} flexWrap={'wrap-reverse'}>
                    <Stack width={'75%'} spacing={2} direction={'column'} alignItems={'center'} flexGrow={1}>
                        <TextField
                            // label="Error"
                            // defaultValue="Hello World"
                            placeholder={'Please enter title.'}
                            fullWidth={true}
                        />
                        <Stack spacing={2} direction={'row'} width={'100%'}>
                            <TextField
                                // label="Error"
                                // defaultValue="Hello World"
                                placeholder={'Tempo'}
                                fullWidth={true}
                            />
                            <TextField
                                // label="Error"
                                // defaultValue="Hello World"
                                placeholder={'Type'}
                                fullWidth={true}
                            />
                        </Stack>
                        <TextField
                            // label="Error"
                            // defaultValue="Hello World"
                            placeholder={'Description'}
                            fullWidth={true}
                        />
                        <Stack width={'100%'}>
                            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                                <Button color={'primary'} variant="outlined"
                                        sx={{minWidth: '100px', textTransform: 'capitalize'}}>Cancel</Button>
                                <Button color={'primary'} variant="contained"
                                        sx={{minWidth: '100px', textTransform: 'capitalize'}}>Upload</Button>
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
                                        borderRadius: '8px'
                                    }} alt={"meme"}/>
                                ) : (
                                    <FileDrop label={"Hi file"} onUpload={setImage}/>
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