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
import ApplicationStartUp from "./page/ApplicationStartUp.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    cssVariables: true,
    typography: {
        fontFamily: 'var(--popin-font)',
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: 'none',
                    boxShadow: '0 0 2px 1px var(--primary-input-border-color)',
                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--TextField-brandBorderHoverColor)',
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        boxShadow: '0 0 2px 2px var(--primary-input-border-color)',
                    },
                    color: 'var(--primary-color)',
                    outline: 'none',
                    ['']: {
                        color: 'var(--primary-color)',
                    },
                    borderRadius: '7px'
                },
            },
        }
    }
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const appContext: AppContext = {
    applicationName: import.meta.env.VITE_APP_NAME,
};

function App() {
    return (
        <Provider store={store}>
            <ApplicationStartUp>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ApplicationContext.Provider value={appContext}>
                        <QueryClientProvider client={queryClient}>
                            <ThemeProvider theme={theme}>
                                <SnackbarProvider maxSnack={5}>
                                    <Layout/>
                                </SnackbarProvider>
                            </ThemeProvider>
                        </QueryClientProvider>
                    </ApplicationContext.Provider>
                </LocalizationProvider>
            </ApplicationStartUp>
        </Provider>
    )
}

export default App;
