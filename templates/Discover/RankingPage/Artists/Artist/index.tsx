import Link from "next/link";
import styles from "./Artist.module.sass";
import Image from "@/components/Image";

type ArtistProps = {
    item: any;
    index: number;
};

const Artist = ({ item, index }: ArtistProps) => {
    return (
        <Link href={item.url}>
            <a className={styles.item}>
                <div className={styles.number}>
                    <div className={styles.inner}>{index + 1}</div>
                </div>
                <div className={styles.artist}>
                    <div className={styles.avatar}>
                        <Image
                            src={item.avatar}
                            layout="fill"
                            objectFit="cover"
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.sale}>
                            Total sale <span>{item.sale}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.crypto}>{item.crypto}</div>
                    <div className={styles.price}>{item.price}</div>
                </div>
            </a>
        </Link>
    );
};

export default Artist;
