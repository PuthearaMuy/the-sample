import {Container, Stack} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";
import AudioPreview from "../../components/audio/AudioPreview.tsx";

function Upload() {

    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);

    return (
        <>
            <Container sx={{height: "100px"}}>
                {
                    audioFile ?
                        (
                            <Stack>
                                <AudioPreview file={audioFile} onClose={() => setAudioFile(undefined)} />
                            </Stack>
                        )
                        : (<FileDrop label={"please drop your stolen file 🔪🔪"}
                                     onUpload={(file: File) => setAudioFile(file)}/>)
                }
            </Container>

            <Stack direction={'row'} spacing={2} alignItems={'flex-start'}>
                <Stack width={'80%'}>
                    left
                </Stack>
                <Stack>
                    right
                </Stack>
            </Stack>
        </>
    );
}

export default Upload;