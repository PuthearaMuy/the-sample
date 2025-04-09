import {Stack, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import "./Paragraph.css";

function Paragraph({text} : {text: string}) {

    const paragraph = useRef<HTMLSpanElement | null>(null);
    const seeLess = useRef<HTMLSpanElement | null>(null);
    const [showSeeMore, setShowSeeMore] = useState(false);

    window.addEventListener("resize", onResize);

    function onResize() {
        if (paragraph.current) {
            const element = paragraph.current;
            element.classList.remove("see-all");

            if (element.scrollHeight > element.clientHeight) {
                setShowSeeMore(true);
            } else {
                setShowSeeMore(false);
            }
        }
        if (seeLess.current) {
            seeLess.current.style.display = "none";
        }
    }

    function onSeeMore() {
        if (paragraph.current) {
            paragraph.current.classList.add("see-all");

            if (seeLess.current) {
                seeLess.current.style.display = "flex";
            }

            setShowSeeMore(false);
        }
    }

    function onSeeLess() {
        if (seeLess.current) {
            seeLess.current.style.display = "none";
        }
        if (paragraph.current) {
            paragraph.current.classList.remove("see-all");
            onResize();
        }
    }

    useEffect(() => {
        if (paragraph.current) {
            onResize();
        }
    }, [paragraph])


    return (
        <Stack>
            <Typography ref={paragraph} className={"paragraph"} fontSize={'14px'}>
                {text}
            </Typography>
            <Typography className={'read-more'} sx={{fontSize: '13px', display: showSeeMore ? 'flex' : 'none'}}
                        onClick={onSeeMore}>See more</Typography>
            <Typography ref={seeLess} className={'read-less'} sx={{fontSize: '13px', display: 'none'}}
                        onClick={onSeeLess}>See less</Typography>
        </Stack>
    );
}

export default Paragraph;