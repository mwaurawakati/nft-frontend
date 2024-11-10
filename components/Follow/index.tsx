import { useState } from "react";
import cn from "classnames";
import styles from "./Follow.module.sass";
import Icon from "@/components/Icon";

type FollowProps = {
    className?: string;
    dark?: boolean;
    value: boolean;
};

const Follow = ({ className, dark, value }: FollowProps) => {
    const [follow, setFollow] = useState<boolean>(value);

    return (
        <button
            className={cn(
                "button-medium",
                styles.button,
                {
                    [styles.active]: follow,
                    [styles.dark]: dark,
                },
                className
            )}
            onClick={() => setFollow(!follow)}
        >
            <span className={styles.text}>
                follow<span>ing</span>
            </span>
            <Icon className={styles.plus} name="plus" />
            <Icon className={styles.check} name="check" />
        </button>
    );
};

export default Follow;
