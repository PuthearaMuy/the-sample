import {Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../../state/store/store.ts";
import './Account.css';
import TButton from "../../../components/button/TButton.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

function Account() {

    const userState = useAppSelector(state => state.user);
    const navigate = useNavigate();

    function isActiveTab(path: string) {
        return location.href.includes(path);
    }

    return (
        <Stack>
            <Stack textAlign={'left'}>
                <Typography variant={'h4'} sx={{fontWeight: 600}}>Account</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'flex-start'} textAlign={'left'} marginTop={'20px'} height={'100%'}
                   flexWrap={'wrap'}>
                <Stack width={'30%'} gap={'30px'}>

                    <Stack className={'user-sample'}>
                        <Typography sx={{fontSize: '20px', fontWeight: 500}}>Your sample</Typography>
                        <ul>
                            <li style={{textDecoration: isActiveTab("/account/sample") ? 'underline' : 'none'}}
                                onClick={() => navigate("/account/sample")}>Sample <span>(1)</span></li>
                            <li style={{textDecoration: isActiveTab("/account/purchase") ? 'underline' : 'none'}}
                                onClick={() => navigate("/account/purchase")}>Purchase <span>(1)</span></li>
                        </ul>
                    </Stack>

                    <Stack>
                        <Typography sx={{fontSize: '20px', fontWeight: 500}}>Information</Typography>
                        <table id={'profile-information-table'}>
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Username:</td>
                                <td style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                    <Typography sx={{fontSize: '14px'}}>{userState.username}</Typography>
                                    {userState.nickname &&
                                        <Typography sx={{fontSize: '12px'}}>({userState.nickname})</Typography>}
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><Typography sx={{fontSize: '14px'}}>{userState.email}</Typography></td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td><Typography sx={{fontSize: '14px'}}>{userState.gender}</Typography></td>
                            </tr>
                            <tr>
                                <td>
                                    <TButton sx={{
                                        visibility: location.href.includes("account/edit") ? 'hidden' : 'visible',
                                        gap: '5px',
                                        height: '35px',
                                        padding: '10px',
                                        marginTop: '10px',
                                        '&:hover': {
                                            borderColor: 'var(--primary-bright-color)',
                                            color: 'var(--primary-bright-color)'
                                        }
                                    }}
                                             onClick={() => navigate("/account/edit")}
                                    >
                                        <Typography fontSize={'13px'}>Edit</Typography>
                                        <EditNoteOutlinedIcon/>
                                    </TButton>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </Stack>
                </Stack>
                <Stack width={'70%'}>
                    <Outlet/>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Account;

