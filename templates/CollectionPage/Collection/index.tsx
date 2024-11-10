"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Collection.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import DetailsCollection from "@/components/DetailsCollection";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Owners from "@/components/Owners";
import Activity from "../Activity";

import { nfts } from "@/mocks/tokens";
import { followers } from "@/mocks/followers";
import { activity } from "@/mocks/activity";
import { config } from "@/utils/api/config";
import { getOwnersApi } from "@/utils/api/api/collections";
import { getTradingVolumnApi } from "@/utils/api/api/sales";
import { toast } from "react-toastify";
import { useAppSelector } from "@/utils/api/hooks";
import { selectDetailedCollection } from "@/utils/api/reducers/collection.reducers";

const detailsList = [
  {
    label: "NFTs",
    value: "6",
  },
  {
    label: "Owners",
    value: "4",
  },
  {
    label: "Floor price",
    value: "0 CORE",
  },
  {
    label: "Trading volume",
    value: "538",
  },
  {
    label: "Download History CSV",
    value: "↓",
  },
  {
    label: "Download History WORD",
    value: "↓",
  },
];

type ProfileProps = {
  collection?: any;
  collectionMinPrice?: any;
  itemsLength?: any;
  collectionId?: any;
  unitPrice?: any;
  launchpadState?: any;
  items?: any;
  showBulkFeatures?: any;
};

let Profile = ({
  collection,
  collectionMinPrice,
  itemsLength,
  collectionId,
  unitPrice,
  launchpadState,
  items,
  showBulkFeatures,
}: ProfileProps) => {
  const [sorting, setSorting] = useState<string>("nfts");
  const [theme, setTheme] = useState<boolean>(false);

  const [tradingVolumn, setTradingVolumn] = useState(0);
  const [ownersCount, setOwnersCount] = useState(0);

  console.log("///////// items", items);

  const calcuateOwnersCount = async () => {
    try {
      const response = await getOwnersApi(collectionId);
      const data = response.list || [];
      let uniqueOwners = new Set(data);
      setOwnersCount(uniqueOwners.size);
      return uniqueOwners.size;
    } catch (error: any) {
      console.log("Failed to get Owners: ", error.message);
      return 0;
    }
  };

  const getCollectionTradingVolumn = async () => {
    try {
      const response = await getTradingVolumnApi(collectionId);
      let volumn = response.data;
      if (launchpadState === 2) {
        volumn += itemsLength * unitPrice;
      }
      setTradingVolumn(volumn);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
      setTradingVolumn(0);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      await getCollectionTradingVolumn();
      await calcuateOwnersCount();
    };
    if (collectionId !== null && collectionId === "") return;
    fetchInfo();
  }, [collectionId]);

  const tabs = [
    {
      title: "NFTs",
      value: "nfts",
      counter: "",
    },
    // {
    //     title: "Activity",
    //     value: "activity",
    //     counter: "5",
    //     onClick: () => setTheme(false),
    // },
    // {
    //     title: "Owners",
    //     value: "owners",
    //     counter: "16",
    //     onClick: () => setTheme(false),
    // },
  ];

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.photo}>
          <Image
            src={`${
              collection.logoURL === "" || collection.logoURL === undefined
                ? "/defaultLogo"
                : `${config.UPLOAD_URL}uploads/${collection.logoURL}`
            }`}
            layout="fill"
            objectFit="cover"
            alt="Avatar"
          />
        </div>
        <DetailsCollection
          details={detailsList}
          collectionMinPrice={collectionMinPrice}
          collection={collection}
          ownersCount={ownersCount}
          tradingVolumn={tradingVolumn}
        />
      </div>
      <div className={styles.col}>
        <List
          tabs={tabs}
          tabsValue={sorting}
          setTabsValue={setSorting}
          light={theme}
        >
          {sorting === "nfts" && (
            <Tokens
              // titleUsers="Owned by"
              titleUsers=""
              // items={nfts}
              items={items}
              users={["/images/artists/artist-1.jpg"]}
              theme={theme}
              setTheme={setTheme}
              showBulkFeatures={showBulkFeatures}
            />
          )}
          {sorting === "activity" && <Activity items={activity} />}
          {sorting === "owners" && <Owners items={followers} />}
          <div className={styles.foot}>
            <Link href="/article">
              <a className={styles.link}>How to mint an NFT?</a>
            </Link>
          </div>
        </List>
      </div>
    </div>
  );
};

export default Profile;
