import Link from "next/link";
import cn from "classnames";
import styles from "./Follower.module.sass";
import Image from "@/components/Image";
import Follow from "@/components/Follow";

type FollowerProps = {
    item: any;
};

const Follower = ({ item }: FollowerProps) => {
    return (
        <div className={styles.follower}>
            <Link href={item.url}>
                <a className={styles.user}>
                    <div
                        className={cn(styles.avatar, {
                            [styles.history]: item.history,
                        })}
                    >
                        <Image
                            src={item.avatar}
                            layout="fill"
                            objectFit="cover"
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.login}>@{item.login}</div>
                    </div>
                </a>
            </Link>
            <div className={styles.created}>
                <div className={styles.text}>Created</div>
                <div className={styles.crypto}>{item.crypto}</div>
            </div>
            <Follow className={styles.follow} value={item.follow} />
        </div>
    );
};

export default Follower;
