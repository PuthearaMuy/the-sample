import {CircularProgress, Container, Typography} from "@mui/material";

function Loading({text}: { text?: string }) {
    return (
        <Container sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <CircularProgress />
            <Typography>{text}</Typography>
        </Container>
    );
}

export default Loading;