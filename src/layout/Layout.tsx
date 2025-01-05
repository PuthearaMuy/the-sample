import "./style/Layout.css";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import SearchInput from "../components/Search.tsx";
import {FilePathConstants} from "../constants/FilePathConstants.ts";
import {LabelConstants} from "../constants/LabelConstants.ts";
import {useContext} from "react";
import {ApplicationContext} from "../contexts/ApplicationContext.ts";
import {useSnackbar} from "notistack";

function Layout() {
    const navigate = useNavigate();
    const context = useContext(ApplicationContext);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    function addSnackBar() {
        const snackKey = enqueueSnackbar("Hi pm", {
            autoHideDuration: 10_000,
            anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
            SnackbarProps: {onClick: () => closeSnackbar(snackKey)}
        })
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <AppBar position="sticky" color="transparent" sx={{backgroundColor: "var(--primary-background-color)"}}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters sx={{cursor: 'pointer', gap: '10px', width: '100%'}}>
                        <img alt={"logo"} src={FilePathConstants.WHITE_LOGO} onClick={() => navigate("/home")} style={{
                            width: "35px",
                            height: "35px",
                            verticalAlign: "middle",
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
                            }}
                            onClick={() => navigate("/home")}
                        >
                            {context?.applicationName}
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, mx: '40px', gap: '2em'}}>
                            {LabelConstants.pages.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => navigate(page.path)}
                                    sx={{my: 2, color: 'white', display: 'block', textTransform: 'capitalize'}}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                        <SearchInput/>

                        <Button onClick={addSnackBar} color={'primary'}>MSG</Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <div id={"content"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;