import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import cn from "classnames";
import styles from "./Layout.module.sass";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { config } from "@/utils/api/config";


import axios from "axios";
import { useAppSelector } from "@/utils/api/hooks";
import { selectCurrentWallet } from "@/utils/api/reducers/auth.reducers";

type LayoutProps = {
    layoutNoOverflow?: boolean;
    classHeader?: string;
    headerHide?: boolean;
    noRegistration?: boolean;
    lightHeader?: any;
    emptyHeader?: boolean;
    footerHide?: boolean;
    background?: string;
    children: React.ReactNode;
};

const Layout = ({
    layoutNoOverflow,
    classHeader,
    noRegistration,
    headerHide,
    lightHeader,
    emptyHeader,
    footerHide,
    background,
    children,
}: LayoutProps) => {
    const { pathname } = useRouter();


  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const walletAddress = useAppSelector(selectCurrentWallet);
  const [walletConnected, setWalletConnected] = useState((walletAddress !== "" && walletAddress !== undefined && walletAddress !== null)? true : false);


    const fetchData = async () => {
        console.log("fetching.....")
        try {
          const resp = await axios.get(`${config.API_URL}api/collection/search`);
          setCollections(resp.data.collections);
          setItems(resp.data.items);
          setUsers(resp.data.usersData);
        } catch (err) {
          console.log("Error Search Items: ", err);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <>
            <Head>
                <title>Crypter 2</title>
            </Head>
            <div
                className={cn(styles.layout, {
                    [styles.noOverflow]: layoutNoOverflow,
                })}
                style={{ backgroundColor: background }}
            >
                {!headerHide && (
                    <Header
                        className={classHeader}
                        noRegistration={noRegistration}
                        light={lightHeader}
                        empty={emptyHeader}
                        collections={collections} 
                        items={items} 
                        users={users}
                        walletConnected={walletConnected}
                    />
                )}
                <div className={styles.inner}>{children}</div>
                {!footerHide && <Footer />}
            </div>
        </>
    );
};

export default Layout;
