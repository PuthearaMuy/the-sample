import {useNavigate} from "react-router-dom";
import AudioWave from "../../components/audio/AudioWave.tsx";
import {Button, Container, Stack, Typography} from "@mui/material";
import "./style/Upload.css"
import PurchaseTypeCard, {PurchaseCardProps} from "../../components/purchase/PurchaseTypeCard.tsx";
import {SoldOption, PurchaseType, SamplePriceDTO} from "../../model/SamplePrice.ts";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {useSnackbar} from "notistack";
import {useState} from "react";

function SamplePurchaseSetting() {
    const navigation = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const pop = location.pathname.split("/").pop();
    if (!pop) {
        navigation("/home", {replace: true})
    }
    const id = Number(pop);

    const samplePrice : SamplePriceDTO = {
        sampleId: id,
        samplePrices: [
            {
                type: PurchaseType.NORMAL,
                amount: 2,
                negotiation: false,
                soldOption: SoldOption.SOLD
            },
            {
                type: PurchaseType.PREMIUM,
                amount: 10,
                negotiation: false,
                soldOption: SoldOption.SOLD
            },
            {
                type: PurchaseType.EXCLUSIVE,
                amount: 0,
                negotiation: true,
                soldOption: SoldOption.SOLD
            }
        ]
    }

    const [samplePrices, setSamplePrices] = useState(samplePrice.samplePrices);

    function handleSubmit() {
        samplePrice.samplePrices = samplePrices;
        SampleServiceAPI.getInstance().updateSamplePrice(samplePrice).then(() => {
            enqueueSnackbar("Upload is done");
            navigation("/home");
        });
    }

    function samplePriceChange(change: PurchaseCardProps) {
        const typeIndex = samplePrices.findIndex(sp => sp.type === change.type);
        if (typeIndex >= 0) {
            samplePrices[typeIndex] = {
                amount: change.price,
                type: change.type,
                soldOption: change.soldOption,
                negotiation: change.negotiation,
            };
            setSamplePrices([...samplePrices]);
        }
    }

    function getPurchaseCard(type: PurchaseType) {
        const samplePrice = samplePrices.find((p) => p.type === type);
        if (samplePrice) {
            const prop = {
                type: samplePrice.type,
                soldOption: samplePrice.soldOption,
                negotiation: samplePrice.negotiation,
                price: samplePrice.amount,
                onChange: samplePriceChange,
                description: (samplePrice.type + " mock description")
            }
            return <PurchaseTypeCard prop={prop} />
        }
        return <></>
    }

    return (
        <Container>
            <Container>
                <AudioWave id={id} isPlaying={false}/>
            </Container>

            <Container>
                <Stack spacing={1} sx={{width: '100%', marginTop: '20px'}}>
                    <Stack justifyContent={'flex-start'} sx={{width: '100%', textAlign: 'left'}}>
                        <Typography fontWeight={'600'} margin={'15px 0'}>Purchase info</Typography>
                    </Stack>

                    <Stack spacing={1} useFlexGap={true} direction={'row'} flexWrap={'wrap'}>
                        {getPurchaseCard(PurchaseType.NORMAL)}
                        {getPurchaseCard(PurchaseType.PREMIUM)}
                        {getPurchaseCard(PurchaseType.EXCLUSIVE)}
                    </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} justifyContent={'flex-start'} marginTop={'20px'}>
                    <Button color={'primary'} variant="outlined"
                            sx={{minWidth: '100px', textTransform: 'capitalize'}}
                            onClick={() => navigation("/home")}>Cancel</Button>
                    <Button color={'primary'} variant="contained"
                            sx={{minWidth: '100px', textTransform: 'capitalize'}}
                            onClick={handleSubmit}>Submit</Button>
                </Stack>

            </Container>
        </Container>
    );
}

export default SamplePurchaseSetting;