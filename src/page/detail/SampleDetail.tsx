import {useNavigate} from "react-router-dom";
import AudioWave from "../../components/audio/AudioWave.tsx";
import {useEffect, useState} from "react";
import {Button, CircularProgress, Container, Stack, Typography} from "@mui/material";
import {SampleServiceAPI} from "../../service/SampleServiceAPI.ts";
import {ISampleDetail} from "../../model/ISampleDetail.ts";
import {PurchaseType} from "../../model/SamplePrice.ts";
import PurchaseCardSelection from "../../components/purchase/PurchaseCardSelection.tsx";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import {SampleCheckout} from "../../model/SampleCheckout.ts";
import NegotiationDetail from "./NegotiationDetail.tsx";
import {formatDate} from "../../utils/Utils.ts";
import TButton from "../../components/button/TButton.tsx";

function SampleDetail() {

    const navigation = useNavigate();
    const pop = location.pathname.split("/").pop();
    if (!pop) {
        navigation("/home", {replace: true})
    }
    const id = Number(pop);
    const [detail, setDetail] = useState<ISampleDetail | undefined>(undefined);
    const [selectPrice, setSelectPrice] = useState<PurchaseType>(PurchaseType.NORMAL);
    const [loading, setLoading] = useState(false);
    const [showNegotiation, setShowNegotiation] = useState(false);

    useEffect(() => {
        SampleServiceAPI.getInstance().getSampleDetail(id).then((res) => {
            const sampleDetail = res.data as ISampleDetail;
            setDetail(sampleDetail);
        });
    }, [id]);

    function getPrice(type: PurchaseType) {
        return detail?.samplePrices.find((p) => p.type === type)?.amount;
    }

    function onSelectPrice(type: PurchaseType) {
        if (selectPrice != type) {
            setSelectPrice(type);
        }
    }

    function handleCheckout() {
        if (!detail || !selectPrice || loading) {
            return;
        }
        setLoading(true);
        const sampleCheckout: SampleCheckout = {
            sampleId: detail.id,
            purchaseType: selectPrice,
            backUrl: location.href,
            successUrl: `${location.href}?purchaseType=${selectPrice}&status=success`,
        }

        SampleServiceAPI.getInstance().sampleCheckout(sampleCheckout).then(res => {
            location.href = res.data.url;
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Container>
            <Stack>
                <TButton sx={{width: '45px'}} onClick={() => navigation("/home")}>
                    <KeyboardBackspaceOutlinedIcon/>
                </TButton>
            </Stack>

            <Stack direction="column" spacing={2} marginTop={'20px'}>
                <Stack sx={{textAlign: "left"}}>
                    <Typography variant="h6" fontFamily={'var(--merinda-font)'}>{detail?.title}</Typography>
                </Stack>
                <Stack>
                    <AudioWave id={id} isPlaying={false}/>
                </Stack>

                <Stack sx={{textAlign: "left"}}>
                    <Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction={'row'} alignItems={'baseline'} gap={'5px'}>
                                <Typography>Genre:</Typography>
                                <Typography>{detail?.sampleType}</Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'baseline'} gap={'5px'}>
                                <Typography>Tempo:</Typography>
                                <Typography>{detail?.tempo} BPM</Typography>
                            </Stack>
                        </Stack>

                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction={'row'} alignItems={'baseline'} gap={'5px'}
                                   color={'var(--primary-bright-color)'}>
                                <Typography>Key:</Typography>
                                <Typography>{detail?.key}</Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'baseline'} gap={'5px'}>
                                <Typography>Release by:</Typography>
                                <Typography color={'var(--primary-bright-color)'}
                                            sx={{cursor: 'pointer', ':hover': {textDecoration: 'underline'}}}>
                                    {detail?.ownerInfo.username}
                                </Typography>
                                {
                                    detail?.createDate && <Typography>({formatDate(detail.createDate)})</Typography>
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack marginTop={'10px'}>
                        <Typography fontSize={'12px'}>{detail?.description}</Typography>
                    </Stack>
                </Stack>

                {showNegotiation ?
                    <NegotiationDetail onClose={() => setShowNegotiation(false)}/>
                    :
                    <Stack direction={'row'} gap={'15px'}>
                        <PurchaseCardSelection price={getPrice(PurchaseType.NORMAL)} type={PurchaseType.NORMAL}
                                               description={"Normal description"}
                                               selected={selectPrice === PurchaseType.NORMAL}
                                               onClick={() => onSelectPrice(PurchaseType.NORMAL)}/>
                        <PurchaseCardSelection price={getPrice(PurchaseType.PREMIUM)} type={PurchaseType.PREMIUM}
                                               selected={selectPrice === PurchaseType.PREMIUM}
                                               description={"Premium description"}
                                               onClick={() => onSelectPrice(PurchaseType.PREMIUM)}/>
                        <PurchaseCardSelection price={getPrice(PurchaseType.EXCLUSIVE)} type={PurchaseType.EXCLUSIVE}
                                               selected={selectPrice === PurchaseType.EXCLUSIVE}
                                               description={"Exclusive description"}
                                               onClick={() => onSelectPrice(PurchaseType.EXCLUSIVE)}/>
                    </Stack>
                }

            </Stack>

            {
                !showNegotiation &&
                <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} marginTop={'20px'}>
                    {selectPrice !== PurchaseType.EXCLUSIVE ?
                        <Button color={'primary'} variant="contained"
                                sx={{minWidth: '100px', textTransform: 'capitalize'}}
                                onClick={handleCheckout}>
                            Checkout
                            {loading && <CircularProgress color={'info'} size={20}/>}
                        </Button>
                        :
                        <Button color={'primary'} variant="contained"
                                sx={{minWidth: '100px', textTransform: 'capitalize'}}
                                onClick={() => setShowNegotiation(true)}>
                            Negotiation
                        </Button>
                    }
                </Stack>
            }

        </Container>
    )
}

export default SampleDetail;