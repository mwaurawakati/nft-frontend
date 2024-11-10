import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "@/components/Icon";
import TimeCounter from "@/components/TimeCounter";

type DetailsProps = {
    title: string;
    bid?: string;
    price?: string;
    time?: number;
    content?: any;
    linkUrl: string;
    linkTitle: string;
    onClose?: any;
    globalDetailNFT?:any;
};

const Details = ({
    title,
    bid,
    price,
    time,
    content,
    linkUrl,
    linkTitle,
    onClose,
    globalDetailNFT,
}: DetailsProps) => {
    const router = useRouter();

    return (
        <div className={styles.details}>
            <div className={styles.head}>
                <div className={cn("h3", styles.title)}>{title}</div>
                <button
                    className={cn("button-circle button-medium", styles.close)}
                    onClick={onClose || (() => router.back())}
                >
                    <Icon name="close-fat" />
                </button>
            </div>
            {content && <div className={styles.content}>{content}</div>}
            {bid && (
                <div className={styles.bid}>
                    <div className={styles.box}>
                        <div className={styles.label}>Highest bid</div>
                        <div className={cn("h3", styles.crypto)}>{bid}</div>
                        <div className={styles.price}>{price}</div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.label}>Auction ends in</div>
                        {/* <TimeCounter
                            className={styles.timer}
                            classTimerValue={styles.timerValue}
                            classTimerText={styles.timerText}
                            time={time}
                        /> */}
                    </div>
                </div>
            )}
            {/* <Link href={linkUrl}>
                <a className={styles.link}>{linkTitle}</a>
            </Link> */}
        </div>
    );
};

export default Details;
