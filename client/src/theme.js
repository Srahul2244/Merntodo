import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#F50057",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
  },
});

export default theme;
