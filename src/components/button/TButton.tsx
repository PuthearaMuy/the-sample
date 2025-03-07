import {Stack, SxProps} from "@mui/material";

interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
    sx?: SxProps;
}

function TButton(prop: Props) {
    const sx = {
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid var(--secondary-active-background-color)',
        borderRadius: '5px',
        ':hover': {
            borderColor: 'var(--primary-color)',
            background: 'var(--secondary-hover-background-color)',
        },
        ...prop.sx,
    }
    return (
        <Stack
            sx={sx}
            onClick={prop.onClick}>
            {prop.children}
        </Stack>
    )
}

export default TButton;