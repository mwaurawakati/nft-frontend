import { useState } from "react";
import cn from "classnames";
import styles from "./Spotlight.module.sass";
import Tabs from "@/components/Tabs";
import Card from "./Card";

import { tabs, spotlight } from "@/mocks/spotlight";

type SpotlightProps = {};

const Spotlight = ({}: SpotlightProps) => {
    const [sorting, setSorting] = useState<string>("1-days");

    return (
        <div className={styles.spotlight}>
            <div className={styles.head}>
                <div className={styles.details}>
                    <div className={cn("h1", styles.title)}>Spotlight.</div>
                    <div className={styles.info}>Projects you&apos;ll love</div>
                </div>
                <Tabs
                    className={styles.tabs}
                    items={tabs}
                    value={sorting}
                    setValue={setSorting}
                    dark
                />
            </div>
            <div className={styles.list}>
                {spotlight.map((card, index) => (
                    <Card className={styles.card} item={card} key={index} />
                ))}
            </div>
            <div className={styles.btns}>
                <button
                    className={cn("button-white button-counter", styles.button)}
                >
                    explorer more
                    <span>109</span>
                </button>
            </div>
        </div>
    );
};

export default Spotlight;
