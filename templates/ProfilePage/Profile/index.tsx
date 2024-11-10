import { useState } from "react";
import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Owners from "@/components/Owners";
import Details from "./Details";
import Collections from "./Collections";
import FollowList from "./FollowList";

import { links, socials } from "@/constants/profile";
import { usersToken } from "@/mocks/users";
import { nfts } from "@/mocks/tokens";
import { profileCollections } from "@/mocks/collections";
import { followers } from "@/mocks/followers";
import { following } from "@/mocks/following";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
    const [sorting, setSorting] = useState<string>("total-sales");
    const [sortingTokens, setSortingTokens] = useState<string>("created");
    const [sortingFollowers, setSortingFollowers] =
        useState<string>("followers");
    const [theme, setTheme] = useState<boolean>(false);

    const actions = [
        {
            title: "Total sales",
            value: "total-sales",
            counter: "96 ETH",
        },
        {
            title: "Following",
            value: "following",
            counter: "1,920",
            onClick: () => setSortingFollowers("following"),
        },
        {
            title: "Followers",
            value: "followers",
            counter: "2,880",
            onClick: () => setSortingFollowers("followers"),
        },
    ];

    const tabsTokens = [
        {
            title: "Created",
            value: "created",
            counter: "256",
        },
        {
            title: "Collections",
            value: "collections",
            counter: "4",
        },
        {
            title: "Owners",
            value: "owners",
            counter: "16",
            onClick: () => setTheme(false),
        },
    ];

    const tabsFollow = [
        {
            title: "Followers",
            value: "followers",
            counter: "2,880",
            onClick: () => setSorting("followers"),
        },
        {
            title: "Following",
            value: "following",
            counter: "1,920",
            onClick: () => setSorting("following"),
        },
    ];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.avatar}>
                    <Image
                        src="/images/avatar-1.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <Details
                    actions={actions}
                    sorting={sorting}
                    setSorting={setSorting}
                    links={links}
                    socials={socials}
                />
            </div>
            <div className={styles.col}>
                {sorting === "total-sales" ? (
                    <List
                        tabs={tabsTokens}
                        tabsValue={sortingTokens}
                        setTabsValue={setSortingTokens}
                        light={theme}
                    >
                        {sortingTokens === "created" && (
                            <Tokens
                                titleUsers="Collected by"
                                items={nfts}
                                users={usersToken}
                                theme={theme}
                                setTheme={setTheme}
                            />
                        )}
                        {sortingTokens === "collections" && (
                            <Collections
                                items={profileCollections}
                                users={usersToken}
                                theme={theme}
                                setTheme={setTheme}
                            />
                        )}
                        {sortingTokens === "owners" && (
                            <Owners items={followers} />
                        )}
                    </List>
                ) : (
                    <List
                        tabs={tabsFollow}
                        tabsValue={sortingFollowers}
                        setTabsValue={setSortingFollowers}
                    >
                        {sorting === "followers" &&
                            sortingFollowers === "followers" && (
                                <FollowList
                                    title="Followers"
                                    counter="2,880"
                                    items={followers}
                                />
                            )}
                        {sorting === "following" &&
                            sortingFollowers === "following" && (
                                <FollowList
                                    title="Following"
                                    counter="1,435"
                                    items={following}
                                />
                            )}
                    </List>
                )}
            </div>
        </div>
    );
};

export default Profile;
