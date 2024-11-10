import styles from "./Activity.module.sass";
import Image from "@/components/Image";

type ItemsType = {
    nft: string;
    fromAvatar: string;
    fromLogin: string;
    toAvatar: string;
    toLogin: string;
    price: string;
};

type ActivityProps = {
    items: ItemsType[];
};

const Activity = ({ items }: ActivityProps) => (
    <div className={styles.table}>
        <div className={styles.row}>
            <div className={styles.col}>NFT</div>
            <div className={styles.col}>From</div>
            <div className={styles.col}>To</div>
            <div className={styles.col}>Price</div>
        </div>
        {items.map((item, index) => (
            <div className={styles.row} key={index}>
                <div className={styles.col}>
                    <div className={styles.preview}>
                        <Image
                            src={item.nft}
                            layout="fill"
                            objectFit="cover"
                            alt="NFT"
                        />
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src={item.fromAvatar}
                                layout="fill"
                                objectFit="cover"
                                alt="NFT"
                            />
                        </div>
                        <div className={styles.login}>@{item.fromLogin}</div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src={item.toAvatar}
                                layout="fill"
                                objectFit="cover"
                                alt="NFT"
                            />
                        </div>
                        <div className={styles.login}>@{item.toLogin}</div>
                    </div>
                </div>
                <div className={styles.col}>{item.price}</div>
            </div>
        ))}
    </div>
);

export default Activity;
