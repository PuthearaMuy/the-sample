import {Stack, Typography} from "@mui/material";

function UserSample() {
    return (
        <Stack gap={'20px'}>
            <Typography sx={{fontSize: '20px', fontWeight: 500}}>Sample</Typography>

            <Stack marginTop={'30px'} alignItems={'center'}>
                <Typography variant="h6" fontWeight={'700'} fontFamily={'var(--merinda-font)'}>
                    Coming soon 🍇🍇🍇
                </Typography>
            </Stack>
        </Stack>
    );
}

export default UserSample;