import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "@/components/Icon";

type ItemProps = {
    item: any;
};

const Item = ({ item }: ItemProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className={cn(styles.item, { [styles.active]: visible })}>
            <div
                className={cn("h4", styles.head)}
                onClick={() => setVisible(!visible)}
            >
                {item.title}
                <div className={styles.plus}></div>
            </div>
            <div className={styles.body}>
                {item.links.map((link: any, index: number) => (
                    <Link href={link.url} key={index}>
                        <a className={styles.link}>
                            <Icon name="arrow-right" />
                            <div className={styles.circle}></div>
                            {link.title}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Item;
