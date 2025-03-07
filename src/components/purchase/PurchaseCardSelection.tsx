import {PurchaseType} from "../../model/SamplePrice.ts";
import {Stack, Typography} from "@mui/material";

interface PurchaseCardSelectionProps {
    type: PurchaseType;
    description: string;
    price?: number;
    selected?: boolean;
    onClick?: () => void;
}

function PurchaseCardSelection(prop: PurchaseCardSelectionProps) {
    return (
        <Stack justifyContent={'flex-start'} sx={{textAlign: 'left', margin: '0 !important'}}>
            <Stack className={'price-type-container' + (prop.selected ? ' selected' : '')} spacing={1}
                   onClick={prop.onClick}>
                <Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>{prop.type}</Typography>
                    </Stack>

                    <Typography fontSize={13}>{prop.description}</Typography>
                </Stack>
                <Stack className={'price-input-container'} direction={'row'} alignItems={'center'} spacing={1}>
                    {(!prop.price || 0 >= prop?.price) ? '' :
                        <>
                            <Typography>{prop.price}</Typography>
                            <Typography>$</Typography>
                        </>
                    }
                </Stack>
            </Stack>
        </Stack>
    );
}

export default PurchaseCardSelection;