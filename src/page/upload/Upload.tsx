import {Container, Stack} from "@mui/material";
import FileDrop from "../../components/file/FileDrop.tsx";
import {useState} from "react";

function Upload() {

    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);

    return (
        <>
            <Container sx={{height: "90px"}}>
                {
                    audioFile ?
                        (<h1>HI</h1>)
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