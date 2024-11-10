import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import {
  selectBulkOpsMode,
  selectBulkSelectedArray,
} from "@/utils/api/reducers/collection.reducers";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";
import {
  getLinkPathToJSON,
  getSystemTime,
  isJsonObject,
  isSupportedEVMNetwork,
  isVideo,
} from "@/utils/utils";
import axios from "axios";
import { isEmpty } from "@/utils/api/methods";
import {
  ACTIVE_CHAINS,
  COREUM_PAYMENT_COINS,
  FILE_TYPE,
  PLATFORM_NETWORKS,
  config,
} from "@/utils/api/config";
import AudioForNft from "@/utils/Card/AudioForNft";
import VideoForNft from "@/utils/Card/VideoForNft";
import NcImage from "@/utils/NcComponent/_NcImage";
import VideoForPreview from "@/utils/Card/VideoForPreview";
import ThreeDForNft from "@/utils/Card/ThreeDForNft";

type TokenProps = {
  className?: string;
  item: any;
  large?: boolean;
  dark?: boolean;
  selectable?: any;
  key?: any;
};

const Token = ({
  className,
  item,
  large,
  dark,
  selectable,
  key,
}: TokenProps) => {
  // console.log("(((((((((((( inner items ))))))))))))", item);

  const bulkMode = useAppSelector(selectBulkOpsMode);
  const bulkSelectedArray = useAppSelector(selectBulkSelectedArray);
  const currentUsr = useAppSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState(false);
  const [nftItem, setNftItem] = useState({});
  //   const [hideFav, setHideFav] = useState(props?.hideHeart || false);
  const [timeLeft, setTimeLeft] = useState({});
  const [sysTime, setSysTime] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [nftName, setNftName] = useState("No Name");
  const [imageUrl, setImageUrl] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const curTime = useRef(0);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [blurContent, setBlurContent] = useState(false);
  const [DEMO_NFT_ID] = React.useState(nanoid());

  const fetchJson = useCallback(async () => {
    if (
      (nftItem as any)?.metadataURI === undefined ||
      (nftItem as any)?.metadataURI === "" ||
      (nftItem as any)?.name !== ""
    ) {
      setNftName((nftItem as any)?.name);
      setImageUrl((nftItem as any)?.logoURL);
      setThumbnailURL((nftItem as any)?.thumbnailURL);
      return;
    }
    try {
      const response = await axios.get(
        getLinkPathToJSON((nftItem as any)?.metadataURI, (nftItem as any)?.name)
      );

      // console.log("(&^^(::::::;;tresponse",response.data)

      if (response.data) {
        if (isJsonObject(response.data)) {
          setNftName(JSON.parse(response.data).name);
          setImageUrl(JSON.parse(response.data).image.replace("ipfs://", ""));
        } else {
          setNftName(response.data.name);
          setImageUrl(response.data.image.replace("ipfs://", ""));
        }
      }
    } catch (error) {
      console.log(":::error:::", error);
    }
  }, [nftItem]);

  useEffect(() => {
    let need2blur = false;
    if ((nftItem as any)?.blur) need2blur = true;
    if ((nftItem as any)?.explicit?.includes(currentUsr?._id) === true)
      need2blur = true;
    setBlurContent(need2blur);
    fetchJson();
  }, [nftItem, currentUsr, fetchJson]);

  useEffect(() => {
    if (item) {
      setNftItem(item);
      var isIn = item?.likes?.includes(currentUsr?._id) || false;
      setIsLiked(isIn);
    }

    if (item?.isSale === 2 /*&& !props.isHome**/) {
      (async () => {
        const res = await getSystemTime();
        setSysTime(res);
      })();
    }
  }, []);

  const setFavItem = (target_id: string, user_id: string) => {
    if (isEmpty(target_id) || isEmpty(user_id)) return;
    axios
      .post(
        `${config.API_URL}api/users/set_fav_item`,
        { target_id: target_id, user_id: user_id },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((result) => {
        axios
          .post(
            `${config.API_URL}api/item/get_detail`,
            { id: (nftItem as any)?._id || "" },
            {
              headers: {
                "x-access-token": localStorage.getItem("jwtToken"),
              },
            }
          )
          .then((result) => {
            setNftItem(result.data.data);
            checkIsLiked(result.data.data);
          })
          .catch((err) => console.log(":::: error :::", err));
      });
  };

  // const toggleFav = () => {
  //   if (currentUsr === undefined || Object.keys(currentUsr).length === 0) {
  //     toast.error("Please connect your wallet first");
  //     return;
  //   }
  //   setFavItem((nftItem as any)._id, currentUsr?._id || "");
  // };

  const checkIsLiked = (item: any) => {
    if (item && currentUsr) {
      if (!(item as any).likes) {
        setIsLiked(false);
        return;
      }
      let isLiked = item.likes.includes(currentUsr?._id);
      setIsLiked(isLiked);
    }
  };

  // const handleMessage = (msg: any) => {
  //   if (currentUsr === undefined || Object.keys(currentUsr).length === 0) {
  //     toast.error("Please connect your wallet first");
  //     return;
  //   }
  //   let id = msg?._id ? msg._id : msg;
  //   if (currentUsr && currentUsr._id && currentUsr?._id !== id) {
  //     //   navigate("/message/" + id);
  //     router.push("/message/" + id);
  //   } else {
  //     toast.warn("A NFT you select is yours");
  //   }
  // };

  const calculateTimeLeft = (created: number, period: number) => {
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
    setRefresh(!refresh);
    return difference;
  };

  useEffect(() => {
    // let intVal: string | number | NodeJS.Timeout;
    let intVal: any = 0;
    if (sysTime > 0) {
      curTime.current = sysTime;
      calculateTimeLeft(
        (nftItem as any)?.auctionStarted,
        (nftItem as any)?.auctionPeriod
      );
      intVal = setInterval(() => {
        const time_left = calculateTimeLeft(
          (nftItem as any)?.auctionStarted,
          (nftItem as any)?.auctionPeriod
        );
        if (time_left <= 0) {
          curTime.current = 0;
          setAuctionEnded(true);
          clearInterval(intVal);
        }
      }, 1000);
    }

    return () => clearInterval(intVal);
  }, [sysTime, calculateTimeLeft, nftItem]);

  const updateViews = () => {
    if ((nftItem as any)?._id?.toString()?.length === 24) {
      axios
        .post(`${config.API_URL}api/item/updateViews`, {
          itemId: (nftItem as any)?._id,
        })
        .then((response) => {})
        .catch((error) => console.log("::: error :::", error));
    }
  };

  return (
    <Link href={`/nft/${item._id}`}>
      <a
        className={cn(
          styles.token,
          { [styles.large]: large, [styles.dark]: dark },
          className
        )}
      >
        {/* <div className={styles.preview}> */}
        <div
          className={
            isVideo((nftItem as any)?.logoURL) === false
              ? styles.preview
              : styles.Spreview
          }
        >
          {/* {(nftItem as any)?.fileType === FILE_TYPE.THREED ? (
            <ThreeDForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          ) : (nftItem as any)?.fileType === FILE_TYPE.AUDIO ? (
            <AudioForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          ) : (
            <VideoForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          )} */}

          {isVideo((nftItem as any)?.logoURL) === false ? (
            <Image
              src={`${config.ipfsGateway}${(nftItem as any)?.logoURL}`}
              layout="fill"
              objectFit="cover"
              alt="Token"
            />
          ) : (
            <VideoForPreview
              src={`${(nftItem as any)?.logoURL || ""}?stream=true`}
              isLocal={false}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
              className="object-cover cursor-pointer w-full h-[250px] rounded-3xl overflow-hidden z-0 "
            />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.title}>{(nftItem as any)?.name}</div>
          <div className={styles.category}>
            {(nftItem as any)?.isSale === 2
              ? (nftItem as any)?.bids && (nftItem as any).bids.length > 0
                ? "Current Bid"
                : "Start price"
              : (nftItem as any)?.isSale === 1
              ? "Sale Price"
              : "Price"}
          </div>
          <div className={styles.line}>
            <div className={styles.price}>
              {item?.isSale === 2 ? (
                <div>
                  <span className="font-[MyCutomFont]">
                    {item.bids && item.bids.length > 0
                      ? item.bids[item.bids.length - 1].price
                        ? item.bids[item.bids.length - 1].price
                        : 0
                      : item?.price}
                  </span>
                  {item.networkSymbol === PLATFORM_NETWORKS.COREUM
                    ? item.coreumPaymentUnit === COREUM_PAYMENT_COINS.RIZE
                      ? " RIZE"
                      : " CORE"
                    : ""}
                  {isSupportedEVMNetwork(item.networkSymbol) === true
                    ? ACTIVE_CHAINS[item.networkSymbol]?.currency || " ETH"
                    : ""}
                  {item.networkSymbol === PLATFORM_NETWORKS.XRPL ? " XRP" : ""}
                </div>
              ) : item?.isSale === 1 ? (
                <div>
                  <span className="font-[MyCutomFont] text-[1.1rem]">
                    {item?.price || "0 "}
                  </span>
                  {item.networkSymbol === PLATFORM_NETWORKS.COREUM
                    ? item.coreumPaymentUnit === COREUM_PAYMENT_COINS.RIZE
                      ? " RIZE"
                      : " CORE"
                    : ""}
                  {isSupportedEVMNetwork(item.networkSymbol) === true
                    ? ACTIVE_CHAINS[item.networkSymbol]?.currency || " ETH"
                    : ""}
                  {item.networkSymbol === PLATFORM_NETWORKS.XRPL ? " XRP" : ""}
                </div>
              ) : (
                "Not listed"
              )}
            </div>
            <Users items={item.users} />
          </div>
        </div>
      </a>

      {/* {(nftItem as any)?.fileType > FILE_TYPE.IMAGE ? (
        <>
          {(nftItem as any)?.fileType === FILE_TYPE.THREED ? (
            <ThreeDForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          ) : (nftItem as any)?.fileType === FILE_TYPE.AUDIO ? (
            <AudioForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          ) : (
            <VideoForNft
              src={`${config.ipfsGateway}${(nftItem as any)?.musicURL}`}
              nftId={(nftItem as any)?._id || DEMO_NFT_ID}
            />
          )}
          <div
            className=""
            onClick={() => {
              updateViews();
              !selectable &&
                ((nftItem as any)?._id
                  ? router.push(`/nft-detail/${(nftItem as any)?._id}`)
                  : router.push("/nft-detail"));
            }}
          >
            {isVideo((nftItem as any)?.logoURL) === false ? (
              <NcImage
                containerClassName="block aspect-w-12 aspect-h-10 w-full h-[250px] rounded-3xl overflow-hidden z-0"
                src={(nftItem as any)?.logoURL}
                className={`object-cover w-full h-[250px] rounded-3xl overflow-hidden  group-hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer will-change-transform ${
                  blurContent === true ? "blur-2xl" : ""
                }`}
              />
            ) : (
              <VideoForPreview
                src={`${(nftItem as any)?.logoURL || ""}?stream=true`}
                isLocal={false}
                nftId={(nftItem as any)?._id || DEMO_NFT_ID}
                className="object-cover cursor-pointer w-full h-[250px] rounded-3xl overflow-hidden z-0 "
              />
            )}
          </div>
        </>
      ) : (
        <div>
          <NcImage
            containerClassName="flex aspect-w-12 aspect-h-10 w-full h-[250px] rounded-3xl overflow-hidden z-0"
            src={imageUrl}
            thumbnail={thumbnailURL}
            loading="lazy"
            onClick={() => {
              updateViews();
              !selectable &&
                ((nftItem as any)?._id
                  ? router.push(`/nft-detail/${(nftItem as any)?._id}`)
                  : router.push("/nft-detail"));
            }}
            className={`object-cover cursor-pointer w-full h-[250px] rounded-3xl overflow-hidden  group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform ${
              blurContent === true ? "blur-2xl" : ""
            } `}
          />
        </div>
      )} */}
    </Link>
  );
};

export default Token;
