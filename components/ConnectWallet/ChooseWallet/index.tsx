import { useState, useContext } from "react";
import cn from "classnames";
import styles from "./ChooseWallet.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

interface ConnectorUpdate {
  chainId: any;
}

import {
  NETWORK_ITEMS,
  PLATFORM_NETWORKS,
  RPC_URLs,
  config,
} from "../../../utils/api/config";
import { useAppDispatch, useAppSelector } from "../../../utils/api/hooks";
import {
  changeGlobalProvider,
  changeMemberOrNot,
  changeNetworkSymbol,
  changeWalletAddress,
  changeWalletStatus,
  selectCurrentNetworkSymbol,
} from "../../../utils/api/reducers/auth.reducers";
import { useSigningClient } from "../../../utils/api/cosmwasm";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import axios from "axios";
import { toast } from "react-toastify";
import {
  changeNetwork,
  isSupportedNetwork,
} from "../../../utils/InteractWithSmartContract/interact";
import Web3Modal from "web3modal";
import { providerOptions } from "../../../utils/InteractWithSmartContract/providerOptions";
import Web3 from "web3";

export interface WalletModalProps {
  show: boolean;
  onCloseModal: () => void;
  onOk: any;
  xummProvider: any;
}
export const web3Modal =
  typeof window !== "undefined"
    ? new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        disableInjectedProvider: false,
        providerOptions,
      })
    : null;

export const infura_Id = "84842078b09946638c03157f83405213";

const tabs = ["Coreum", "Ethereum", "BSC", "Polygon", "Avalanche", "XRPL"];

const wallets = {
  0: [
    {
      title: "Keplr",
      image: "/images/meta-mask.svg",
      id: "keplr",
    },
    {
      title: "Leap",
      image: "/images/wallet-connect.svg",
      id: "leap",
    },
    {
      title: "Cosmostation",
      image: "/images/wallet-connect.svg",
      id: "cosmostation",
    },
    {
      title: "WalletConnect",
      image: "/images/wallet-connect.svg",
      id: "walletconnect",
    },
  ],
  1: [
    {
      title: "MetaMask",
      image: "/images/meta-mask.svg",
      id: "metamask",
    },
    {
      title: "WalletConnect",
      image: "/images/wallet-connect.svg",
      id: "walletconnect",
    },
  ],
  2: [
    {
      title: "MetaMask",
      image: "/images/meta-mask.svg",
      id: "metamask",
    },
    {
      title: "WalletConnect",
      image: "/images/wallet-connect.svg",
      id: "walletconnect",
    },
  ],
  3: [
    {
      title: "MetaMask",
      image: "/images/meta-mask.svg",
      id: "metamask",
    },
    {
      title: "WalletConnect",
      image: "/images/wallet-connect.svg",
      id: "walletconnect",
    },
  ],
  4: [
    {
      title: "MetaMask",
      image: "/images/meta-mask.svg",
      id: "metamask",
    },
    {
      title: "WalletConnect",
      image: "/images/wallet-connect.svg",
      id: "walletconnect",
    },
  ],
  5: [
    {
      title: "XRPL",
      image: "/images/meta-mask.svg",
      id: "xrpl",
    },
  ],
};

type ChooseWalletProps = {
  // onScan?: () => void;
  onClickWallet?: () => void;
  xummProvider: any;
};

// export interface WalletModalProps {
//     show: boolean;
//     onCloseModal: () => void;
//     onOk: any;
//     xummProvider: any;
//   }

