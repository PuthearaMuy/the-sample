import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../state/store/store.ts";
import {setIsAuthenticated, setSessionId, setToken} from "../../state/slice/ApplicationSlice.ts";
import {useEffect} from "react";
import {UserServiceAPI} from "../../service/UserServiceAPI.ts";
import {ParameterConstants} from "../../constants/ParameterConstants.ts";
import {CircularProgress, Stack} from "@mui/material";
import {IUser, setUser} from "../../state/slice/UserSlice.ts";

function LoginRedirect() {

    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get(ParameterConstants.TOKEN);
    const sessionId = searchParams.get(ParameterConstants.SESSION_ID);

    useEffect(() => {
        if (token) {
            dispatch(setToken(token));
        }
        if (sessionId) {
            dispatch(setSessionId(sessionId));
        }

        UserServiceAPI.getUserProfile().then(value => {
            const user = value.data as IUser;
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
        });
    }, [token, sessionId, dispatch]);
    return (<Stack justifyContent={'center'} alignItems={'center'} height={"100%"}><CircularProgress/></Stack>)
}

export default LoginRedirect;