import { useState } from "react";
import styles from "./Collection.module.sass";
import Icon from "@/components/Icon";
import DetailsCollection from "@/components/DetailsCollection";
import List from "@/components/List";
import CreateNFT from "../CreateNFT";

const detailsList = [
    {
        label: "NFTs",
        value: "0",
    },
    {
        label: "Owners",
        value: "1",
    },
    {
        label: "Floor price",
        value: "-",
    },
    {
        label: "Total sales",
        value: "-",
    },
];

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
    const [sorting, setSorting] = useState<string>("nfts");

    const tabs = [
        {
            title: "NFTs",
            value: "nfts",
            counter: "0",
        },
        {
            title: "Activity",
            value: "activity",
            counter: "0",
        },
        {
            title: "Owners",
            value: "owners",
            counter: "0",
        },
    ];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.photo}>
                    <Icon name="picture" />
                </div>
                <DetailsCollection details={detailsList} />
            </div>
            <div className={styles.col}>
                <List tabs={tabs} tabsValue={sorting} setTabsValue={setSorting}>
                    <CreateNFT />
                </List>
            </div>
        </div>
    );
};

export default Profile;
