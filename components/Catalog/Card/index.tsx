import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";

type CardProps = {
    className?: string;
    item: any;
    dark?: any;
};

const Card = ({ className, item, dark }: CardProps) => (
    <Link href={item.url}>
        <a className={cn(styles.card, { [styles.dark]: dark }, className)}>
            <div className={styles.preview}>
                <Image
                    className={styles.photo}
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Card"
                />
                <div className={styles.category}>
                    <div className={styles.image}>
                        <Image
                            src={item.imageCategory}
                            layout="fill"
                            objectFit="cover"
                            alt="Photo category"
                        />
                    </div>
                    {item.category}
                </div>
                <div className={styles.title}>{item.title}</div>
            </div>
            <div className={styles.user}>
                <div className={styles.login}>{item.login}</div>
                <div className={styles.avatar}>
                    <Image
                        src={item.avatar}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                {item.verified && (
                    <div className={styles.verified}>
                        <Image
                            src="/images/verified.png"
                            width={100}
                            height={100}
                            alt="Verified"
                        />
                    </div>
                )}
            </div>
            <div className={styles.foot}>
                {/* <div className={styles.box}>
                    <div className={styles.text}>Current bid</div>
                    <div className={styles.price}>{item.bid}</div>
                </div> */}
                <div className={styles.box}>
                    <div className={styles.text}>Buy now</div>
                    <div className={styles.price}>{item.price}</div>
                </div>
            </div>
        </a>
    </Link>
);

export default Card;
