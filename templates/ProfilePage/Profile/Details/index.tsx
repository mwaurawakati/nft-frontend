import { useState } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "@/components/Icon";
import Follow from "@/components/Follow";
import Contacts from "../Contacts";

type ActionsType = {
    title: string;
    value: string;
    counter: string;
    onClick?: () => void;
};

type DetailsProps = {
    actions: ActionsType[];
    sorting: any;
    setSorting: any;
    links: any;
    socials: any;
};

const Details = ({
    actions,
    sorting,
    setSorting,
    links,
    socials,
}: DetailsProps) => {
    const handleClick = (value: string, onClick: any) => {
        setSorting(value);
        onClick && onClick();
    };

    return (
        <div className={styles.details}>
            <div className={styles.head}>
                <div className={styles.flex}>
                    <div className={styles.box}>
                        <div className={cn("h2", styles.user)}>Kohaku</div>
                        <div className={styles.line}>
                            <div className={styles.login}>@kohaku</div>
                            <div className={styles.code}>
                                0x1e86…533B
                                <button className={styles.copy}>
                                    <Icon name="copy" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Follow className={styles.follow} value={false} dark />
                </div>
                <div className={styles.actions}>
                    {actions.map((action, index) => (
                        <div
                            className={cn(styles.action, {
                                [styles.active]: sorting === action.value,
                            })}
                            key={index}
                            onClick={() =>
                                handleClick(action.value, action.onClick)
                            }
                        >
                            <div className={cn("h4", styles.counter)}>
                                {action.counter}
                            </div>
                            <div className={styles.subtitle}>
                                <Icon name="profile-fat" /> {action.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Contacts links={links} socials={socials} />
        </div>
    );
};

export default Details;
