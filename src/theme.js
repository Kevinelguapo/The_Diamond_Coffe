import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { teal, cyan, blueGrey } from "@mui/material/colors";

let Theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#c0c0c0",
                    },
                },
            },
        },
    },

    palette: {
        background: {
            default: "#000",
            paper: "#2C3639",
            darkPaper: "#1C2323",
            appBar: "#000",
            appBar2: "#2E4F4F",
            white: "#fff",
        },

        border: {
            main: teal[900],
            grey: blueGrey["A100"],
            darkGrey: "#2E4F4F",
            darkCoffee: "#7A5A3F",
            lightCoffee: "#F4DFBA",
            lightCoffee2: "#DCD7C9",

        },

        divider: {
            main: teal[900],
            light: teal["100"],
            coffee: "#CBAF87",
            gold: "#FFD966",
            // gold: FFD966
        },

        primary: {
            main: teal[600],
            dark: teal[900],
            light: teal[100],
            contrastText: "#fff",
        },
        secondary: {
            main: cyan[600],
            dark: cyan[900],
            light: cyan[100],
        },
        coffee: {
            main: "#A27B5C",
            dark: "#7A5A3F",
            light: "#DCD7C9",
        },
        action: {
            active: teal[50],
            disabled: teal[900],
        },
        text: {
            primary: "#fff",
            secondary: "#c0c0c0",
            black: "#000",
            disabled: "rgba(0,0,0,0.38)",
            coffee: "#CBAF87",
        },
    },
});

document.body.style.color = Theme.palette.text.primary;

export const theme = responsiveFontSizes(Theme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
});




