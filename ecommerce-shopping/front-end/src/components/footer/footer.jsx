import { ShoppingCartOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "black" }}>
            <Container  maxWidth="xl" sx={{ py: 10, color: "white" }}>
                {/* بوكسين جنب بعض */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexWrap="wrap"
                    gap={4}
                >
                    {/* البوكس الأول */}
                    <Box sx={{  flex: "1 1 19%" }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            mb={1}
                        >
                            <ShoppingCartOutlined  />
                            <Typography variant="h6" fontWeight="bold">
                                Outfito
                            </Typography>
                        </Stack>
                        <Typography variant="body2" >
                            © 2025 E-Shop. Your trusted destination for
                            high-quality products at the best prices. We aim to
                            provide you with a smooth and enjoyable shopping
                            experience every time you visit our store.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: "1 1 19%" }}>
                        <Typography variant="h6" mb={1}>
                            Customer Care
                        </Typography>
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {["Home", "Shop", "Contact"].map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        width: "fit-content",
                                        p: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "translateX(8px)",
                                            scale: "1.1",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <ArrowRightIcon fontSize="small" />
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ flex: "1 1 19%" }}>
                        <Typography variant="h6" mb={1}>
                            Customer Care
                        </Typography>
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {["Home", "Shop", "Contact"].map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        width: "fit-content",
                                        p: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "translateX(8px)",
                                            scale: "1.1",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <ArrowRightIcon fontSize="small" />
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ flex: "1 1 19%" }}>
                        <Typography variant="h6" mb={1}>
                            Customer Care
                        </Typography>
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {["Home", "Shop", "Contact"].map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        width: "fit-content",
                                        p: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "translateX(8px)",
                                            scale: "1.1",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <ArrowRightIcon fontSize="small" />
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Stack>
            </Container>
            <Box
                sx={{
                    bgcolor: "#2B3445",
                    py: 1.3,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    textAlign: "center",
                }}
            >
                <Typography
                    maxWidth={"400px"}
                    margin={"auto"}
                    justifyContent={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    color={"HighlightText"}
                    variant="h6"
                    sx={{ fontSize: 14 }}
                >
                    Conditions of Use & Sale Privacy Notice Interest-Based Ads
                    ©2025, Outfito.com, Inc. or its affiliates
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
