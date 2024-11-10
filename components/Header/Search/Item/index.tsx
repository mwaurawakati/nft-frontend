import cn from "classnames";
import Link from "next/link";
import styles from "./Item.module.sass";
import Image from "@/components/Image";

type ItemProps = {
    item: any;
};

const Item = ({ item }: ItemProps) => {
    return (
        <Link href={item.url}>
            <a className={styles.item}>
                <div className={styles.preview}>
                    {item.image && (
                        <Image
                            src={item.image}
                            layout="fill"
                            objectFit="cover"
                            alt="Result"
                        />
                    )}
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>{item.title}</div>
                    {item.buy && (
                        <div className={styles.content}>
                            <span>Buy now</span> {item.buy}
                        </div>
                    )}
                    {item.reserve && (
                        <div className={styles.content}>
                            <span>Buy now</span> {item.reserve}
                        </div>
                    )}
                    {item.login && (
                        <div className={styles.content}>
                            <span>@</span> {item.login}
                        </div>
                    )}
                </div>
            </a>
        </Link>
    );
};

export default Item;
