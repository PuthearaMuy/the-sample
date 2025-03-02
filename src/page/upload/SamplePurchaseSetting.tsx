import {useNavigate} from "react-router-dom";
import AudioWave from "../../components/audio/AudioWave.tsx";
import {Button, Container, Stack, Typography} from "@mui/material";
import "./style/Upload.css"
import PurchaseTypeCard from "../../components/purchase/PurchaseTypeCard.tsx";
import {PurchaseType, SamplePriceDTO} from "../../model/SamplePrice.ts";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {useSnackbar} from "notistack";

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
                amount: 2
            },
            {
                type: PurchaseType.PREMIUM,
                amount: 10
            },
            {
                type: PurchaseType.EXCLUSIVE,
                amount: -1
            }
        ]
    }
    function getPrice(type: PurchaseType) {
        return samplePrice.samplePrices.find((p) => p.type === type)?.amount;
    }

    function handleSubmit() {
        SampleServiceAPI.getInstance().updateSamplePrice(samplePrice).then(() => {
            enqueueSnackbar("Upload is done");
            navigation("/home");
        });
    }

    return (
        <Container>
            <Container>
                <AudioWave id={id} isPlaying={false}/>
            </Container>

            <Container>
                <Stack spacing={1} sx={{width: '100%'}}>
                    <Stack justifyContent={'flex-start'} sx={{width: '100%', textAlign: 'left'}}>
                        <Typography fontWeight={'600'} margin={'15px 0'}>Purchase info</Typography>
                    </Stack>

                    <Stack spacing={1} useFlexGap={true} direction={'row'} flexWrap={'wrap'}>
                        <PurchaseTypeCard price={getPrice(PurchaseType.NORMAL)} type={PurchaseType.NORMAL} description={"Normal description"}/>
                        <PurchaseTypeCard price={getPrice(PurchaseType.PREMIUM)} type={PurchaseType.PREMIUM} description={"Premium description"}/>
                        <PurchaseTypeCard price={getPrice(PurchaseType.EXCLUSIVE)} type={PurchaseType.EXCLUSIVE} description={"Exclusive description"} negotiation={true}/>
                    </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} justifyContent={'flex-start'} marginTop={'20px'}>
                    <Button color={'primary'} variant="outlined"
                            sx={{minWidth: '100px', textTransform: 'capitalize'}}
                            onClick={() => navigation(-1)}>Cancel</Button>
                    <Button color={'primary'} variant="contained"
                            sx={{minWidth: '100px', textTransform: 'capitalize'}}
                            onClick={handleSubmit}>Submit</Button>
                </Stack>

            </Container>
        </Container>
    );
}

export default SamplePurchaseSetting;