const ChooseWallet = ({ onClickWallet, xummProvider }: ChooseWalletProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const dispatch = useAppDispatch();
  const {
    connectWallet: connectToCoreum,
    disconnect: disconnectFromCoreum,
  }: any = useSigningClient();

  const loginXumm = () => {
    xummProvider
      .authorize()
      .then((res: any) => {
        if (res.me) {
          dispatch(changeWalletAddress(res?.me?.sub));
        }
        dispatch(changeWalletStatus(true));
        dispatch(changeNetworkSymbol(PLATFORM_NETWORKS.XRPL));
      })
      .catch((err: any) => {
        console.log("error with auth", err);
      });
  };

  let previousNetworkSymbol = currentNetworkSymbol;

  const handleSelectNetwork = async (networkSymbol: any) => {
    previousNetworkSymbol = currentNetworkSymbol;

    if (networkSymbol === PLATFORM_NETWORKS.COREUM) {
      dispatch(changeNetworkSymbol(networkSymbol));
    } else if (networkSymbol === PLATFORM_NETWORKS.XRPL) {
      disconnectFromCoreum();
      await loginXumm();
    } else {
      disconnectFromCoreum();
      dispatch(changeNetworkSymbol(networkSymbol));
    }
  };

  // ////////

  const isCommunityMember = (walletAddress: string) => {
    try {
      axios
        .post(`${config.baseUrl}users/isCommunityMember`, {
          wallet: walletAddress || "",
        })
        .then((response) => {
          let isM = response.data.data || false;
          dispatch(changeMemberOrNot(isM));
        });
    } catch (error) {
      console.log("isM error ===> ", error);
      dispatch(changeMemberOrNot(false));
    }
  };

  const handleWalletConnect = async () => {
    try {
      const walletconnect = new WalletConnectConnector({
        rpc: RPC_URLs,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        infuraId: infura_Id,
      });

      let connector_update = await walletconnect.activate();

      // if (
      //   RPC_URLs.keys.filter((item: any) => {
      //     return item === connector_update.chainId;
      //   }).length === 0
      // ) {
      //   walletconnect.deactivate();
      //   localStorage.removeItem("walletconnect");
      //   dispatch(changeWalletAddress(""));
      //   return;
      // }

      if (
        !Object.keys(RPC_URLs).includes(
          (connector_update as ConnectorUpdate).chainId.toString()
        )
      ) {
        walletconnect.deactivate();
        localStorage.removeItem("walletconnect");
        dispatch(changeWalletAddress(""));
        return;
      }

      const provider = connector_update.provider;

      const account: any = connector_update.account;

      dispatch(changeWalletAddress(account));
      isCommunityMember(account);

      dispatch(changeGlobalProvider(provider));
    } catch (error) {
      console.log(error);
      dispatch(changeWalletAddress(""));
    }
  };
  const authenticate = async (wallet_type: any) => {
    // console.log("wallet_type", wallet_type)
    await connectToCoreum(wallet_type);
  };
  const handleWalletOption = (id: any) => {
    if (id === "keplr") {
      authenticate("keplr");
    } else if (id === "leap") {
      authenticate("leap");
    } else if (id === "cosmostation") {
      authenticate("cosmostation");
    } else if (id === "walletconnect") {
      handleWalletConnect();
    }
  };

  const onClickChangeEVMNetwork = async (networkSymbol:any) => {
    try {
      let switchingResult = false;
      let result = await changeNetwork(networkSymbol);
      if (result) {
        if (result.success === true) {
          dispatch(changeNetworkSymbol(networkSymbol));
          switchingResult = true;
        } else {
          toast.warning(
            <div>
              <span>{result.message}</span>
              <br></br>
              <span>
                Please check your wallet. Try adding the chain to Wallet first.
              </span>
            </div>
          );
        }
      }
      return switchingResult;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onClickConnectEVMWallet = async () => {
    try {
      const provider = await web3Modal?.connect();

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      if (accounts[0]) {
        dispatch(changeWalletAddress(accounts[0]));
        isCommunityMember(accounts[0]);
      } else {
        dispatch(changeWalletAddress(""));
        dispatch(changeMemberOrNot(false));
      }
      dispatch(changeGlobalProvider(provider));
    } catch (error) {
      console.log(error);
      dispatch(changeWalletAddress(""));
    }
  };

  const handleMetaMask = async () => {
    let switchingResult = await onClickChangeEVMNetwork(currentNetworkSymbol);
    if (
      switchingResult === false &&
      isSupportedNetwork(previousNetworkSymbol) === true
    ) {
      handleSelectNetwork(previousNetworkSymbol);
    }
    if (switchingResult === true) onClickConnectEVMWallet();
  };

  const handWalletOption = (id:any) => {
    if (id === "metamask") {
      handleMetaMask();
    } else if (id === "walletconnect") {
      handleWalletConnect();
    }
  };

  //   ///////////

  return (
    <div className={styles.choose}>
      <div className={cn("h3", styles.title)}>Choose the wallet</div>
      <div className={styles.head}>
        <div className={styles.tabs}>
          {tabs.map((item, index) => (
            <button
              className={cn(styles.tab, {
                [styles.active]: activeIndex === index,
              })}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.wallets}>
        {(wallets[activeIndex as keyof typeof wallets] || []).map(
          (wallet, index) => (
            <button
              className={styles.wallet}
              key={index}
              onClick={() => {
                onClickWallet;
                handleWalletOption(wallet.id);
              }}
            >
              <span className={styles.inner}>
                <span className={styles.icon}>
                  <Image
                    src={wallet.image}
                    width={40}
                    height={40}
                    alt="Wallet"
                  />
                </span>
                {wallet.title} <Icon name="arrow-right" />
              </span>
            </button>
          )
        )}
      </div>
      {/* <div className={styles.btns}>
                <button className={styles.scan} onClick={onScan}>
                    Scan to connect
                </button>
            </div> */}
    </div>
  );
};

export default ChooseWallet;
