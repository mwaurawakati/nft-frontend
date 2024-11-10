import { useState } from "react";
import cn from "classnames";
import styles from "./Artists.module.sass";
import Tabs from "@/components/Tabs";
import Form from "@/components/Form";
import Artist from "./Artist";

import { artistsWeek } from "@/mocks/artists";

type ArtistsProps = {};

const Artists = ({}: ArtistsProps) => {
    const [email, setEmail] = useState<string>("");
    const [type, setType] = useState<string>("artist");
    const [time, setTime] = useState<string>("1-days");

    const typeArtists = [
        {
            title: "Artist",
            value: "artist",
        },
        {
            title: "Collector",
            value: "collector",
        },
    ];

    const timeSorting = [
        {
            title: "1 days",
            value: "1-days",
        },
        {
            title: "7 days",
            value: "7-days",
        },
        {
            title: "30 days",
            value: "30-days",
        },
    ];
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.wrap}>
                    <div className={cn("hero", styles.title)}>
                        <span>Artist</span> <br></br>of the <span>week</span>
                    </div>
                    <Form
                        className={styles.form}
                        placeholder="Search"
                        value={email}
                        setValue={setEmail}
                        onSubmit={() => console.log("Submit")}
                        buttonRight
                    />
                </div>
            </div>
            <div className={styles.col}>
                <div className={styles.sorting}>
                    <Tabs
                        className={cn(styles.tabs, styles.tabsArtists)}
                        items={typeArtists}
                        value={type}
                        setValue={setType}
                    />
                    <Tabs
                        className={cn(styles.tabs, styles.tabsSorting)}
                        items={timeSorting}
                        value={time}
                        setValue={setTime}
                    />
                </div>
                <div className={styles.head}>
                    <div className={styles.caption}>#</div>
                    <div className={styles.caption}>Artist</div>
                    <div className={styles.caption}>Volume</div>
                </div>
                <div className={styles.artists}>
                    {artistsWeek.map((artist, index) => (
                        <Artist item={artist} key={index} index={index} />
                    ))}
                </div>
                <svg width="0" height="0" style={{ display: "block" }}>
                    <clipPath
                        id="polygonNumber"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M.396.076C.46.041.54.041.604.076l.242.129A.19.19 0 0 1 .95.371v.258a.19.19 0 0 1-.104.166L.604.924C.54.959.46.959.396.924L.154.795A.19.19 0 0 1 .05.629V.371A.19.19 0 0 1 .154.205L.396.076z" />
                    </clipPath>
                </svg>
            </div>
        </div>
    );
};

export default Artists;
