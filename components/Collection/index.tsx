import Link from "next/link";
import cn from "classnames";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";
import Balance from "@/components/Balance";

type CollectionProps = {
    className?: string;
    item: any;
    dark?: boolean;
};

const Collection = ({ className, item, dark }: CollectionProps) => (
    <Link href={item.url}>
        <a
            className={cn(
                styles.collection,
                { [styles.dark]: dark },
                className
            )}
        >
            <div className={styles.preview}>
                <Image
                    className={styles.picture}
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Collection"
                />
                <div className={styles.category}>
                    <div className={styles.image}>
                        <Image
                            src={item.categoryImage}
                            layout="fill"
                            objectFit="cover"
                            alt="Collection"
                        />
                    </div>
                    {item.category}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{item.title}</div>
                <Balance
                    className={styles.balance}
                    value={item.balance}
                    dark={dark}
                />
                <div className={styles.floor}>
                    Floor: <span>{item.floor}</span>
                </div>
                <Users className={styles.users} items={item.users} />
            </div>
        </a>
    </Link>
);

export default Collection;
