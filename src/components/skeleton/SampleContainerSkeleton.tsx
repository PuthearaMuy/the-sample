import {Container, Skeleton, Stack, Typography} from "@mui/material";

function SampleContainerSkeleton() {
    return (
        <Stack className={'sample-container'} sx={{minHeight: 'unset', height: '90px', width: '100%'}}>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                   alignContent={"center"} gap={'10px'}>

                <Container sx={{padding: '0 !important'}}>
                    <Stack direction={"row"} justifyContent={"space-between"} width={'100%'}>
                        <Typography width={'25%'}><Skeleton animation={'pulse'} height={'25px'}/></Typography>
                        <Typography width={'15%'}><Skeleton animation={'pulse'} height={'25px'}/></Typography>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}
                           color={"var(--primary-bright-color)"}>
                        <Typography width={'20%'}><Skeleton animation={'pulse'} height={'20px'}/></Typography>
                        <Typography width={'5%'}><Skeleton animation={'pulse'} height={'20px'}/></Typography>
                    </Stack>
                </Container>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={'10px'}>
                <Skeleton height={'50px'} width={'100%'} animation={'pulse'}/>
                <Skeleton height={'50px'} width={'40px'} animation={'pulse'}/>
            </Stack>
        </Stack>
    );
}

export default SampleContainerSkeleton;