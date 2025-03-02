import {Stack, Typography} from "@mui/material";

interface Props {
    type: string;
    description: string;
    price?: number;
    negotiation?: boolean;
}

function PurchaseTypeCard(prop: Props) {
    return (
        <Stack justifyContent={'flex-start'} sx={{textAlign: 'left', margin: '0 !important'}}>
            <Stack className={'price-type-container'} spacing={1}>
                <Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>{prop.type}</Typography>
                        <input checked={prop.negotiation} type={'checkbox'} className={'negotiation-checkbox'}/>
                    </Stack>

                    <Typography fontSize={13}>{prop.description}</Typography>
                </Stack>
                <Stack className={'price-input-container'} direction={'row'} alignItems={'center'} spacing={1}>
                    <input disabled={prop.negotiation} value={prop.price} className={'price-input'} type={'number'}/>
                    <Typography>$</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default PurchaseTypeCard;