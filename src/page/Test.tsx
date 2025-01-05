import {useAppDispatch, useAppSelector} from "../state/store/store.ts";
import {Button} from "@mui/material";
import {setToken} from "../state/slice/ApplicationSlice.ts";

function Test() {

    const applicationState = useAppSelector((state) => state.application);

    const dispatch = useAppDispatch();

    return (
        <>
            {applicationState.accessToken}
            <br/>

            <Button onClick={() => dispatch(setToken("Hi new token " + Math.random()))}>Click</Button>
        </>
    );
}

export default Test;
