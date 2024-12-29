import "./style/Layout.css";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import SearchInput from "../components/Search.tsx";
import {FilePathConstants} from "../constants/FilePathConstants.ts";
import {LabelConstants} from "../constants/LabelConstants.ts";
import {useContext} from "react";
import {ApplicationContext} from "../contexts/ApplicationContext.ts";

function Layout() {
    const navigate = useNavigate();
    const context = useContext(ApplicationContext);

    return (
        <div style={{width:'100%',height:'100%', display: 'flex', flexDirection: 'column'}}>
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

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'},  mx: '40px', gap: '2em'}}>
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
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={"content"} style={{width:'100%', height:'100%'}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;