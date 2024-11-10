import cn from "classnames";
import styles from "./Offer.module.sass";
import Image from "@/components/Image";

type OfferProps = {};

const Offer = ({}: OfferProps) => (
    <div className={styles.offer}>
        <div className={cn("h3", styles.title)}>1 Offer</div>
        <div className={styles.box}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <Image
                        src="/images/artists/artist-1.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.details}>
                    <div className={styles.line}>
                        <div className={styles.text}>Received from</div>
                        <div className={styles.code}>x456...8jh7</div>
                    </div>
                    <div className={styles.login}>@randomdash</div>
                </div>
            </div>
            <div className={styles.subtitle}>Offer price</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={cn("h3", styles.price)}>1.00</div>
                    <div className={cn("h3", styles.price)}>ETH</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Crypter fee</div>
                    <div className={styles.value}>0.0055 ETH</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Total receive</div>
                    <div className={styles.percent}>2%</div>
                    <div className={styles.value}>0.9945 ETH</div>
                </div>
            </div>
            <button
                className={cn(
                    "button-white button-wide button-large",
                    styles.button
                )}
            >
                Accept offer
            </button>
        </div>
    </div>
);

export default Offer;
