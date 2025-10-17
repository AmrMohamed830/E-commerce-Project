import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Home from "./pages/Home";
import Footer from "./components/footer/footer";
import Men from "./pages/men/Men";
import Women from "./pages/women/Women";
import MenCategory from "./pages/men/MenCategory";

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider
            // @ts-ignore
            value={colorMode}
        >
            <ThemeProvider
                // @ts-ignore
                theme={theme}
            >
                <CssBaseline />
                <Router>
                    <Header1 />
                    <Header2 />
                    <Header3 />

                    <Box
                        bgcolor={
                            // @ts-ignore
                            theme.palette.bg.main
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/men" element={<Men />} />
                            <Route
                                path="/men/:subcategory"
                                element={<MenCategory />}
                            />
                            <Route path="/women" element={<Women />} />
                        </Routes>
                    </Box>
                    <ScrollToTop />
                    <Footer />
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
