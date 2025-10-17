import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Stack,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

const ProductDetails = ({ clickedProduct }) => {
    const [selectedImg, setselectedImg] = useState(0);

    
    if (!clickedProduct || !clickedProduct.productimg) {
        return (
            <Box sx={{ p: 5, textAlign: "center" }}>
                <Typography variant="h6">Loading product details...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                flexDirection: { xs: "column", sm: "row" },
                p: 3,
            }}
        >
            
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    width={360}
                    src={`http://localhost:1337${
                        clickedProduct.productimg[selectedImg]?.url || ""
                    }`}
                    alt={clickedProduct.productTitle}
                    style={{ borderRadius: 10 }}
                />
            </Box>

            
            <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    {clickedProduct.productTitle}
                </Typography>

                <Typography
                    my={0.4}
                    fontSize={"22px"}
                    color={"crimson"}
                    variant="h6"
                >
                    ${clickedProduct.productPrice}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    {clickedProduct.productDescription}
                </Typography>

                <Stack
                    sx={{
                        justifyContent: { xs: "center", sm: "left" },
                    }}
                    direction={"row"}
                    gap={1}
                    my={2}
                >
                    <ToggleButtonGroup
                        value={selectedImg}
                        exclusive
                        sx={{
                            ".Mui-selected": {
                                border: "2px solid royalblue !important",
                                opacity: "1",
                                backgroundColor: "initial",
                            },
                        }}
                    >
                        {clickedProduct.productimg.map((item, index) => (
                            <ToggleButton
                                key={item.id}
                                value={index}
                                sx={{
                                    width: "90px",
                                    height: "90px",
                                    mx: 0.5,
                                    p: 0,
                                    opacity: selectedImg === index ? 1 : 0.6,
                                }}
                            >
                                <img
                                    onClick={() => setselectedImg(index)}
                                    style={{
                                        borderRadius: 5,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    src={`http://localhost:1337${item.url}`}
                                    alt={`Image ${index + 1}`}
                                />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>

                <Button
                    sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
                    variant="contained"
                >
                    <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
                    Buy now
                </Button>
            </Box>
        </Box>
    );
};

export default ProductDetails;
