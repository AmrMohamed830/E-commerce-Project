import {
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Rating,
    Chip,
    Stack,
    Dialog,
    IconButton,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/main/ProductDetails"; // لو عندك المكون ده في نفس المشروع

const MenCategory = () => {
    const { subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [clickedProduct, setClickedProduct] = useState({});

    const handleClickOpen = (product) => {
        setClickedProduct(product);
        setOpen(true);
    };
    //  بيانات السلايدر (تقدر تغير الصور أو النصوص براحتك)
    const slides = [
        {
            image: "/images/download (5).jpeg",
            title: "New T-Shirts Collection",
            subtitle: "Upgrade your wardrobe with our latest arrivals.",
        },
        {
            image: "/images/banner-15.jpg",
            title: "Stylish & Comfortable",
            subtitle: "Discover premium quality fabrics made for you.",
        },
        {
            image: "/images/banner-25.jpg",
            title: "Exclusive Deals",
            subtitle: "Don’t miss out on limited-time discounts.",
        },
    ];

    //  تحريك السلايدر تلقائي كل 4 ثوانٍ
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios
            .get("http://localhost:1337/api/products?populate=*")
            .then((res) => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [subcategory]);

    if (loading)
        return (
            <Box sx={{ py: 11, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );

    //  فلترة المنتجات حسب الـ subcategory
    const filteredProducts = products.filter(
        (p) => p.subcategory === subcategory
    );

    return (
        <Container sx={{ py: 8 }}>
            {subcategory === "t-shirts" && (
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 3,
                        mb: 7,
                        height: { xs: 220, sm: 300, md: 400 },
                    }}
                >
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                            }}
                        >
                            <Box
                                component="img"
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.8)",
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10%",
                                    transform: "translateY(-50%)",
                                    color: "#fff",
                                    maxWidth: 400,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    {slides[currentSlide].title}
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    {slides[currentSlide].subtitle}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </motion.div>
                    </AnimatePresence>
                </Box>
            )}

            {/*  عنوان الصفحة */}
            <Box mb={4}>
                <Typography variant="h5" fontWeight="bold">
                    {subcategory?.toUpperCase()} Collection
                </Typography>
                <Typography fontWeight={300} variant="body1">
                    Discover the best {subcategory} for men
                </Typography>
            </Box>

            {/*  المنتجات */}
            <AnimatePresence>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                    gap={4}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => {
                            const {
                                id,
                                productTitle,
                                productPrice,
                                oldPrice,
                                productDescription,
                                productRating,
                                productimg,
                                discountPercent,
                            } = item;

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
                                    key={id}
                                    sx={{
                                        maxWidth: 333,
                                        mt: 4,
                                        position: "relative",
                                        overflow: "hidden",
                                        ":hover .MuiCardMedia-root ": {
                                            rotate: "1deg",
                                            scale: "1.1",
                                            transition: "0.35s",
                                        },
                                    }}
                                >
                                    {/*  نسبة الخصم */}
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
                                        sx={{ height: 277 }}
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

                                            <Typography
                                                variant="subtitle1"
                                                component="p"
                                            >
                                                ${productPrice}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
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
                                            onClick={() =>
                                                handleClickOpen(item)
                                            }
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
                        })
                    ) : (
                        <Typography
                            variant="h6"
                            textAlign="center"
                            color="text.secondary"
                            sx={{ gridColumn: "1 / -1", mt: 5 }}
                        >
                            No products found for "{subcategory}"
                        </Typography>
                    )}
                </Box>
            </AnimatePresence>

            {/*  Dialog عرض التفاصيل */}
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
};

export default MenCategory;
