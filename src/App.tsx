import { createContext } from "react";
import Store from "./store";
import MainPage from "./Pages/mainPage";
import WrapperComponent from "./components/wrapper";
import { ThemeProvider, createTheme } from "@mui/material";
const store = new Store();
export const Context = createContext(store);

const theme = createTheme({
  palette: {
    primary: {
      main: "#277fbd",
    },
    secondary: {
      main: "#fff",
    },
  },
});

function App() {
  return (
    <div className="App">
      <Context.Provider value={store}>
        <ThemeProvider theme={theme}>
          <WrapperComponent>
            <MainPage />
          </WrapperComponent>
        </ThemeProvider>
      </Context.Provider>
    </div>
  );
}

export default App;