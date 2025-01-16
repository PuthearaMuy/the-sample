import './App.css'
import Layout from "./layout/Layout.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {ApplicationContext} from "./contexts/ApplicationContext.ts";
import {AppContext} from "./contexts/model/AppContext.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from 'notistack';
import {Provider} from "react-redux";
import {store} from "./state/store/store.ts";
import {outlinedInputClasses} from '@mui/material/OutlinedInput';

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--popin-font)',
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'var(--TextField-brandBorderColor)',
                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--TextField-brandBorderHoverColor)',
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--TextField-brandBorderFocusedColor)',
                    },
                    color: 'var(--primary-color)',
                    outline: 'none',
                    ['']: {
                        color: 'var(--primary-color)',
                    }
                },
            },
        }
    }
});

const queryClient = new QueryClient();
const appContext: AppContext = {
    applicationName: import.meta.env.VITE_APP_NAME,
};

function App() {
    return (
        <Provider store={store}>
            <ApplicationContext.Provider value={appContext}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider maxSnack={5}>
                            <Layout/>
                        </SnackbarProvider>
                    </ThemeProvider>
                </QueryClientProvider>
            </ApplicationContext.Provider>
        </Provider>
    )
}

export default App;
