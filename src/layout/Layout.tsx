import "./style/Layout.css";
import {AppBar, Box, Container, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import SearchInput from "../components/Search.tsx";
import {FilePathConstants} from "../constants/FilePathConstants.ts";
import {LabelConstants} from "../constants/LabelConstants.ts";
import {useContext, useEffect, useState} from "react";
import {ApplicationContext} from "../contexts/ApplicationContext.ts";
import {useAppSelector} from "../state/store/store.ts";
import {UserServiceAPI} from "../service/UserServiceAPI.ts";
import ProfileAvatar from "../components/ProfileAvatar.tsx";
import LoginButton from "../components/LoginButton.tsx";

function Layout() {
    const navigate = useNavigate();
    const context = useContext(ApplicationContext);
    const userState = useAppSelector(state => state.user);
    const {process} = useAppSelector(state => state.process);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (userState.profileName) {
            UserServiceAPI.getUserProfilePicture().then((res) => {
                const url = URL.createObjectURL(res.data);
                if (url) {
                    setProfileImage(url)
                }
            })
        }
    }, [userState])

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <AppBar position="sticky" color="transparent" sx={{backgroundColor: "var(--primary-background-color)"}}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters sx={{gap: '10px', width: '100%'}}>
                        <img alt={"logo"} src={FilePathConstants.WHITE_LOGO} onClick={() => navigate("/home")} style={{
                            width: "35px",
                            height: "35px",
                            verticalAlign: "middle",
                            cursor: "pointer",
                        }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'var(--merinda-font)',
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate("/home")}
                        >
                            {context?.applicationName}
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, mx: '40px', gap: '2em'}}>
                            {LabelConstants.pages.map((page) => (
                                <Typography
                                    variant="h6"
                                    noWrap
                                    key={page.label}
                                    onClick={() => navigate(page.path)}
                                    sx={{my: 2, fontSize: '14px', fontFamily: 'var(--merinda-font)', color: (location.pathname.startsWith(page.path) ? 'var(--primary-bright-color)' : 'white'), display: 'block', textTransform: 'capitalize', fontWeight: 550, cursor: 'pointer'}}
                                >
                                    {page.label}
                                </Typography>
                            ))}
                        </Box>

                        <SearchInput/>

                        {
                            profileImage ? (
                                <ProfileAvatar profileImage={profileImage}/>
                            ) : (
                                <LoginButton/>
                            )
                        }

                    </Toolbar>
                </Container>
                {process > 0 && process <= 99 &&
                    <LinearProgress variant="determinate" color={'primary'} value={process}/>}
            </AppBar>


            <div id={"content"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;