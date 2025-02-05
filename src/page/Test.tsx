import {useAppSelector} from "../state/store/store.ts";

function Test() {

    const applicationState = useAppSelector((state) => state.application);


    return (
        <>
            {applicationState.accessToken}
            <br/>
        </>
    );
}

export default Test;
