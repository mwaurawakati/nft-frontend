import Link from "next/link";
import cn from "classnames";
import styles from "./TopUsers.module.sass";
import Image from "@/components/Image";

type ItemsType = {
    name: string;
    login: string;
    sale: string;
    avatar: string;
    url: string;
};

type TopUsersProps = {
    className?: string;
    title: string;
    items: ItemsType[];
};

const TopUsers = ({ className, title, items }: TopUsersProps) => (
    <div className={cn(styles.users, className)}>
        <div className={cn("h4", styles.title)}>{title}</div>
        <div className={styles.list}>
            {items.map((item, index) => (
                <Link href={item.url} key={index}>
                    <a className={styles.item}>
                        <div className={styles.avatar}>
                            <Image
                                src={item.avatar}
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.box}>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.login}>
                                    @{item.login}
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.text}>Total sale</div>
                                <div className={styles.sale}>{item.sale}</div>
                            </div>
                        </div>
                    </a>
                </Link>
            ))}
        </div>
    </div>
);

export default TopUsers;
