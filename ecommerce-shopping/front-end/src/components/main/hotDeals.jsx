import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    IconButton,
    Rating,
    Stack,
    Typography,
    Chip,
} from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "framer-motion";

const Offers = () => {
    const [open, setOpen] = useState(false);
    const [clickedProduct, setclickedProduct] = useState({});

    const offerProductsAPI = "products?populate=*&filters[isOffer][$eq]=true";
    const { data, error, isLoading } =
        useGetproductByNameQuery(offerProductsAPI);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (isLoading) {
        return (
            <Box sx={{ py: 11, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 11, textAlign: "center" }}>
                <Typography variant="h6">
                    {
                        // @ts-ignore
                        error.error
                    }
                </Typography>
                <Typography variant="h6">Please try again later</Typography>
            </Container>
        );
    }

    if (data) {
        return (
            <Container sx={{ py: 9 }}>
                <Box mb={4}>
                    <Typography variant="h5" fontWeight="bold">
                        🔥 Hot Deals
                    </Typography>
                    <Typography fontWeight={300} variant="body1">
                        Best offers and discounts on trending products
                    </Typography>
                </Box>

                <AnimatePresence>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                        gap={4}
                    >
                        {data.data.map((item) => {
                            const product = item;
                            const {
                                productTitle,
                                productPrice,
                                oldPrice,
                                productDescription,
                                productRating,
                                productimg,
                                discountPercent,
                            } = product;

                            const discount = discountPercent
                                ? discountPercent
                                : oldPrice
                                ? Math.round(
                                      ((oldPrice - productPrice) / oldPrice) *
                                          100
                                  )
                                : 0;

                            return (
                                <Card
                                    component={motion.section}
                                    layout
                                    initial={{ transform: "scale(0)" }}
                                    animate={{ transform: "scale(1)" }}
                                    transition={{
                                        duration: 1.3,
                                        type: "spring",
                                        stiffness: 50,
                                    }}
                                    key={item.id}
                                    sx={{
                                        maxWidth: 333,
                                        mt: 2,
                                        position: "relative",
                                        overflow: "hidden",
                                        ":hover .MuiCardMedia-root ": {
                                            rotate: "1deg",
                                            scale: "1.1",
                                            transition: "0.35s",
                                        },
                                    }}
                                >
                                    {/* نسبة الخصم */}
                                    {discount > 0 && (
                                        <Chip
                                            label={`-${discount}%`}
                                            color="error"
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                left: 10,
                                                fontWeight: "bold",
                                            }}
                                        />
                                    )}

                                    <CardMedia
                                        sx={{ height: 277, borderRadius: 1 }}
                                        image={`http://localhost:1337${
                                            productimg?.[0]?.url || ""
                                        }`}
                                        title={productTitle}
                                    />

                                    <CardContent>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                            >
                                                {productTitle}
                                            </Typography>

                                            <Box textAlign="right">
                                                {oldPrice && (
                                                    <Typography
                                                        variant="h6"
                                                        
                                                        sx={{
                                                            color: "red",
                                                            textDecoration:
                                                                "line-through",
                                                        }}
                                                    >
                                                        ${oldPrice}
                                                    </Typography>
                                                )}
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        color: "text.secondary",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    ${productPrice}
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,
                                                height: 40,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {productDescription}
                                        </Typography>
                                    </CardContent>

                                    <CardActions
                                        sx={{ justifyContent: "space-between" }}
                                    >
                                        <Button
                                            onClick={() => {
                                                handleClickOpen();
                                                setclickedProduct(item);
                                            }}
                                            sx={{ textTransform: "capitalize" }}
                                            size="large"
                                        >
                                            <AddShoppingCartOutlinedIcon
                                                sx={{ mr: 1 }}
                                                fontSize="small"
                                            />
                                            add to cart
                                        </Button>
                                        <Rating
                                            precision={0.1}
                                            name="read-only"
                                            value={productRating}
                                            readOnly
                                        />
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Box>
                </AnimatePresence>

                <Dialog
                    sx={{
                        ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } },
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <IconButton
                        sx={{
                            ":hover": {
                                color: "red",
                                rotate: "180deg",
                                transition: "0.3s",
                            },
                            position: "absolute",
                            top: 0,
                            right: 10,
                        }}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>

                    <ProductDetails clickedProduct={clickedProduct} />
                </Dialog>
            </Container>
        );
    }
};

export default Offers;
