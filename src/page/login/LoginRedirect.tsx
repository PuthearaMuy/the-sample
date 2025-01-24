import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../state/store/store.ts";
import {setToken} from "../../state/slice/ApplicationSlice.ts";
import {useEffect} from "react";
import {UserServiceAPI} from "../../service/UserServiceAPI.ts";

function LoginRedirect() {

    const dispatch = useAppDispatch();
    const application = useAppSelector(state => state.application);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            dispatch(setToken(token));
        }
        UserServiceAPI.getUserProfile().then(value => console.log(value.data));
    }, [token, dispatch]);

    return <h1>Login redirect {application.accessToken}</h1>
}

export default LoginRedirect;