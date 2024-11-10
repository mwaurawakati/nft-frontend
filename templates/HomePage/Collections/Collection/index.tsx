import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { config } from "@/utils/api/config";

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => {
    console.log(item)
    return (
        <Link href={`/collection/${item?._id}`}>
            <a className={styles.collection}>
                <div className={styles.images}>
                            <div className={styles.image} >
                                <Image
                                   src={`${config.UPLOAD_URL}uploads/${item.collection_info.bannerURL}`}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Collection item"
                                />
                            </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.box}>
                        {/* <div className={styles.subtitle}>{item.title}</div> */}
                        <div className={styles.author}>
                            <div className={styles.avatar}>
                                <Image
                                    src={`${config.UPLOAD_URL}uploads/${item.collection_info.bannerURL}`}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Avatar"
                                />
                            </div>
                            @{item.creator_info.username}
                        </div>
                    </div>
                    {/* <div className={styles.box}>
                        <div className={styles.text}>Floor price</div>
                        <div className={styles.price}>{item.price}</div>
                    </div> */}
                </div>
            </a>
        </Link>
    )
}

export default Collection;
