import Link from "next/link";
import cn from "classnames";
import styles from "./Auctions.module.sass";
import Image from "@/components/Image";
import TimeCounter from "@/components/TimeCounter";

type ItemsType = {
    login: string;
    crypto: string;
    price: string;
    image: string;
    avatar: string;
    timeHours: number;
    url: string;
};

type AuctionsProps = {
    color?: string;
    items: ItemsType[];
};

const Auctions = ({ color, items }: AuctionsProps) => (
    <div className={styles.row}>
        <div className={styles.col} style={{ backgroundColor: color }}>
            <div className={styles.wrap}>
                <div className={cn("h1", styles.title)}>
                    Auctions ending soon
                </div>
                <Link href="/discover">
                    <a
                        className={cn(
                            "button-white button-counter",
                            styles.button
                        )}
                    >
                        explorer more
                        <span>109</span>
                    </a>
                </Link>
            </div>
        </div>
        <div className={styles.col}>
            <div className={styles.list}>
                {items.map((item, index) => (
                    <Link href={item.url} key={index}>
                        <a className={styles.item}>
                            <Image
                                className={styles.image}
                                src={item.image}
                                layout="fill"
                                objectFit="cover"
                                alt="Auction"
                            />
                            <div className={styles.details}>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        <Image
                                            src={item.avatar}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="Avatar"
                                        />
                                    </div>
                                    @{item.login}
                                </div>
                                <div className={styles.line}>
                                    <div className={styles.box}>
                                        <div className={styles.category}>
                                            Current bid
                                        </div>
                                        <div
                                            className={cn("h3", styles.crypto)}
                                        >
                                            {item.crypto}
                                        </div>
                                        <div className={styles.price}>
                                            {item.price}
                                        </div>
                                    </div>
                                    <div className={styles.box}>
                                        <div className={styles.category}>
                                            Auction ends in
                                        </div>
                                        <TimeCounter time={item.timeHours} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default Auctions;
