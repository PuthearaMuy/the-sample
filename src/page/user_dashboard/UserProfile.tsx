import {Container, Stack, Typography} from "@mui/material";
import kid from '../../assets/kid.jpeg';
import './UserProfile.css';
import Paragraph from "../../components/text/Paragraph.tsx";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TButton from "../../components/button/TButton.tsx";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import {useNavigate} from "react-router-dom";
import {ApplicationConstants} from "../../constants/ApplicationConstants.ts";
import SampleContainerSkeleton from "../../components/skeleton/SampleContainerSkeleton.tsx";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import {useState} from "react";

function UserProfile() {
    const username = location.pathname.split("/").pop();
    const navigation = useNavigate();
    const [follow, setFollow] = useState(false);

    const description = "Aliquam eget suscipit libero. Duis porta orci in ultrices dictum. Pellentesque commodo gravida sem non\n" +
        "                mollis. Cras id orci id nunc dignissim lacinia ut quis sem. Aenean urna neque, accumsan in nibh eu,\n" +
        "                ullamcorper aliquet ligula. Aenean ante mi, commodo eget pretium sit amet, pulvinar a diam. Morbi cursus\n" +
        "                odio sem, eu sollicitudin enim blandit eget. Duis scelerisque ante purus, quis mollis tellus volutpat\n" +
        "                ut. Aliquam eu aliquam ligula. Nam lobortis consequat ultricies. Donec in mauris et nibh scelerisque\n" +
        "                lobortis. Donec dui quam, rhoncus eu libero dapibus, volutpat laoreet felis. Donec aliquam nec nunc ut\n" +
        "                porttitor.";
    const follower = formatFollower(123_120);

    function formatFollower(follower: number) {
        return follower > 1000 ? (follower / 1000).toFixed(2) + "K" : follower;
    }

    return (
        <Container>
            <Stack gap={'20px'}>
                <Stack>
                    <TButton sx={{width: '45px'}} onClick={() => navigation(ApplicationConstants.getLastPage("/home"))}>
                        <KeyboardBackspaceOutlinedIcon/>
                    </TButton>
                </Stack>
                <Stack direction={'row'} gap={'20px'} alignItems={'center'} paddingInline={'20px'}>
                    <Stack>
                        <img className={'profile-avatar'} src={kid} alt={'profile'} width={'180px'} height={'180px'}/>
                    </Stack>

                    <Stack textAlign={'left'} gap={'5px'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography>{username}</Typography>
                            <Typography fontSize={'13px'}>(nick)</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={'5px'}
                               sx={{cursor: 'pointer', ":hover": {textDecoration: 'underline'}}}>
                            <FavoriteBorderOutlinedIcon/>
                            <Typography fontSize={'13px'}>{follower}</Typography>
                        </Stack>
                        <Stack>
                            {
                                follow ? (
                                        <TButton sx={{
                                            minWidth: '20px',
                                            height: '30px',
                                            padding: '10px',
                                            gap: '5px',
                                            borderColor: 'var(--primary-bright-color)',
                                            color: 'var(--primary-bright-color)',
                                            '&:hover': {
                                                borderColor: 'var(--primary-bright-color)',
                                                color: 'var(--primary-bright-color)'
                                            }
                                        }}
                                                 onClick={() => setFollow(false)}
                                        >
                                            <Typography fontSize={'13px'}>Followed</Typography>
                                            <NotificationsActiveOutlinedIcon fill={'inherit'} fontSize={"small"}/>
                                        </TButton>
                                    ) :
                                    (
                                        <TButton sx={{
                                            minWidth: '20px',
                                            height: '30px',
                                            padding: '10px',
                                            gap: '5px',
                                            '&:hover': {
                                                borderColor: 'var(--primary-bright-color)',
                                                color: 'var(--primary-bright-color)'
                                            }
                                        }}
                                                 onClick={() => setFollow(true)}
                                        >
                                            <Typography fontSize={'13px'} sx={{
                                                ':hover': {
                                                    color: 'var(--primary-bright-color)',
                                                    cursor: 'pointer'
                                                }
                                            }}>Follow</Typography>
                                            <NotificationsNoneOutlinedIcon fill={'inherit'} fontSize={"small"}/>
                                        </TButton>
                                    )
                            }

                        </Stack>
                    </Stack>
                </Stack>
                <Stack textAlign={'left'}>
                    <Paragraph text={description}/>
                </Stack>
            </Stack>

            <Stack textAlign={'left'} marginTop={'20px'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'} gap={'5px'}>
                    <Typography fontWeight={'500'}>Popular tracks</Typography>
                    <Typography>(5 of 100)</Typography>
                </Stack>
                <Typography sx={{fontSize: '14px', cursor: 'pointer', color: 'var(--primary-bright-color)', ':hover': {textDecoration: 'underline'}}}>Show all</Typography>
            </Stack>

            <Stack marginTop={'15px'} alignItems={'flex-start'} paddingInline={'20px 40px'} gap={'15px'}>
                <SampleContainerSkeleton/>
                <SampleContainerSkeleton/>
                <SampleContainerSkeleton/>
                <SampleContainerSkeleton/>
                <SampleContainerSkeleton/>
            </Stack>
        </Container>
    );
}

export default UserProfile;