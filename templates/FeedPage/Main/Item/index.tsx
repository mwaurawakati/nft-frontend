import Link from "next/link";
import cn from "classnames";
import styles from "./Item.module.sass";
import Image from "@/components/Image";

type MainProps = {
    item: any;
};

const Main = ({ item }: MainProps) => (
    <Link href={item.url}>
        <a className={styles.item}>
            <div className={styles.preview}>
                <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Main"
                />
            </div>
            <div
                className={styles.wrap}
                style={{ backgroundColor: item.color }}
            >
                <div className={styles.photo}>
                    <Image
                        src={item.photo}
                        layout="fill"
                        objectFit="cover"
                        alt="Main"
                    />
                </div>
                <div className={styles.line}>
                    <div className={cn("h1", styles.title)}>{item.title}</div>
                    <div className={cn("h4", styles.category)}>
                        {item.category}
                    </div>
                </div>
                <div className={styles.author}>
                    <div className={styles.avatar}>
                        <Image
                            src={item.avatar}
                            layout="fill"
                            objectFit="cover"
                            alt="Avatar"
                        />
                    </div>
                    @{item.login}
                </div>
            </div>
        </a>
    </Link>
);

export default Main;
