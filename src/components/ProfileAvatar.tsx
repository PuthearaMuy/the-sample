import {Avatar, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import React, {useRef, useState} from "react";
import {ApplicationConstants} from "../constants/ApplicationConstants.ts";
import {AuthenticationAPI} from "../service/AuthenticationAPI.ts";

interface Props {
    profileImage: string
}

function ProfileAvatar(props: Props) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

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
            <Avatar ref={anchorRef} alt="Profile" src={props.profileImage} onClick={handleToggle} />

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="top-start"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'top left',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
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