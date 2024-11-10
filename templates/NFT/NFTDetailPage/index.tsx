import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "./Details";

// import Avatar from "components/StyleComponent/Avatar";
// import NcImage from "components/NcComponent/NcImage";
import axios from "axios";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { config, PLATFORM_NETWORKS } from "@/utils/api/config";
import {
  changeItemDetail,
  selectDetailOfAnItem,
} from "@/utils/api/reducers/nft.reducers";
// import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { isEmpty } from "@/utils/api/methods";
import {
  selectCurrentNetworkSymbol,
  selectCurrentUser,
} from "@/utils/api/reducers/auth.reducers";
// import Bid from "./Bid";
// import Checkout from "./Checkout";
// import Accept from "./Accept";
// import PutSale from "./PutSale";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
// import AudioForNft from "components/Card/AudioForNft";
// import VideoForNft from "components/Card/VideoForNft";
// import ThreeDForNft from "components/Card/ThreeDForNft";
import { nanoid } from "@reduxjs/toolkit";
// import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer";
import { useSigningClient } from "@/utils/api/cosmwasm";
// import { socket } from "App";
const socket = io(`${config.socketUrl}`);
import {
  getLinkPathToJSON,
  getSystemTime,
  isJsonObject,
  isVideo,
} from "utils/utils";
// import NcModal from "components/NcComponent/NcModal";
import { FILE_TYPE } from "@/utils/api/config";
// import Clock from "./Clock/Clock";
// import PricesUnit from "components/StyleComponent/PricesUnit";
// import VideoForPreview from "components/Card/VideoForPreview";
// import PaymentPayloadViewer from "components/Card/XRPLPayloadViewer";
// import "./DetailNFTStyle.css";
import parse from "html-react-parser";
import { Checkbox, Switch } from "@mui/material";
// import CancelSale from "./RemoveSale";
import { Tooltip } from "react-tooltip";
// import DetailTab from "./DetailTab";
// import DetailTopMenu from "./DetailTopMenu";
import { useCoreumOperations } from "@/utils/hooks/useCoreumOperations";
import { useEVMOperations } from "@/utils/hooks/useEVMOperations";
import { useXRPOperations } from "@/utils/hooks/useXRPOperations";
import { useItemsApiServices } from "@/utils/api/api/useItemsApiServices";
import { useWalletOperations } from "@/utils/hooks/useWalletOperations";
import { useCallback, useEffect, useState } from "react";
import VideoForPreview from "@/utils/Card/VideoForPreview";
import NcImage from "@/utils/NcComponent/NcImage";

const statistics = [
  {
    label: "",
    avatar: "/images/avatar.jpg",
    history: true,
    title: "Owner",
    login: "annonymous",
  },
  {
    label: "",
    avatar: "/images/avatar.jpg",
    history: true,
    title: "Creator",
    login: "annonymous",
  },
];

const links = [
  {
    title: "History",
    icon: "country",
    url: "https://ui8.net/",
  },
  {
    title: "Properties",
    icon: "link",
    url: "https://ui8.net/",
  },
  {
    title: "Bids",
    icon: "link",
    url: "https://ui8.net/",
  },
  {
    title: "Data",
    icon: "link",
    url: "https://ui8.net/",
  },
];

const provenance = [
  {
    avatar: "/images/avatar.jpg",
    history: true,
    content: (
      <>
        Minted by <span>core1n...xds3d</span>
      </>
    ),
    price: "$ ---",
    date: "11/17/2023",
    url: "https://ui8.net/",
  },
  {
    avatar: "/images/avatar.jpg",
    history: true,
    content: (
      <>
        Listed by <span>core1n...xds3d</span>
      </>
    ),
    price: "$ 282.45",
    date: "11/17/2023",
    url: "https://ui8.net/",
  },
];

const tags = [
  "Cute",
  "Robot",
  "Cute Planet",
  "Suitcase",
  "Spaceship",
  "Animation",
  "Redshift Render",
  "3D",
  "Character",
  "Cinema 4D",
];

