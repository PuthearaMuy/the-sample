import './App.css'
import Layout from "./layout/Layout.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--popin-font)',
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Layout/>
            </ThemeProvider>
        </>
    )
}

export default App
