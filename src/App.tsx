import './App.css'
import Layout from "./layout/Layout.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {ApplicationContext} from "./contexts/ApplicationContext.ts";
import {AppContext} from "./contexts/model/AppContext.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from 'notistack';

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--popin-font)',
    },
});

const queryClient = new QueryClient();
const appContext: AppContext = {
    applicationName: import.meta.env.VITE_APP_NAME,
};

function App() {
    return (
        <ApplicationContext.Provider value={appContext}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={5}>
                        <Layout/>
                    </SnackbarProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </ApplicationContext.Provider>
    )
}

export default App;
