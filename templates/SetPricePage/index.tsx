import { useState } from "react";
import cn from "classnames";
import styles from "./SetPricePage.module.sass";
import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Price from "@/components/Price";
import Details from "@/components/Details";

const statistics = [
    {
        label: "Created by",
        avatar: "/images/avatar.jpg",
        history: true,
        title: "Dash",
        login: "randomdash",
    },
    {
        label: "Collection",
        image: "/images/balls.jpg",
        title: "Escape",
        category: "cute",
    },
];

const links = [
    {
        title: "View on Etherscane",
        icon: "country",
        url: "https://ui8.net/",
    },
    {
        title: "View metadata",
        icon: "link",
        url: "https://ui8.net/",
    },
    {
        title: "View on IPFS",
        icon: "link",
        url: "https://ui8.net/",
    },
];

const provenance = [
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                Minted by <span>@randomdash</span>
            </>
        ),
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
];

const MintNFTPage = () => {
    const [buy, setBuy] = useState<boolean>(false);
    const [reserve, setReserve] = useState<boolean>(false);
    const [buyValue, setBuyValue] = useState<string>("");
    const [reserveValue, setReserveValue] = useState<string>("");

    return (
        <Layout layoutNoOverflow footerHide>
            <Description
                image="/images/main-pic-1.jpg"
                captionHide={buy || reserve}
                title="Escape"
                date="Minted on Aug 18, 2022"
                statistics={statistics}
                links={links}
                addTags
                provenance={provenance}
                content="Premier Coreum NFT Marketplace"
            >
                {buy && (
                    <>
                        <Details
                            title="Set a Buy Now price"
                            content={
                                <>
                                    <p>
                                        Buyers will be able to instantly buy the
                                        NFT.
                                    </p>
                                    <p>You may edit this price at any time.</p>
                                </>
                            }
                            linkUrl="/article"
                            linkTitle="Learn how Buy Now price work"
                            onClose={() => setBuy(false)}
                        />
                        <Price
                            title="Buy now price"
                            value={buyValue}
                            setValue={setBuyValue}
                            crypterFee="0.00 ETH"
                            percent="2%"
                            totalReceive="0.00 ETH"
                            buttonText="set price"
                            onClick={() => setBuy(false)}
                            content="Premier Coreum NFT Marketplace"
                        />
                    </>
                )}
                {reserve && (
                    <>
                        <Details
                            title="Set a Reserve price"
                            content={
                                <>
                                    <p>
                                        Buyers will be able to instantly buy the
                                        NFT.
                                    </p>
                                    <p>You may edit this price at any time.</p>
                                </>
                            }
                            linkUrl="/article"
                            linkTitle="Learn how Reserve price work"
                            onClose={() => setReserve(false)}
                        />
                        <Price
                            title="Reserve price"
                            value={reserveValue}
                            setValue={setReserveValue}
                            crypterFee="0.00 ETH"
                            percent="2%"
                            totalReceive="0.00 ETH"
                            buttonText="set price"
                            onClick={() => setReserve(false)}
                            content="Premier Coreum NFT Marketplace"
                        />
                    </>
                )}
                {!buy && !reserve && (
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.label}>Buy now</div>
                            <div className={cn("h4", styles.value)}>
                                {buyValue || "-"}
                            </div>
                            <button
                                className={cn(
                                    "button-medium button-wide",
                                    styles.button
                                )}
                                onClick={() => setBuy(true)}
                            >
                                set buy now price
                            </button>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.label}>Reserve</div>
                            <div className={cn("h4", styles.value)}>
                                {reserveValue || "-"}
                            </div>
                            <button
                                className={cn(
                                    "button-stroke-grey button-medium button-wide",
                                    styles.button
                                )}
                                onClick={() => setReserve(true)}
                            >
                                set reserve price
                            </button>
                        </div>
                    </div>
                )}
            </Description>
        </Layout>
    );
};

export default MintNFTPage;
