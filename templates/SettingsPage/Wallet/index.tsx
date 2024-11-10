import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type WalletProps = {};

const Wallet = ({}: WalletProps) => (
    <>
        <div className={styles.wallet}>
            <div className={styles.icon}>
                <Image
                    src="/images/etherium.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Etherium"
                />
            </div>
            <div className={styles.details}>
                <div className={styles.code}>
                    <span className={styles.desktop}>
                        0x1e862Be555a66Ea69....533B
                    </span>
                    <span className={styles.tablet}>0x1e862Be5....533B</span>
                    <span className={styles.mobile}>0x1e...533B</span>
                    <button className={styles.copy}>
                        <Icon name="copy" />
                    </button>
                </div>
                <div className={styles.note}>Ethereum</div>
            </div>
            <Link href="/">
                <a className={cn("button-circle", styles.exit)}>
                    <Icon name="logout" />
                </a>
            </Link>
        </div>
        <button className={cn("button-stroke-grey button-wide", styles.button)}>
            link wallet
        </button>
    </>
);

export default Wallet;
