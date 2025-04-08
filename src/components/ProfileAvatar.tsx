import {Avatar, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography} from "@mui/material";
import React, {useRef, useState} from "react";
import {ApplicationConstants} from "../constants/ApplicationConstants.ts";
import {AuthenticationAPI} from "../service/AuthenticationAPI.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    profileImage: string;
    username: string;
}

function ProfileAvatar(props: Props) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    function handleLogout() {
        const sessionID = localStorage.getItem(ApplicationConstants.SESSION_ID);
        if (sessionID) {
            localStorage.removeItem(ApplicationConstants.SESSION_ID);
            location.href = AuthenticationAPI.logoutUrl(sessionID, location.href);
        } else {
            location.href = "/home";
        }
    }

    return (
        <>
            <Avatar ref={anchorRef} sx={{cursor: 'pointer'}} alt="Profile" src={props.profileImage}
                    onClick={handleToggle}/>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="top-start"
                transition
                disablePortal
            >
                {({TransitionProps}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'top left',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="profile-popup"
                                    aria-labelledby="profile-popup"
                                    onKeyDown={handleListKeyDown}
                                    sx={{margin: 0, textAlign: 'left', alignItems: 'left', minWidth: '150px'}}
                                >
                                    <Typography sx={{padding: '0 10px'}}>{props.username}</Typography>
                                    <hr/>
                                    <MenuItem sx={{padding: '5px 10px'}} onClick={(_event) => {
                                        navigate('/account');
                                        handleClose(_event)
                                    }}>My account</MenuItem>
                                    <MenuItem sx={{padding: '5px 10px'}} onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default ProfileAvatar;