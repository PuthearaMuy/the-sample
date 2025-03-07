import {Stack, Switch, Typography} from "@mui/material";
import {PurchaseType, SoldOption} from "../../model/SamplePrice.ts";

export interface PurchaseCardProps {
    type: PurchaseType;
    description: string;
    price: number;
    soldOption: SoldOption;
    negotiation: boolean;
    onChange?: (change: PurchaseCardProps) => void;
}

function PurchaseTypeCard({prop}: { prop: PurchaseCardProps }) {
    const isPaid = SoldOption.SOLD === prop.soldOption;

    function paidOptionChange(checked: boolean) {
        const soldOption = checked ? SoldOption.SOLD : SoldOption.FREE;
        prop = {
            ...prop,
            soldOption: soldOption
        };
        onChangeEmitter();
    }

    function priceChange(value: number) {
        if (value >= 1_000_001) {
            return;
        }
        prop = {
            ...prop,
            price: value
        }
        onChangeEmitter();
    }

    function onChangeEmitter() {
        if (prop.onChange) {
            prop.onChange(prop);
        }
    }

    function freeOptionChange(freeOption: SoldOption) {
        prop = {
            ...prop,
            soldOption: freeOption,
        }
        console.log(prop)
        onChangeEmitter();
    }

    function negotiationChange(negotiation: boolean) {
        prop = {
            ...prop,
            negotiation: negotiation
        }
        onChangeEmitter();
    }

    return (
        <Stack justifyContent={'flex-start'} sx={{textAlign: 'left', margin: '0 !important'}}>
            <Stack className={'price-type-container'} spacing={1}>
                <Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>{prop.type}</Typography>
                    </Stack>

                    <Typography fontSize={13}>{prop.description}</Typography>
                </Stack>

                <Stack direction={'row'} alignItems={'center'} gap={'10%'} height={'25px'}>

                    {PurchaseType.EXCLUSIVE !== prop.type &&
                        <Stack direction={'row'} alignItems={'center'}>
                            <Switch size={'small'} checked={isPaid}
                                    onChange={(_event, checked) => paidOptionChange(checked)}/>
                            <Typography fontSize={13}>{isPaid ? 'Sold' : 'Free'}</Typography>
                        </Stack>
                    }

                    {PurchaseType.EXCLUSIVE === prop.type &&
                        <Stack direction={'row'}>
                            <input checked={prop.negotiation} type={'checkbox'} className={'negotiation-checkbox'}
                                   title={'Negotiation'}
                                   onChange={_event => negotiationChange(_event.target.checked)}/>
                            <Typography fontSize={13}>Negotiation</Typography>
                        </Stack>
                    }
                </Stack>


                {
                    (isPaid || PurchaseType.EXCLUSIVE === prop.type) &&
                    <Stack className={'price-input-container'} direction={'row'} alignItems={'center'} spacing={1}
                           width={'100%'} height={'32px'} position={'relative'}>
                        <Stack direction={'row'} alignItems={'center'} width={'100%'}>
                            <input disabled={prop.negotiation} value={prop.price}
                                   onChange={_event => priceChange(Number(_event.target.value))}
                                   className={'price-input t-custom-input'}
                                   style={{height: '20px', width: '100%'}}
                                   type={'number'}/>
                            <Typography sx={{position: 'absolute', right: '10px', color: 'black'}}>$</Typography>
                        </Stack>
                    </Stack>
                }

                {
                    !isPaid && PurchaseType.EXCLUSIVE !== prop.type &&
                    <Stack height={'32px'}>
                        <select value={prop.soldOption} style={{height: '100%'}} className={'t-custom-input select'}
                                onChange={_event => freeOptionChange(_event.target.value as SoldOption)}>
                            <option value={SoldOption.FREE}>Free</option>
                            <option value={SoldOption.FREE_NON_PROFIT}>Free non profit</option>
                        </select>
                    </Stack>
                }
            </Stack>
        </Stack>
    );
}

export default PurchaseTypeCard;