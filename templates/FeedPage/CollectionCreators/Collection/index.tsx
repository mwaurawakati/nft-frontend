import Link from "next/link";
import cn from "classnames";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";

type CollectionProps = {
    className?: string;
    item: any;
};

const Collection = ({ className, item }: CollectionProps) => (
    <Link href={item.url}>
        <a className={cn(styles.collection, className)}>
            <div className={styles.photo}>
                <Image
                    className={styles.picture}
                    src={item.photo}
                    layout="fill"
                    objectFit="cover"
                    alt="Collection"
                />
            </div>
            <div className={styles.line}>
                <div className={styles.image}>
                    <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                        alt="Collection"
                    />
                </div>
                <div className={cn("h3", styles.title)}>{item.title}</div>
                <div className={styles.author}>
                    <div className={styles.avatar}>
                        <Image
                            src={item.avatar}
                            layout="fill"
                            objectFit="cover"
                            alt="Collection"
                        />
                    </div>
                    @{item.login}
                </div>
            </div>
        </a>
    </Link>
);

export default Collection;
