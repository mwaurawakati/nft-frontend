import '@/styles/globals.css'
import "../styles/app.sass";
import "../styles/index.scss";
import type { AppProps } from "next/app";

// import "./styles/index.scss";
// import "./styles/custom.scss";
// import "./index.css";
import "rc-slider/assets/index.css";
import "react-tooltip/dist/react-tooltip.css";

// import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "../utils/api/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SigningCosmWasmProvider } from "@/utils/api/cosmwasm";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <SigningCosmWasmProvider>
            <Component {...pageProps} />
            <ToastContainer />
            </SigningCosmWasmProvider>
          </PersistGate>
        </Provider>
      );
}

export default MyApp;
