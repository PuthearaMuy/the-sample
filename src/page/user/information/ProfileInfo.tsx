import {MenuItem, Select, Stack, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import TInput from "../../../components/input/TInput.tsx";
import {useAppDispatch, useAppSelector} from "../../../state/store/store.ts";
import {UserProfile} from "../../../model/user/UserProfile.ts";
import TButton from "../../../components/button/TButton.tsx";
import FileDrop from "../../../components/file/FileDrop.tsx";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {UserServiceAPI} from "../../../service/UserServiceAPI.ts";
import {ApplicationConstants} from "../../../constants/ApplicationConstants.ts";
import {useSnackbar} from "notistack";
import {setUser} from "../../../state/slice/UserSlice.ts";
import {useNavigate} from "react-router-dom";

function ProfileInfo() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | undefined>(undefined);

    const profileUrl = image ? URL.createObjectURL(image) : userState.profileUrl ?? undefined;

    const {handleSubmit, control} = useForm<UserProfile>({
        values: {
            username: userState.username,
            nickname: userState.nickname,
            email: userState.email,
            phone: userState.phone,
            dateOfBirth: userState.dateOfBirth,
            gender: userState.gender,
        },
    });

    function profileClick() {
        const profileDrop = document.getElementById("profile-drop");
        if (profileDrop) {
            profileDrop.click();
        }
    }

    function submitProfile(userInfo: UserProfile) {
        const formData = new FormData();
        if (image) {
            formData.append("profilePic", image);
        }
        formData.append("username", userInfo.username);
        formData.append("nickname", userInfo.nickname);
        formData.append("email", userInfo.email);
        formData.append("phone", userInfo.phone);
        formData.append("dateOfBirth", userInfo.dateOfBirth);
        formData.append("gender", userInfo.gender);

        UserServiceAPI.updateUserProfile(formData).then((res) => {
            enqueueSnackbar("Profile successfully updated!");
            dispatch(setUser({
                ...res.data,
            }));
            navigate("/account");
        }).catch(() => {
            enqueueSnackbar("Something went wrong! ", {variant: 'error'});
        })
    }

    return (
        <Stack gap={'20px'}>
            <Typography sx={{fontSize: '20px', fontWeight: 500}}>Edit your information</Typography>

            <Stack direction={'row'} width={'100%'} gap={'20px'}>
                <Stack gap={'10px'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'80%'}
                       maxWidth={'800px'}>
                    <Stack width={'100%'}>
                        <Typography>Username</Typography>
                        <Controller
                            render={({field}) => <TInput {...field} name={'username'}/>}
                            name={'username'} control={control}/>
                    </Stack>

                    <Stack width={'100%'}>
                        <Typography>Nickname</Typography>
                        <Controller
                            render={({field}) => <TInput {...field} />}
                            name={'nickname'} control={control}/>
                    </Stack>

                    <Stack width={'100%'}>
                        <Typography>Email</Typography>
                        <Controller
                            render={({field}) => <TInput {...field} disabled
                                                         onChange={() => {
                                                         }}/>}
                            name={'email'} control={control}/>
                    </Stack>

                    <Stack width={'100%'}>
                        <Typography>Phone</Typography>
                        <Controller render={({field}) => <TInput {...field} name={'phone'}/>}
                                    name={'phone'} control={control}/>
                    </Stack>

                    <Stack width={'100%'}>
                        <Typography>Date of birth</Typography>
                        <Controller control={control} name={'dateOfBirth'}
                                    render={({field}) => <DatePicker format={ApplicationConstants.DATE_FORMAT}
                                                                     sx={{width: '100%'}}
                                                                     value={field.value ? dayjs(field.value, ApplicationConstants.DATE_FORMAT) : undefined}
                                                                     onChange={value => {
                                                                         field.onChange(value?.format(ApplicationConstants.DATE_FORMAT) ?? '')
                                                                     }}/>}/>
                    </Stack>

                    <Stack width={'100%'}>
                        <Typography>Gender</Typography>
                        <Controller control={control} name={'gender'} render={({field}) => (
                            <Select {...field}>
                                <MenuItem value={'FEMALE'}>Female</MenuItem>
                                <MenuItem value={'GAY'}>LGBT</MenuItem>
                                <MenuItem value={'MALE'}>Male</MenuItem>
                            </Select>
                        )}/>
                    </Stack>

                </Stack>
                <Stack width={'20%'} maxWidth={'300px'} minWidth={'200px'} alignItems={'center'}
                       justifyContent={'center'} sx={{cursor: 'pointer'}}>
                    {
                        profileUrl &&
                        <img src={profileUrl} className="logo" width={"100%"} style={{
                            maxWidth: "250px",
                            minWidth: "100px",
                            minHeight: '100px',
                            maxHeight: "260px",
                            borderRadius: '8px'
                        }} alt={"Profile picture"} onClick={profileClick}/>
                    }
                    <FileDrop id={'profile-drop'} label={"Profile picture"} onUpload={setImage}
                              sx={{height: '260px', display: (profileUrl ? 'none' : 'flex')}}/>
                </Stack>
            </Stack>
            <Stack direction={'row'} gap={'15px'} justifyContent={'flex-end'} maxWidth={'800px'}>
                <TButton sx={{minWidth: '70px', padding: '10px', height: '40px'}}
                         onClick={() => navigate("/account")}>Cancel</TButton>
                <TButton sx={{
                    width: '75px',
                    height: '40px',
                    padding: '10px',
                    '&:hover': {
                        borderColor: 'var(--primary-bright-color)',
                        color: 'var(--primary-bright-color)'
                    }
                }}
                         onClick={handleSubmit(submitProfile)}
                >Save</TButton>
            </Stack>
        </Stack>
    );
}

export default ProfileInfo;