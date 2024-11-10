import Link from "next/link";
import cn from "classnames";
import styles from "./Sponsored.module.sass";
import Image from "@/components/Image";
import TimeCounter from "@/components/TimeCounter";

import { HOMIS_COLLECTION_ID, config } from "@/utils/api/config";
import { FC, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { sleep } from "@/utils/utils";
import { useItemsApiServices } from "@/utils/api/api/useItemsApiServices";

import { useRouter } from "next/router";
import { PLATFORM_NETWORKS } from "@/utils/api/config";
import { useAppSelector } from "@/utils/api/hooks";
import { selectCOREPrice } from "@/utils/api/reducers/nft.reducers";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import { getSystemTime, isVideo } from "@/utils/utils";

// import VideoForPreview from "components/Card/VideoForPreview";
// import PricesUnit from "components/StyleComponent/PricesUnit";

import { ACTIVE_CHAINS, COREUM_PAYMENT_COINS } from "@/utils/api/config";
import { isSupportedEVMNetwork } from "@/utils/InteractWithSmartContract/interact";

type ItemsType = {};

type AuctionsProps = {
  item?: any;
  index?: number;
  price?: number;
  key?:any;
};

const SponsorDetail = ({ item, index,key, price }: AuctionsProps) => {
  const curTime = useRef(0);
  const router = useRouter();
  const [consideringItem, setConsideringItem]: any = useState({});
  const currentUsr = useAppSelector(selectCurrentUser);
  const globalCOREPrice = useAppSelector(selectCOREPrice);

  const [timeLeft, setTimeLeft] = useState({});
  const [sysTime, setSysTime] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [blurContent, setBlurContent] = useState(false);

  useEffect(() => {
    let need2blur = false;
    if (item?.explicitContent === true) need2blur = true;
    if (item?.explicit?.includes(currentUsr?._id) === true) need2blur = false;
    setBlurContent(need2blur);
  }, [item, currentUsr]);

  useEffect(() => {
    setConsideringItem(item || {});
    if (item?.isSale === 2) {
      const currentTime = new Date();
      const auctionEndTime = new Date(
        (item?.auctionStarted + item?.auctionPeriod) * 1000
      );
      if (item?.isSale === 2 && currentTime <= auctionEndTime) {
        (async () => {
          const res = await getSystemTime();
          setSysTime(res);
        })();
      } else {
        setAuctionEnded(true);
      }
    }
  }, [item]);

  const calculateTimeLeft = (created: any, period: any) => {
    let difference = created * 1000 + period * 1000 - curTime.current++ * 1000;
    let time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference >= 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(time);
    return difference;
  };
  useEffect(() => {
    let intVal: any = 0;
    if (sysTime > 0) {
      curTime.current = sysTime;
      calculateTimeLeft(
        consideringItem?.auctionStarted,
        consideringItem?.auctionPeriod
      );
      intVal = setInterval(() => {
        const time_left = calculateTimeLeft(
          consideringItem?.auctionStarted,
          consideringItem?.auctionPeriod
        );
        if (time_left <= 0) {
          curTime.current = 0;
          setAuctionEnded(true);
          clearInterval(intVal);
        }
      }, 1000);
    }

    return () => clearInterval(intVal);
  }, [
    sysTime,
    consideringItem?.auctionStarted,
    consideringItem?.auctionPeriod,
  ]);

  return (
    <Link href={`/nft/${consideringItem?._id || ""}`} key={key}>
      <a
        className={styles.item}
        href={`/profile/${consideringItem?.creator?._id || ""}`}
      >
        <Image
          className={styles.image}
          // src={'/item.image'}
          src={`${config.ipfsGateway}${item.logoURL}`}
          layout="fill"
          objectFit="cover"
          alt="Auction"
        />
        <div className={styles.details}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <Image
                // src={item.avatar}
                src={`${config.UPLOAD_URL}uploads/${item.creator.avatar}`}
                layout="fill"
                objectFit="cover"
                alt="Avatar"
              />
            </div>
            @{item.creator.username}
          </div>
          <div className={styles.line}>
            <div className={styles.box}>
              <div className={styles.category}>
                {consideringItem?.isSale === 2
                  ? consideringItem?.bids && consideringItem.bids.length > 0
                    ? "Current Bid"
                    : "Start price"
                  : consideringItem?.isSale === 1
                  ? "Sale Price"
                  : "Price"}
              </div>
              <div className={cn("h3", styles.crypto)}>{item.crypto}</div>
              <div className={styles.price}>
                {/* {item.price} */}
                {item?.isSale === 2
                  ? `${
                      item.bids && item.bids.length > 0
                        ? item.bids[item.bids.length - 1].price
                          ? item.bids[item.bids.length - 1].price
                          : 0
                        : item?.price
                    } 
                            ${
                              item.networkSymbol === PLATFORM_NETWORKS.COREUM
                                ? item.coreumPaymentUnit ===
                                  COREUM_PAYMENT_COINS.RIZE
                                  ? "RIZE"
                                  : "CORE"
                                : ""
                            }
                            ${
                              isSupportedEVMNetwork(item.networkSymbol) === true
                                ? ACTIVE_CHAINS[item.networkSymbol]?.currency ||
                                  "ETH"
                                : ""
                            } 
                            ${
                              item.networkSymbol === PLATFORM_NETWORKS.XRPL
                                ? "XRP"
                                : ""
                            }                 
                                    `
                  : item?.isSale === 1
                  ? `${item?.price || 0}  
                            ${
                              item.networkSymbol === PLATFORM_NETWORKS.COREUM
                                ? item.coreumPaymentUnit ===
                                  COREUM_PAYMENT_COINS.RIZE
                                  ? "RIZE"
                                  : "CORE"
                                : ""
                            }
                            ${
                              isSupportedEVMNetwork(item.networkSymbol) === true
                                ? ACTIVE_CHAINS[item.networkSymbol]?.currency ||
                                  "ETH"
                                : ""
                            }            
                            ${
                              item.networkSymbol === PLATFORM_NETWORKS.XRPL
                                ? "XRP"
                                : ""
                            }                   
                            `
                  : "Not listed"}

                {consideringItem.isSale > 0 && (
                  <span className="text-md lg:text-lg text-neutral-400 sm:ml-5 whitespace-nowrap">
                    {consideringItem?.isSale === 2
                      ? `( ≈ $${
                          consideringItem.bids &&
                          consideringItem.bids.length > 0
                            ? consideringItem.bids[
                                consideringItem.bids.length - 1
                              ].price
                              ? (consideringItem.networkSymbol ===
                                PLATFORM_NETWORKS.COREUM
                                  ? consideringItem.bids[
                                      consideringItem.bids.length - 1
                                    ].price * globalCOREPrice
                                  : consideringItem.bids[
                                      consideringItem.bids.length - 1
                                    ].price * (price || 0)
                                )?.toFixed(2)
                              : 0
                            : (consideringItem?.price * (price || 0))?.toFixed(
                                2
                              ) || 0
                        } )`
                      : `( ≈ $${
                          (consideringItem?.price * (price || 0))?.toFixed(2) ||
                          0
                        })`}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.box}>
              {!auctionEnded && (
                <>
                  <div className={styles.category}>Auction ends in</div>
                  <TimeCounter time={item.timeHours} timeLeft={timeLeft} />
                </>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SponsorDetail;
