import Link from "next/link";
import cn from "classnames";
import styles from "./Sponsored.module.sass";
import Image from "@/components/Image";
import TimeCounter from "@/components/TimeCounter";

import { HOMIS_COLLECTION_ID, config } from "@/utils/api/config";
import { FC, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { sleep } from "@/utils/utils";
import { useItemsApiServices } from "@/utils/api/api/useItemsApiServices";
import SponsorDetail from "./SponsorDetail";
import { Backdrop, CircularProgress } from "@mui/material";

type ItemsType = {
  login: string;
  crypto: string;
  price: string;
  image: string;
  avatar: string;
  timeHours: number;
  url: string;
};

type AuctionsProps = {
  color?: string;
  items: ItemsType[];
};

const Auctions = ({ color /*items*/ }: AuctionsProps) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const { fetchPriceForNetworkSymbol } = useItemsApiServices();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    getSponsoredItems();
  }, []);

  const getSponsoredItems = async () => {
    axios
      .post(`${config.API_URL}api/item/getSponsoredItems`, {
        limit: 5,
        collId: HOMIS_COLLECTION_ID,
      })
      .then(async (response) => {
        const item_data = response.data.data || [];
        const uniqueNetworkSymbols = Array.from(
          new Set(item_data.map((item: any) => item.networkSymbol))
        );

        try {
          const pricePromises = uniqueNetworkSymbols.map((networkSymbol) =>
            fetchPriceForNetworkSymbol(networkSymbol)
          );

          const prices = await Promise.all(pricePromises);
          const pricesObject = prices.reduce((obj: any, item: any) => {
            obj[item.networkSymbol] = item.priceOnUsd;
            return obj;
          }, {});
          setItems(
            item_data.map((item: any) => ({
              ...item,
              priceUsd: pricesObject[item.networkSymbol],
            }))
          );
          setProcessing(false)
        } catch (error) {
          console.error("Error fetching all prices:", error);
          return [];
        }
      })
      .catch((error) => {
        console.log("getSponsoredItems() error ===> ", error);
      });
  };

  return (
    <>
      {processing ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className={styles.row}>
          <div className={styles.col} style={{ backgroundColor: color }}>
            <div className={styles.wrap}>
              <div className={cn("h1", styles.title)}>Sponsored Drops</div>
              {/* <Link href="/discover">
                    <a
                        className={cn(
                            "button-white button-counter",
                            styles.button
                        )}
                    >
                        explorer more
                    </a>
                </Link> */}
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.list}>
              {items.map((item: any, index) => {
                return (
                  <SponsorDetail
                    key={item._id}
                    item={item}
                    index={index}
                    price={item.priceUsd}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auctions;
