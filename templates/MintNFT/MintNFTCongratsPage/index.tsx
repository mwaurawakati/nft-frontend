import Link from "next/link";
import cn from "classnames";
import styles from "./MintNFTCongratsPage.module.sass";
import Layout from "@/components/Layout";
import Congrats from "@/components/Congrats";
import Header from "@/components/Header";

const CreatPage = () => {
    return (
        <Layout
            classHeader={styles.header}
            background="#F1F4F4"
            layoutNoOverflow
            footerHide
            emptyHeader
        >
            <Congrats
                title="Congrats"
                content={
                    <>
                        Congratulations! Your artwork has officially been minted
                        as an NFT on the Ethereum blockchain to your collection
                        Cute Planet
                    </>
                }
            />
        </Layout>
    );
};

export default CreatPage;
