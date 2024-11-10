import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";

type CardProps = {
    className?: string;
    item: any;
};

const Card = ({ className, item }: CardProps) => (
    <Link href={item.url}>
        <a className={cn(styles.card, className)}>
            <div className={styles.preview}>
                <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt={item.title}
                />
            </div>
            <div className={styles.line}>
                <div className={styles.details}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.price}>
                        <span>Buy now</span> {item.price}
                    </div>
                </div>
                <Users className={styles.users} items={item.users} />
            </div>
        </a>
    </Link>
);

export default Card;
