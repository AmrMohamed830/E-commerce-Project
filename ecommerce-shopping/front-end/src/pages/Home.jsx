import { Box } from "@mui/material";
import Hero from "../components/hero/Hero";
import Main from "../components/main/main";
import Offers from "../components/main/hotDeals";

const Home = () => {
    return (
        <Box>
            <Hero />
            <Offers />
            <Main />
        </Box>
    );
};

export default Home;