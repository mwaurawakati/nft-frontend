import cn from "classnames";
import styles from "./Users.module.sass";
import Image from "@/components/Image";

type UsersProps = {
    title?: string;
    className?: string;
    classUsersItem?: string;
    classUsersCounter?: string;
    items: Array<string>;
    dark?: boolean;
    border?: boolean;
};

const Users = ({
    className,
    classUsersItem,
    classUsersCounter,
    title,
    items,
    dark,
    border,
}: UsersProps) => (
    <div
        className={cn(
            styles.users,
            { [styles.usersBorder]: border },
            { [styles.usersDark]: dark },
            className
        )}
    >
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.group}>
            {/* {items.slice(0, 5).map((user, index) => (
                <div className={cn(styles.user, classUsersItem)} key={index}>
                    <Image
                        src={user}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
            ))} */}
        </div>
        {items.length > 5 && (
            <div className={cn(styles.counter, classUsersCounter)}>
                {items.length - 5}
            </div>
        )}
    </div>
);

export default Users;
