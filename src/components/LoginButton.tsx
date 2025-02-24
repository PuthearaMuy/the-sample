import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {BackendConfigurationProperty} from "../configuratons/property/BackendConfigurationProperty.ts";

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    maxWidth: '800px',
    maxHeight: '800px',
    minWidth: '300px',
    borderRadius: '10px',
    color: '#000000',
    padding: '20px',
}

interface AuthenticationProvider {
    name: string;
    logo: string;
    borderColor: string;
    url: string;
}

const socialAuthProviders: AuthenticationProvider[] = [
    {
        name: 'Google',
        logo: '/logo/google.svg',
        borderColor: '#008aaa',
        url: '/oauth2/authorization/google'
    },
    {
        name: 'Okta',
        logo: '/logo/auth0.svg',
        borderColor: '#EB5424',
        url: '/oauth2/authorization/okta'
    },
    {
        name: 'Keycloak',
        logo: '/logo/keycloak.svg',
        borderColor: '#008aaa',
        url: '/oauth2/authorization/keycloak'
    }
]


function LoginButton() {
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function socialLogin(url: string) {
        window.location.href = BackendConfigurationProperty.getUserManagementFullPath() + url;
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} color={'primary'}
                    sx={{textTransform: 'capitalize', cursor: 'pointer'}}>Login</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Stack>
                        <Typography variant="h5" sx={{fontWeight: '500'}}>
                            Login
                        </Typography>
                    </Stack>
                    <Stack spacing={2} marginTop={2}>
                        {
                            socialAuthProviders.map((provider, index) =>
                                (
                                    <Stack key={index} sx={{
                                        border: `1px solid ${provider.borderColor}`,
                                        borderRadius: '8px',
                                        paddingBlock: '10px',
                                        paddingInline: '20px',
                                        height: '30px',
                                        cursor: 'pointer',
                                        "&:hover": {
                                            backgroundColor: 'var(--secondary-active-background-color)'
                                        }
                                    }}
                                           direction={'row'} justifyContent={'space-between'} alignItems={'center'}
                                           onClick={() => socialLogin(provider.url)}>
                                        <Typography width={'100%'}>
                                            {provider.name}
                                        </Typography>
                                        <img alt={provider.name} src={provider.logo} height={'100%'}/>
                                    </Stack>
                                ))
                        }
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default LoginButton;