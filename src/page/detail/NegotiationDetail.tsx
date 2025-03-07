import {Stack, Typography} from "@mui/material";
import TButton from "../../components/button/TButton.tsx";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface Props {
    onClose?: () => void;
}

function NegotiationDetail(prop: Props) {
    return (
        <Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h6" fontWeight={'700'} fontFamily={'var(--merinda-font)'}>
                    Negotiation
                </Typography>
                <TButton onClick={prop.onClose}
                         sx={{borderRadius: '8px', width: '35px', height: '30px', justifyContent: 'center'}}>
                    <CloseOutlinedIcon/>
                </TButton>
            </Stack>

            <Stack marginTop={'30px'}>
                <Typography variant="h6" fontWeight={'700'} fontFamily={'var(--merinda-font)'}>
                    Coming soon 🍇🍇🍇
                </Typography>
            </Stack>

        </Stack>
    );
}

export default NegotiationDetail;