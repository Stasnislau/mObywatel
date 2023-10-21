import { Typography, Button, Box } from "@mui/material";
const GettingStarted = () => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                }}
            >
                Witaj w aplikacji mObywatel2.0!
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Aby rozpocząć korzystanie z aplikacji,
            </Typography>
            <Typography variant="body1" gutterBottom>
                wybierz albo stwórz nowy czat.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Czaty są dostęmne po liewej stronie ekranu.
            </Typography>
        </Box>
    );
};

export default GettingStarted;