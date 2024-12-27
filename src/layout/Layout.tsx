// import {Link, Outlet} from "react-router-dom";
import "./style/Layout.css";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import SearchInput from "../component/Search.tsx";
import {FilePathConstants} from "../constants/FilePathConstants.ts";
import {LabelConstants} from "../constants/LabelConstants.ts";


// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Layout() {
    const navigate = useNavigate();
    // return (<>
    //     <div className="toolbar">
    //         <h1>HI i am react layout</h1>
    //         <Link to={{pathname: '/home'}}>Home</Link>
    //         <br/>
    //         <Link to={{pathname: '/about'}}>About</Link>
    //     </div>
    //
    //     <div className="content">
    //         <Outlet/>
    //     </div>
    // </>)

    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    //
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };
    //
    //
    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <div>
            <AppBar position="static" color="transparent">
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
                            {LabelConstants.APP_NAME}
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
                        {/*<Box sx={{flexGrow: 0}}>*/}
                        {/*    <Tooltip title="Open settings">*/}
                        {/*        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
                        {/*            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                        {/*        </IconButton>*/}
                        {/*    </Tooltip>*/}
                        {/*    <Menu*/}
                        {/*        sx={{mt: '45px'}}*/}
                        {/*        id="menu-appbar"*/}
                        {/*        anchorEl={anchorElUser}*/}
                        {/*        anchorOrigin={{*/}
                        {/*            vertical: 'top',*/}
                        {/*            horizontal: 'right',*/}
                        {/*        }}*/}
                        {/*        keepMounted*/}
                        {/*        transformOrigin={{*/}
                        {/*            vertical: 'top',*/}
                        {/*            horizontal: 'right',*/}
                        {/*        }}*/}
                        {/*        open={Boolean(anchorElUser)}*/}
                        {/*        onClose={handleCloseUserMenu}*/}
                        {/*    >*/}
                        {/*        {settings.map((setting) => (*/}
                        {/*            <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                        {/*                <Typography sx={{textAlign: 'center'}}>{setting}</Typography>*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </Menu>*/}
                        {/*</Box>*/}
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={"content"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;