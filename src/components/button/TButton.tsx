import {Button, SxProps} from "@mui/material";

interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
    sx?: SxProps;
}

function TButton(prop: Props) {
    const sx = {
        cursor: 'pointer',
        alignItems: 'center',
        textAlign: 'center',
        textTransform: 'capitalize',
        border: '1px solid var(--secondary-active-background-color)',
        borderRadius: '5px',
        color: 'var(--primary-color)',
        height: '30px',
        minWidth: '30px',
        ':hover': {
            borderColor: 'var(--primary-color)',
            background: 'var(--secondary-hover-background-color)',
            boxShadow: '0 0 2px 2px var(--secondary-active-background-color)',
        },
        ...prop.sx,
    }
    return (
        <Button
            sx={sx}
            onClick={prop.onClick}>
            {prop.children}
        </Button>
    )
}

export default TButton;