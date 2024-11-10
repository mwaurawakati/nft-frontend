import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./MintNFTSignWalletPage.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Upload from "./Upload";

const MintNFTPage = () => {
    const router = useRouter();
    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                Mint your NFT
                            </div>
                            <button
                                className={cn("button-circle", styles.back)}
                                onClick={() => router.back()}
                                type="button"
                            >
                                <Icon name="arrow-left" />
                            </button>
                        </div>
                        <div className={styles.info}>
                            Approve the transaction in your wallet
                        </div>
                        <div className={styles.content}>
                            Deploying a smart contract means that your
                            collection will be added to the blockchain. Anytime
                            you interact with the blockchain, you’ll need to
                            approve the transaction and pay a gas fee to the
                            network.{" "}
                        </div>
                        <Link href="/mint-nft/congrats">
                            <a className={cn("button-large", styles.button)}>
                                <span>Approve</span>
                                <Icon name="arrow-right" />
                            </a>
                        </Link>
                    </>
                }
            >
                <Upload />
            </LayoutCreate>
        </Layout>
    );
};

export default MintNFTPage;
