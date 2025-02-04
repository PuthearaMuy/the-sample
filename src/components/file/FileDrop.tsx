import {Stack, SxProps, Typography} from "@mui/material";
import {ChangeEvent, DragEvent, useRef} from 'react';

import "./FileDrop.css"

interface Props {
    label: string;
    acceptType?: string;
    onUpload?: (file: File) => void;
    validation?: (file: File) => boolean;
    sx?: SxProps;
}

function FileDrop({label, acceptType, onUpload, validation, sx}: Props) {

    const fileInput = useRef<HTMLInputElement | null>(null);
    const div = useRef<HTMLDivElement | null>(null);

    function openFile() {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file && onUpload) {
                onUpload(file);
            }
        }
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();

        onDragLeave();

        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file) {
                if (validation) {
                    if (!validation(file)) {
                        return;
                    }
                }
                if (onUpload) {
                    onUpload(file);
                }
            }
        }
    }

    function onDrag(e: DragEvent) {
        e.preventDefault();
        if (div.current) {
            div.current.classList.add("drag-on");
        }
    }

    function onDragLeave() {
        if (div.current) {
            div.current.classList.remove("drag-on");
        }
    }

    return (
        <Stack ref={div} onClick={openFile} onDragOver={onDrag} onDragLeave={onDragLeave}
               onDrop={onDrop} className={'file-drop-container'} width={'100%'} height={'100%'} sx={sx}>

            <Typography sx={{fontFamily: 'var(--merinda-font)'}}>{label}</Typography>

            <input ref={fileInput} hidden={true} type={"file"} accept={acceptType} onChange={onChangeFile}/>
        </Stack>
    );
}

export default FileDrop;