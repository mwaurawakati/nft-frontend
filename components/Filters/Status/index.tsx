import { useState } from "react";
import cn from "classnames";
import styles from "./Status.module.sass";
import Icon from "@/components/Icon";

type StatusProps = {
    className?: string;
    item: any;
    dark?: boolean;
};

const Status = ({ className, item, dark }: StatusProps) => {
    const [active, setActive] = useState<boolean>(item.status);
    return (
        <button
            className={cn(
                styles.status,
                { [styles.active]: active, [styles.dark]: dark },
                className
            )}
            onClick={() => setActive(!active)}
        >
            <span className={styles.check}>
                <Icon name="check-fat" />
            </span>
            {item.title}
        </button>
    );
};

export default Status;