const MintNFTPage = () => {
  const router = useRouter();

  const globalDetailNFT = useAppSelector(selectDetailOfAnItem);
  const currentUsr = useAppSelector(selectCurrentUser);
  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [visibleModalCancelSale, setVisibleModalCancelSale] = useState(false);
  const [processing, setProcessing] = useState(true);
  // const { tokenId } = useParams();
  const { id: tokenId }: any = router.query;
  const [DEMO_NFT_ID] = useState(nanoid());
  const [sysTime, setSysTime] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getNftDetail } = useItemsApiServices();
  const { fetchBalance }: any = useSigningClient();
  const [isMobile, setIsMobile] = useState(false);
  const [blurContent, setBlurContent] = useState(false);
  const [showNSFWModal, setShowNSFWModal] = useState(false);
  const [nftMetaData, setNftMetaData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const {
    removeSaleOnCoreum,
    bidOnCoreum,
    buyOnCoreum,
    listOnCoreum,
    acceptOnCoreum,
    getLeftDuration,
    plusPlayCount,
  } = useCoreumOperations();
  const { removeSaleOnEVM, bidOnEVM, buyOnEVM, listOnEVM, acceptOnEVM } =
    useEVMOperations();
  const {
    removeSaleOnXRP,
    paymentPayload,
    bidOnXRP,
    buyOnXRP,
    listOnXRP,
    acceptOnXRP,
  }: any = useXRPOperations();
  const { checkWalletAddrAndChainId }: any = useWalletOperations();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    return () => {
      dispatch(changeItemDetail({}));
    };
  }, []);

  const validateBidStatus = useCallback(() => {
    if (globalDetailNFT?.bids.length > 0 && globalDetailNFT?.isSale === 2) {
      toast.warn("You cannot remove it from sale due to existing bids.");
      return false;
    }
    return true;
  }, [globalDetailNFT]);

  const removeSale = async () => {
    if (!validateBidStatus()) return;
    setVisibleModalCancelSale(false);
    setProcessing(true);
    if (!checkWalletAddrAndChainId) {
      setProcessing(false);
      return;
    }
    try {
      switch (currentNetworkSymbol) {
        case PLATFORM_NETWORKS.ETHEREUM:
          await removeSaleOnEVM();
          break;
        case PLATFORM_NETWORKS.COREUM:
          await removeSaleOnCoreum();
          break;
        case PLATFORM_NETWORKS.XRPL:
          await removeSaleOnXRP();
          break;
        default:
          toast.error("Unsupported network.");
      }
    } catch (error) {
      toast.error("Error processing request: " + error.message);
    } finally {
      await getNftDetail(tokenId || "");
      setProcessing(false);
    }
  };

  const confirmBuy = async () => {
    setVisibleModalPurchase(false);
    setProcessing(true);
    if (!checkWalletAddrAndChainId) {
      setProcessing(false);
      return;
    }
    try {
      switch (currentNetworkSymbol) {
        case PLATFORM_NETWORKS.ETHEREUM:
          await buyOnEVM(tokenId);
          break;
        case PLATFORM_NETWORKS.COREUM:
          await buyOnCoreum(tokenId);
          break;
        case PLATFORM_NETWORKS.XRPL:
          await buyOnXRP(tokenId);
          break;
        default:
          toast.error("Unsupported network.");
      }
    } catch (error: any) {
      toast.error("Error processing request: " + error.message);
    } finally {
      await getNftDetail(tokenId || "");
      setProcessing(false);
    }
  };
  const onPutSale = async (price: number, instant: boolean, period: number) => {
    setVisibleModalSale(false);
    if (price <= 0 || isNaN(price)) {
      toast.error("Invalid price.");
      return;
    }
    setProcessing(true);
    if (!checkWalletAddrAndChainId) {
      setProcessing(false);
      return;
    }
    var aucperiod = instant === true ? 0 : period * 24 * 3600;
    try {
      switch (currentNetworkSymbol) {
        // case PLATFORM_NETWORKS.EVM:
        case PLATFORM_NETWORKS.ETHEREUM:
          await listOnEVM(tokenId, aucperiod, price);
          break;
        case PLATFORM_NETWORKS.COREUM:
          await listOnCoreum(instant, aucperiod, price);
          break;
        case PLATFORM_NETWORKS.XRPL:
          await listOnXRP(price, aucperiod);
          break;
        default:
          toast.error("Unsupported network.");
      }
    } catch (error) {
      toast.error("Error processing request: " + error.message);
    } finally {
      getSystemTime().then((resp) => setSysTime(resp));
      await getNftDetail(tokenId || "");
      setProcessing(false);
    }
  };

  // const onBid = async (bidPrice: number) => {
  //   setVisibleModalBid(false);

  //   if (getLeftDuration <= 12) {
  //     toast.info("You can place a bid due to auction end time.");
  //     return;
  //   }
  //   setProcessing(true);
  //   if (!checkWalletAddrAndChainId) {
  //     setProcessing(false);
  //     return;
  //   }
  //   try {
  //     switch (currentNetworkSymbol) {
  //       case PLATFORM_NETWORKS.EVM:
  //         await bidOnEVM(bidPrice, tokenId);
  //         break;
  //       case PLATFORM_NETWORKS.COREUM:
  //         await bidOnCoreum(bidPrice, tokenId);
  //         break;
  //       case PLATFORM_NETWORKS.XRPL:
  //         await bidOnXRP(bidPrice, tokenId);
  //         break;
  //       default:
  //         toast.error("Unsupported network.");
  //     }
  //   } catch (error) {
  //     toast.error("Error occurred: " + error.message);
  //   } finally {
  //     await getNftDetail(tokenId || "");
  //     setProcessing(false);
  //   }
  // };

  // const onAccept = async () => {
  //   setVisibleModalAccept(false);

  //   setProcessing(true);
  //   if (!checkWalletAddrAndChainId) {
  //     setProcessing(false);
  //     return;
  //   }
  //   try {
  //     switch (currentNetworkSymbol) {
  //       case PLATFORM_NETWORKS.EVM:
  //         await acceptOnEVM(tokenId);
  //         break;
  //       case PLATFORM_NETWORKS.COREUM:
  //         await acceptOnCoreum(tokenId);
  //         break;
  //       case PLATFORM_NETWORKS.XRPL:
  //         await acceptOnXRP(tokenId);
  //         break;
  //       default:
  //         toast.error("Unsupported network.");
  //     }
  //   } catch (error) {
  //     toast.error("Error occurred: " + error.message);
  //   } finally {
  //     await getNftDetail(tokenId || "");
  //     setProcessing(false);
  //   }
  // };

  useEffect(() => {
    socket.on("UpdateStatus", (data) => {
      if (tokenId) {
        if (data?.type === "BURN_NFT" && data?.data?.itemId === tokenId) {
          router.push(`/collectionItems/${data?.data?.colId}`);
          return;
        }
        if (data.data.itemId === tokenId) {
          getNftDetail(tokenId || "");
        }
      }
    });
  }, []);

  const fetchJson = useCallback(async () => {
    setProcessing(true);
    if (
      globalDetailNFT?.metadataURI === undefined ||
      globalDetailNFT?.metadataURI === "" ||
      globalDetailNFT?.name !== ""
    ) {
      setNftName(globalDetailNFT?.name);
      setImageUrl(globalDetailNFT?.logoURL);
      setProcessing(false);
      return;
    }
    try {
      const response = await axios.get(
        getLinkPathToJSON(globalDetailNFT?.metadataURI, globalDetailNFT?.name)
      );

      if (response.data) {
        if (isJsonObject(response.data)) {
          setNftMetaData(JSON.parse(response.data));
          setNftName(JSON.parse(response.data).name);
          setImageUrl(JSON.parse(response.data).image.replace("ipfs://", ""));
        } else {
          setNftName(response.data.name);
          setNftMetaData(response.data);
          setImageUrl(response.data.image.replace("ipfs://", ""));
        }
      }
    } catch (error) {
      console.log(":..axios error:", error);
    }
    setProcessing(false);
  }, [globalDetailNFT]);

  useEffect(() => {
    if (globalDetailNFT?.isSale === 2) {
      (async () => {
        const res = await getSystemTime();
        setSysTime(res);
      })();
    }
    fetchJson();
  }, [globalDetailNFT]);

  useEffect(() => {
    let need2blur = false;
    if (globalDetailNFT?.explicit?.includes(currentUsr?._id) === true)
      need2blur = true;
    setBlurContent(need2blur);
  }, [globalDetailNFT, currentUsr]);

  useEffect(() => {
    getNftDetail(tokenId || "");
    fetchBalance();
  }, [tokenId, currentUsr]);

  useEffect(() => {
    if (processing) {
      document.documentElement.classList.add("no-scroll"); // Add no-scroll class to html element
    } else {
      document.documentElement.classList.remove("no-scroll"); // Remove no-scroll class from html element
    }

    return () => {
      document.documentElement.classList.remove("no-scroll"); // Clean up on component unmount
    };
  }, [processing]);

  // const renderIcon = (state?: "playing" | "loading") => {
  //   if (!state) {
  //     return (
  //       <svg className="ml-0.5 w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
  //         <path
  //           stroke="currentColor"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth="1.5"
  //           d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
  //         ></path>
  //       </svg>
  //     );
  //   }

  //   return (
  //     <svg className=" w-9 h-9 first-letter:" fill="none" viewBox="0 0 24 24">
  //       <path
  //         stroke="currentColor"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth="1.5"
  //         d="M15.25 6.75V17.25"
  //       ></path>
  //       <path
  //         stroke="currentColor"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth="1.5"
  //         d="M8.75 6.75V17.25"
  //       ></path>
  //     </svg>
  //   );
  // };

  // const renderPurchaseModalContent = () => {
  //   return (
  //     <Checkout
  //       onOk={confirmBuy}
  //       nft={globalDetailNFT}
  //       onCancel={() => setVisibleModalPurchase(false)}
  //     />
  //   );
  // };

  // const renderBidModalContent = () => {
  //   return (
  //     <Bid
  //       nft={globalDetailNFT}
  //       onOk={onBid}
  //       onCancel={() => setVisibleModalBid(false)}
  //     />
  //   );
  // };

  // const renderAcceptModalContent = () => {
  //   return (
  //     <Accept
  //       onOk={onAccept}
  //       onCancel={() => {
  //         setVisibleModalAccept(false);
  //       }}
  //       nft={globalDetailNFT}
  //     />
  //   );
  // };

  // const renderSaleModalContent = () => {
  //   return (
  //     <PutSale
  //       onOk={onPutSale}
  //       nft={globalDetailNFT}
  //       onCancel={() => setVisibleModalSale(false)}
  //     />
  //   );
  // };

  // const renderCancelSaleModal = () => {
  //   return (
  //     <CancelSale
  //       onOk={removeSale}
  //       onCancel={() => setVisibleModalCancelSale(false)}
  //     />
  //   );
  // };

  // const renderTrigger = () => {
  //   return null;
  // };
  // const renderListenButtonDefault = (state?: "playing" | "loading") => {
  //   return (
  //     <div
  //       className={`w-14 h-14 flex items-center justify-center rounded-full bg-[rgb(0,237,180)] text-black cursor-pointer`}
  //     >
  //       {renderIcon(state)}
  //     </div>
  //   );
  // };

  // const applyChangeExplicitContents = async () => {
  //   setShowNSFWModal(false);
  //   if (isEmpty(currentUsr?._id)) {
  //     toast.warn("Please connect your wallet and try again.");
  //     return;
  //   }
  //   try {
  //     //update explicit
  //     const updateResponse = await axios.post(
  //       `${config.API_URL}api/item/updateExplicit`,
  //       {
  //         userId: currentUsr?._id,
  //         itemId: globalDetailNFT?._id,
  //       }
  //     );
  //     if (updateResponse.data.code === 0) {
  //       getNftDetail(globalDetailNFT?._id);
  //     }
  //   } catch (error) { }
  // };

  // const handleCheckFieldChange = (event) => {
  //   if (event.target.checked === false) {
  //     applyChangeExplicitContents();
  //   } else {
  //     setShowNSFWModal(true);
  //   }
  // }

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
        <Layout layoutNoOverflow footerHide>
          <Description
            image={imageUrl}
            title={globalDetailNFT?.name || "The Explorer"}
            date="Minted on Aug 18, 2022"
            statistics={[
              {
                label: "",
                avatar: globalDetailNFT
                  ? config.UPLOAD_URL +
                    "uploads/" +
                    globalDetailNFT?.owner?.avatar
                  : "/images/avatar.jpg",
                history: true,
                title: "Owner",
                login: globalDetailNFT?.owner?.username || "Anonnymous",
              },
              {
                label: "",
                avatar: globalDetailNFT
                  ? config.UPLOAD_URL +
                    "uploads/" +
                    globalDetailNFT?.creator?.avatar
                  : "/images/avatar.jpg",
                history: true,
                title: "Creator",
                login: globalDetailNFT?.creator?.username || "Anonnymous",
              },
            ]}
            links={links}
            tags={tags}
            globalDetailNFT={globalDetailNFT}
            nftMetaData={nftMetaData}
            blurContent={blurContent}
            DEMO_NFT_ID={DEMO_NFT_ID}
            provenanceAction={{
              avatar: "/images/avatar.jpg",
              history: true,
              content: (
                <>
                  Minted by <span>core1n...xds3d</span>
                </>
              ),
              title: (
                <>
                  Sold for <span>6.05 ETH</span> $9,256.58
                </>
              ),
              date: "Aug 18, 2022 at 18:80",

              linkTitle: (
                <>
                  Auction settled by <span>@Kohaku</span>
                </>
              ),
              linkUrl: "https://ui8.net/",
            }}
            provenance={provenance}
            content={globalDetailNFT?.description || ""}
          >
            <Details globalDetailNFT={globalDetailNFT} />
          </Description>
        </Layout>
      )}
    </>
  );
};

export default MintNFTPage;
