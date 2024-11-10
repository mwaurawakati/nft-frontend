"use client"
import Link from "next/link";
import styles from "./Item.module.sass";
import Image from "@/components/Image";
import { config } from "@/utils/api/config";
// import Image from "next/image";

// data
import { PopularNFTHolder } from "@/mocks/Popular_Sellers";

type ItemProps = {
    item: any;
    number: number;
};

const Item = ({ item, number }: ItemProps) => {
    return (
        <Link href={`/collection/${item?._id}`}>
            <a className={styles.item}>
                <div className={styles.number}>
                    <div className={styles.inner}>{number + 1}</div>
                </div>
                <div className={styles.avatar}>
                    {/* <Image
                        src={"https://rize2day.b-cdn.net/uploads/"+item.collection_info.bannerURL}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                        priority
                    /> */}
                    <img
                    src={config.UPLOAD_URL+"/uploads/"+item.creator_info.avatar}
                    alt="Avatar"
                    />
                </div>
                <div className={styles.login}>@{item.collection_info.name}</div>
                <div className={styles.total}>
                    {/* Total sale <span>{item.total}</span> */}
                </div>
            </a>
        </Link>
    )
};

export default Item;
