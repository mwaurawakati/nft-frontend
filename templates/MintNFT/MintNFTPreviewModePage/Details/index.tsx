import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";

type DetailsProps = {};

const Details = ({}: DetailsProps) => (
    <div className={styles.details}>
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.label}>Buy now</div>
                <div className={cn("h4", styles.value)}></div>
                <Link href="/buy-now">
                    <a
                        className={cn(
                            "button-medium button-wide",
                            styles.button
                        )}
                    >
                        buy now
                    </a>
                </Link>
            </div>
            <div className={styles.col}>
                <div className={styles.label}>Reserve</div>
                <div className={cn("h4", styles.value)}></div>
                <Link href="/place-a-bid">
                    <a
                        className={cn(
                            "button-stroke-grey button-medium button-wide",
                            styles.button
                        )}
                    >
                        place a bid
                    </a>
                </Link>
            </div>
        </div>
        <div className={styles.foot}>
            <div className={styles.box}>
                <div className={styles.label}>Last sold</div>
                <div className={cn("h4", styles.value)}></div>
            </div>
            <div className={styles.user}>
                <div className={cn(styles.avatar, styles.history)}>
                    <Image
                        src="/images/avatar.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.author}>Dash</div>
                    <div className={styles.code}>0x56C1...8eCC</div>
                </div>
            </div>
            <Link href="/make-offer">
                <a
                    className={cn(
                        "button-stroke-grey button-medium",
                        styles.button
                    )}
                >
                    make offer
                </a>
            </Link>
        </div>
    </div>
);

export default Details;
