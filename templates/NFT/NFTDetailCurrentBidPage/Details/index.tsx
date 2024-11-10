import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import TimeCounter from "@/components/TimeCounter";

type DetailsProps = {};

const Details = ({}: DetailsProps) => (
    <div className={styles.details}>
        <div className={styles.head}>
            <div className={styles.flex}>
                <div className={styles.box}>
                    <div className={styles.label}>Current bid</div>
                    <div className={cn("h4", styles.price)}>1.50 ETH</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.label}>Auction ends in</div>
                    <TimeCounter
                        className={styles.timer}
                        classTimerItem={styles.timerItem}
                        classTimerValue={styles.timerValue}
                        classTimerText={styles.timerText}
                        time={12.75}
                    />
                </div>
            </div>
            <Link href="/place-a-bid">
                <a className={cn("button-medium button-wide", styles.button)}>
                    place a bid
                </a>
            </Link>
        </div>
        <div className={styles.foot}>
            <div className={styles.info}>Owned by</div>
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
        </div>
    </div>
);

export default Details;
