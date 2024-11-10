import Link from "next/link";
import styles from "./Owners.module.sass";
import Follower from "@/components/Follower";

type FollowersType = {
    name: string;
    login: string;
    avatar: string;
    crypto: string;
    follow: boolean;
};

type OwnersProps = {
    items: FollowersType[];
};

const Owners = ({ items }: OwnersProps) => (
    <div className={styles.owned}>
        <div className={styles.list}>
            {items.slice(0, 5).map((follower, index) => (
                <Follower item={follower} key={index} />
            ))}
        </div>
    </div>
);

export default Owners;
