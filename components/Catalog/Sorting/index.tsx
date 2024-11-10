import { useState } from "react";
import cn from "classnames";
import styles from "./Sorting.module.sass";
import Icon from "@/components/Icon";

type TabsType = {
    title: string;
    value: string;
    counter?: string;
    anchor?: any;
};

type SortingProps = {
    tabs: TabsType[];
    sorting: any;
    setSorting: any;
    theme: any;
    setTheme: any;
    dark?: boolean;
};

const Sorting = ({
    tabs,
    sorting,
    setSorting,
    theme,
    setTheme,
    dark,
}: SortingProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleClick = (value: any, anchor: any) => {
        setSorting(value);
        setVisible(false);
        anchor.current.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <div className={cn(styles.sorting, { [styles.dark]: dark })}>
            <div className={cn(styles.select, { [styles.visible]: visible })}>
                <button
                    className={styles.top}
                    onClick={() => setVisible(!visible)}
                >
                    {tabs
                        .filter((x: any) => x.value === sorting)
                        .map((tab, index) => (
                            <span key={index}>
                                <span className={styles.subtitle}>
                                    {tab.title}
                                </span>
                                {tab.counter && (
                                    <span className={styles.counter}>
                                        {tab.counter}
                                    </span>
                                )}
                                <Icon name="arrow-down" />
                            </span>
                        ))}
                </button>
                <div className={styles.tabs}>
                    {tabs.map((tab, index) => (
                        <button
                            className={cn(styles.button, {
                                [styles.active]: tab.value === sorting,
                            })}
                            key={index}
                            onClick={() => handleClick(tab.value, tab.anchor)}
                        >
                            <span className={styles.subtitle}>{tab.title}</span>
                            {tab.counter && (
                                <span className={styles.counter}>
                                    {tab.counter}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <button
                className={cn(styles.theme, { [styles.active]: theme })}
                onClick={() => setTheme(!theme)}
            >
                <Icon className={styles.sun} name="sun" />
                <Icon className={styles.moon} name="moon" />
            </button>
        </div>
    );
};

export default Sorting;
