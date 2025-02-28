import {useAppSelector} from "../state/store/store.ts";

function Test() {

    const applicationState = useAppSelector((state) => state.application);


    return (
        <>
            <p style={{ wordBreak: 'break-word' }}>
            {applicationState.accessToken}
            </p>
            <br/>
        </>
    );
}

export default Test;
