import { useState } from "react";
import cn from "classnames";
import styles from "./Artist.module.sass";
import Image from "@/components/Image";

type ArtistProps = {
    item: any;
};

const Artist = ({ item }: ArtistProps) => {
    const [follow, setFollow] = useState<boolean>(false);

    return (
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
                <div className={styles.login}>@{item.login}</div>
                <div className={styles.price}>
                    Total sale <span>{item.price}</span>
                </div>
            </div>
            <button
                className={cn("button-stroke button-medium", styles.button, {
                    [styles.active]: follow,
                })}
                onClick={() => setFollow(!follow)}
            >
                Follow<span>ing</span>
            </button>
        </div>
    );
};

export default Artist;
