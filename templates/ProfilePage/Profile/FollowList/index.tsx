import cn from "classnames";
import styles from "./FollowList.module.sass";
import Follower from "@/components/Follower";

type FollowersType = {
    name: string;
    login: string;
    avatar: string;
    crypto: string;
    follow: boolean;
};

type FollowListProps = {
    title: string;
    counter: string;
    items: FollowersType[];
};

const FollowList = ({ title, counter, items }: FollowListProps) => (
    <div className={styles.followers}>
        <div className={cn("h3", styles.head)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.counter}>{counter}</div>
        </div>
        <div className={styles.list}>
            {items.map((item, index) => (
                <Follower item={item} key={index} />
            ))}
        </div>
    </div>
);

export default FollowList;
