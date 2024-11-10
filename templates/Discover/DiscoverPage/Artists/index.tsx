import Link from "next/link";
import cn from "classnames";
import styles from "./Artists.module.sass";
import Icon from "@/components/Icon";
import Artist from "./Artist";

import { artists } from "@/mocks/artists";

type ArtistsProps = {
    scrollToRef: any;
};

const Artists = ({ scrollToRef }: ArtistsProps) => (
    <div className={styles.row} ref={scrollToRef}>
        <div className={styles.col}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <div className={cn("h1", styles.title)}>
                    Popular Sellers
                    </div>
                    <Link href="/discover/ranking">
                        <a className={styles.link}>
                            <Icon name="arrow-right" />
                        </a>
                    </Link>
                </div>
                <div className={styles.content}>
                Premier Coreum NFT Marketplace
                </div>
            </div>
        </div>
        <div className={styles.col}>
            <div className={styles.artists}>
                {artists.map((artist, index) => (
                    <Artist item={artist} key={index} />
                ))}
            </div>
            <button className={cn("button-wide", styles.button)}>
                LOAD MORE
            </button>
        </div>
    </div>
);

export default Artists;
