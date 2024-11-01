import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CookiesProvider } from "react-cookie";

import "./App.css";

import router from "./router";
import ContextProvider from "./store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ContextProvider>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
