import {Container, Stack, TextField} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";
import AudioPreview from "../../components/audio/AudioPreview.tsx";
import {Image} from "@mui/icons-material";
import meme from "../../assets/meme.jpg";

function Upload() {

    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);

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
                                     onUpload={(file: File) => setAudioFile(file)}/>)
                }
            </Container>

            <Container>

                <Stack direction={'row'} spacing={2} alignItems={'flex-start'}>
                    <Stack width={'80%'} spacing={2} direction={'row'} alignItems={'center'} padding={2}>
                        <TextField
                            // label="Error"
                            // defaultValue="Hello World"
                            placeholder={'Please enter title.'}
                            helperText="Please select your currency"
                        />
                    </Stack>
                    <Stack>
                        <Container sx={{padding: '10px'}}>
                        <img src={meme} className="logo" width={"100%"} style={{
                            maxWidth: "500px",
                            borderRadius: '8px'
                        }} alt={"meme"}/>
                        </Container>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}

export default Upload;