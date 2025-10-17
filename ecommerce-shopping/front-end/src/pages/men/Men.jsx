import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, Button } from "@mui/material";

const Men = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 5, textAlign: "center" }}>
                <Typography variant="h4" mb={3}>
                    Discover Stylish Men's Products for Every Occasion
                </Typography>

                <Stack direction="row" spacing={3} justifyContent={"center"}>
                    <Link to="/men/t-shirts">
                        <Button variant="outlined">T-Shirts</Button>
                    </Link>

                    <Link to="/men/caps">
                        <Button variant="outlined">Jackets</Button>
                    </Link>
                    <Link to="/men/sunglasses">
                        <Button variant="outlined">Pants</Button>
                    </Link>

                    <Link to="/men/shoes">
                        <Button variant="outlined">Shoes</Button>
                    </Link>

                    <Link to="/men/sunglasses">
                        <Button variant="outlined">Watches</Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
    );
};

export default Men;
