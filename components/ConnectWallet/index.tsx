import { useState } from "react";
import cn from "classnames";
import styles from "./ConnectWallet.module.sass";
import Logo from "@/components/Logo";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";
import ChooseWallet from "./ChooseWallet";
import ScanToConnect from "./ScanToConnect";
import Message from "./Message";


import { useSigningClient } from "../../utils/api/cosmwasm";
// import md5 from "md5";
// import SearchAutocomplete from "./SearchAutocomplete";
import { NETWORK_ITEMS } from "../../utils/api/config";
import { useAppDispatch, useAppSelector } from "../../utils/api/hooks";
import {
  changeWalletStatus,
  selectCurrentNetworkSymbol,
  selectCurrentWallet,
  selectWalletStatus,
} from "../../utils/api/reducers/auth.reducers";
import { getShortAddress, isEmpty } from "../../utils/api/methods";
import { xumm } from "@/utils/xummsdk";
// import WalletModal from "components/Modal/WalletModal";
import { Backdrop } from "@mui/material";
// import VideoPlayer from "components/StyleComponent/videoplayer";
import { useWalletOperations } from "../../utils/hooks/useWalletOperations"
// import { PillButton } from "./components/button";



type ConnectWalletProps = {
    onClickLogo?: any;
    onContinue?: any;
    collections?:any,
    items?:any,
    users?:any
};

const ConnectWallet = ({ onClickLogo, onContinue, collections, items, users }: ConnectWalletProps) => {
    const [cookies, setCookies] = useState<boolean>(false);
    const [scan, setScan] = useState<boolean>(false);
    const [message, setMessage] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {
      client,
      signingClient,
      loadClient,
      connectWallet: connectToCoreum,
    }: any = useSigningClient();
    const walletStatus = useAppSelector(selectWalletStatus);
    const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
    const walletAddress = useAppSelector(selectCurrentWallet);
    const [xSDK, setXummSDK] = useState(null);
    const [visibleWalletModal, setVisibleWalletModal] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const openWalletModal = () => setVisibleWalletModal(true);
    const closeWalletModal = () => setVisibleWalletModal(false);
    const { Login } = useWalletOperations();




    return (
        <div className={styles.row}>
            <div
                className={styles.col}
                style={{
                    backgroundColor:
                        (scan && "#B9A9FB") ||
                        (message && "#DBFF73") ||
                        "#BCE6EC",
                }}
            >
                <Logo className={styles.logo} onClick={onClickLogo} />
                <div className={styles.line}>
                    <h1 className={cn("h1", styles.title)}>Connect wallet.</h1>
                    <Arrow className={styles.arrow} color="#F7FBFA" />
                </div>
                <div className={styles.info}>
                    {message
                        ? "Sign the message in your wallet to continue"
                        : "Choose how you want to connect. There are several wallet providers."}
                </div>
            </div>
            <div className={styles.col}>
                {message ? (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => setMessage(false)}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <Message onContinue={onContinue} />
                    </>
                ) : scan ? (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => setScan(false)}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <ScanToConnect />
                    </>
                ) : (
                    <ChooseWallet
                        // onScan={() => setScan(true)}
                        onClickWallet={() => setMessage(false)}
                        xummProvider={xSDK}
                    />
                )}
                {/* {!message && (
                    <div
                        className={cn(styles.cookies, {
                            [styles.hide]: cookies,
                        })}
                    >
                        <div className={styles.text}>
                            We use 🍪 <span>cookies</span> for better experience
                        </div>
                        <button
                            className={styles.accept}
                            onClick={() => setCookies(true)}
                        >
                            Accept
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ConnectWallet;
