import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ConnectWallet from "@/components/ConnectWallet";
import Search from "./Search";
import Discover from "./Discover";
import Profile from "./Profile";
import Menu from "./Menu";
import { resultSearch } from "@/mocks/resultSearch";

import { useSigningClient } from "@/utils/api/cosmwasm";
import md5 from "md5";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import {
  changeWalletStatus,
  selectCurrentNetworkSymbol,
  selectCurrentWallet,
  selectWalletStatus,
} from "@/utils/api/reducers/auth.reducers";
import { getShortAddress, isEmpty } from "@/utils/api/methods";
import { xumm } from "utils/xummsdk";
import { Backdrop } from "@mui/material";
// import VideoPlayer from "components/StyleComponent/videoplayer";
import { useWalletOperations } from "@/utils/hooks/useWalletOperations";
// import { PillButton } from "./components/button";

const menu: any = [
  // {
  //   title: "Discover",
  //   url: "/discover",
  // },
  // {
  //   title: "Feed",
  //   url: "/feed",
  // },
];

type HeaderProps = {
  className?: string;
  noRegistration?: boolean;
  light?: boolean;
  empty?: boolean;
  collections?: any;
  items?: any;
  users?: any;
  walletConnected?: any;
};

const Header = ({
  className,
  noRegistration,
  light,
  empty,
  collections,
  items,
  users,
  walletConnected,
}: HeaderProps) => {
  // console.log(":::headers:::",{
  //   className:className,
  //   noRegistration:noRegistration,
  //   light:light,
  //   empty:empty,
  //   collections:collections,
  //   items:items,
  //   users:users,
  //   walletConnected:walletConnected,
  // })

  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);
  useHotkeys("esc", () => setVisibleProfile(false));

  const handleClick = () => {
    setConnect(false);
    setRegistration(true);
  };

  // /////////
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
  //   const [xSDK, setXummSDK] = useState(null);
  const [xSDK, setXummSDK] = useState<any>(null);
  const [visibleWalletModal, setVisibleWalletModal] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const openWalletModal = () => setVisibleWalletModal(true);
  const closeWalletModal = () => setVisibleWalletModal(false);
  const { Login } = useWalletOperations();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  interface ParamsType {
    address: string;
    password: string;
  }

  useEffect(() => {
    if (!isEmpty(walletAddress)) {
      dispatch(changeWalletStatus(true));
      //   const params: ParamsType = { address: "", password: "" };
      //   params.address = walletAddress;
      //   params.password = md5(walletAddress);
      const params: ParamsType = {
        address: walletAddress || "",
        password: walletAddress ? md5(walletAddress) : "",
      };
      // console.log('Password:', params.password)
      Login(params);
    } else {
      dispatch(changeWalletStatus(false));
    }
  }, [walletAddress, dispatch, Login]);

  useEffect(() => {
    (async () => {
      try {
        if (!client) {
          await loadClient();
        }
      } catch (err) {
        setTimeout(() => loadClient(), 1000);
      }
    })();
  }, [client, loadClient]);

  useEffect(() => {
    (async () => {
      try {
        if (
          !signingClient &&
          localStorage.getItem("address") &&
          localStorage.getItem("wallet_type")
        ) {
          await connectToCoreum(localStorage.getItem("wallet_type"));
        }
      } catch (err) {}
    })();
  }, [signingClient, connectToCoreum]);

  useEffect(() => {
    xumm.then(async (xummSDK) => {
      // console.log("loginXumm xummSDK", xummSDK.runtime);
      if (!xummSDK.runtime) return;
      const xrt = { ...xummSDK.runtime };
      setXummSDK(xummSDK);

      xummSDK.environment.bearer
        ?.then((r) => {
          console.log("bearer", r);
        })
        .catch((err) => {
          console.log("error with bearer", err);
        });
      if (xrt.xapp) {
        // console.log("XAPP in App");
        xummSDK.environment.ott?.then((r) => console.log("ott App", r));
      }

      if (xrt.browser && !xrt.xapp) {
        // console.log("WEBAPP in App");
        xummSDK.environment.openid?.then((r) => {
          console.log("openid App", r);
        });
      }
    });
  }, []);

  return (
    <>
      <header
        className={cn(
          styles.header,
          {
            [styles.profileOpen]: visibleProfile,
            [styles.light]: visibleProfile || light,
            [styles.empty]: empty,
            [styles.noRegistration]: noRegistration && !registration,
          },
          className
        )}
      >
        {walletAddress ? (
          //   <>
          //     <Logo className={styles.logo} light={visibleProfile || light} />
          //     <p>Connected</p>
          //     <Profile
          //       className={styles.profile}
          //       headClassName={styles.profileHead}
          //       bodyClassName={styles.profileBody}
          //       onOpen={() => setVisibleProfile(!visibleProfile)}
          //       onClose={() => setVisibleProfile(false)}
          //       visible={visibleProfile}
          //     />
          //   </>

          <>
            <div className={styles.col}>
              <Logo className={styles.logo} light={visibleProfile || light} />
              <Search
                className={styles.search}
                result={resultSearch}
                light={visibleProfile || light}
              />
            </div>
            <div className={styles.col}>
              <Discover
                className={styles.discover}
                light={visibleProfile || light}
              />
              <div className={styles.navigation}>
                {menu.map((link: any, index: any) => (
                  <Link href={link.url} key={index}>
                    <a className={styles.link}>{link.title}</a>
                  </Link>
                ))}
              </div>

              <Link href="/notification">
                <a className={cn(styles.notification, styles.active)}>
                  <Icon name="flash" />
                </a>
              </Link>
              <Profile
                className={styles.profile}
                onOpen={() => setVisibleProfile(!visibleProfile)}
                onClose={() => setVisibleProfile(false)}
                visible={visibleProfile}
              />
              <Menu classBurger={styles.burger} resultSearch={resultSearch} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.col}>
              <Logo className={styles.logo} light={visibleProfile || light} />
              <Search
                className={styles.search}
                result={resultSearch}
                light={visibleProfile || light}
              />
            </div>
            <div className={styles.col}>
              <Discover
                className={styles.discover}
                light={visibleProfile || light}
              />
              <div className={styles.navigation}>
                {menu.map((link: any, index: any) => (
                  <Link href={link.url} key={index}>
                    <a className={styles.link}>{link.title}</a>
                  </Link>
                ))}
              </div>

              {/* Changed the Link in the create button to button tag and chnaged the text from "create to connect" */}
              <button
                className={cn(
                  "button-stroke button-medium",
                  styles.button,
                  styles.create
                )}
                onClick={() => setConnect(true)}
              >
                <span>connect</span>
                <Icon name="plus" />
              </button>

              {/* <Link href="/create">
                <a
                  className={cn(
                    "button-stroke button-medium",
                    styles.button,
                    styles.create
                  )}
                >
                  <span>create</span>
                  <Icon name="plus" />
                </a>
              </Link> */}

              {/* ::::::::::::::::::::::::::::::::::
                The Connect-Wallet Button is hidden with sass conditioning
              ::::::::::::::::::::::::::::::::::: */}
              <button
                className={cn(
                  "button-stroke button-medium",
                  styles.button,
                  styles.connect
                )}
                onClick={() => setConnect(true)}
              >
                connect wallet
              </button>
              {/* ::::::::::::::::::::::::::::::::::: */}

              <Menu classBurger={styles.burger} resultSearch={resultSearch} />
            </div>
          </>
        )}
      </header>
      <div
        className={cn(styles.overlay, {
          [styles.visible]: visibleProfile,
        })}
      ></div>
      <Modal
        className={styles.modal}
        closeClassName={styles.close}
        visible={connect}
        onClose={() => setConnect(false)}
      >
        <ConnectWallet
          onClickLogo={() => setConnect(false)}
          onContinue={handleClick}
          collections={collections}
          items={items}
          users={users}
        />
      </Modal>
    </>
  );
};

export default Header;
