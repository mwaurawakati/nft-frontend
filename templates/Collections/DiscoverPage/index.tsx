import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import Catalog from "@/components/Catalog";
import Auctions from "@/components/Auctions";
import Collections from "./Collections";
import Artists from "./Artists";
import Newsletter from "@/components/Newsletter";

import { auctions } from "@/mocks/auctions";
import { tabsTime, nfts, statuses } from "@/mocks/nfts";




import cn from "classnames";
// import styles from "./Profile.module.sass";
// import defaultLogo from "images/default_logo.png";
import {config, ITEM_ACTION_TYPES, PLATFORM_NETWORKS,} from "@/utils/api/config";
// import {useNavigate, useParams} from "react-router-dom";
import { useRouter } from "next/router";
import {isEmpty, saveMultipleItemActivity} from "@/utils/api/methods";
import {useAppDispatch, useAppSelector} from "@/utils/api/hooks";
// import ButtonPrimary from "components/Button/ButtonPrimary";
import {
    changeBulkOpsMode,
    changeDetailedCollection,
    emptyBulkSelectedArray,
    selectBulkOpsMode,
    selectBulkSelectedArray,
    selectDetailedCollection,
    setBulkSelectArray,
} from "@/utils/api/reducers/collection.reducers";
import {selectCurrentNetworkSymbol, selectCurrentUser, selectWalletStatus,} from "@/utils/api/reducers/auth.reducers";
// import {getItemPriceUnitText} from "containers/NftDetailPage/ItemPriceUnitText";
// import VideoForBannerPreview from "components/Card/VideoForBannerPreview";
import {nanoid} from "@reduxjs/toolkit";
import parse from "html-react-parser";
import {toast} from "react-toastify";
import {useSigningClient} from "@/utils/api/cosmwasm";
// import NcModal from "components/NcComponent/NcModal";
// import CopyButton from "components/Button/CopyButton";
import {BsLink} from "react-icons/bs";
import NcImage from "@/utils/NcComponent/NcImage";
import {Backdrop, CircularProgress, Switch, Tooltip} from "@mui/material";
// import Checkbox from "components/Button/Checkbox";
// import Label from "components/StyleComponent/Label";
import {IoIosCloseCircle} from "react-icons/io";
// import ModalDelete from "components/Modal/ModalDelete";
// import ModalTransferToken from "components/Modal/ModalTransferToken";
// import PutSale from "containers/NftDetailPage/PutSale";
// import CancelSale from "containers/NftDetailPage/RemoveSale";
// import Input from "components/StyleComponent/Input";
// import CardNFTComponent from "components/Card/CardNFTComponent";
import {calcFloorPrice, isVideo} from "@/utils/utils";
// import {getCollectionDetails, getSearchInaCollection, updateExplicitApi,} from "app/api/collections";
// import MainSection from "components/Section/MainSection";
// import CollectionInfo from "./collectionInfo";
import { useItemsApiServices } from "@/utils/api/api/useItemsApiServices";
import { useWalletOperations } from "@/utils/hooks/useWalletOperations";
import { getCollectionDetails, getSearchInaCollection, updateExplicitApi } from "@/utils/api/api/collections";

const HomePage = () => {
    const scrollToAll = useRef<any>(null);
    const scrollToNFTs = useRef<any>(null);
    const scrollToCollections = useRef<any>(null);
    const scrollToArtist = useRef<any>(null);




    const { bulkListNFT, bulkCancelSaleNFT, bulkBurnNFT, bulkTransferNFT } =
    useSigningClient();
  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const collection = useAppSelector(selectDetailedCollection);
  const bulkSelectedArray = useAppSelector(selectBulkSelectedArray);
  const showBulkFeatures = useAppSelector(selectBulkOpsMode);
  const dispatch = useAppDispatch();
//   const navigate = useNavigate();
  const router = useRouter();
  const currentUsr = useAppSelector(selectCurrentUser);
  const [DEMO_NFT_ID] = React.useState(nanoid());
  const { id: collectionId } = router.query;

  const [collectionMinPrice, setCollectionMinPrice] = useState(0);
  const { bulkBurnApi, bulkPutOnSaleApi, bulkRemoveFromSaleApi, bulkTransferApi } = useItemsApiServices();
  const [items, setItems] = useState([]);
  const [viewNoMore, setViewNoMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [showExplicit, setShowExplicit] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [visibleModalDelist, setVisibleModalDelist] = useState(false);
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const [visibleModalBurn, setVisibleModalBurn] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const {checkWalletAddrAndChainId} = useWalletOperations();
  const more = useRef();
  

  const onBulkTransfer = async (toAddr: any) => {
    let checkResult = await checkWalletAddrAndChainId();
    if (!checkResult) {
      return;
    }
    const isNotOwner = bulkSelectedArray?.some(
      (item) => item.owner?.address !== currentUsr?.address
    );
    if (isNotOwner) {
      toast.error("You are not the owner of these NFTs.");
      return;
    }

    const hasBidsAndOnSale = bulkSelectedArray?.some(
      (item) => item?.bids.length > 0 && item?.isSale === 2
    );
    if (hasBidsAndOnSale) {
      toast.warn(
        "You cannot transfer from sale because you had one or more bid(s) already."
      );
      return;
    }

    setVisibleModalTransfer(false);
    if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
      setProcessing(true);
      try {
        const txHash = await bulkTransferNFT(
          currentUsr.address,
          collection?.cw721address,
          toAddr,
          bulkSelectedArray?.map((item) => item.tokenId)
        );

        if (txHash === -1) {
          throw new Error("Network error.");
        }

        const ids = bulkSelectedArray?.map((item) => item._id);
        const response = await bulkTransferApi(ids, currentUsr.address, toAddr);

        if (response.code !== 0) {
          throw new Error(response.message);
        }

        toast.success("You've sent items.");

        const params = {
          items: ids,
          origin: currentUsr?._id,
          destination: toAddr,
          transactionHash: txHash,
          actionType: ITEM_ACTION_TYPES.TRANSFERED,
        };

        saveMultipleItemActivity(params);
        getCollectionList(true, 0);
      } catch (error) {
        toast.error(error.message || "Failed to bulk transfer.");
      } finally {
        setProcessing(false);
        dispatch(emptyBulkSelectedArray());
        setSelectAll(false);
      }
    }
  };

  const onBulkBurn = async () => {
    let checkResult = await checkWalletAddrAndChainId();
    if (!checkResult) {
      return;
    }
    const isNotOwner = bulkSelectedArray.some(
      (item) => item.owner?.address !== currentUsr.address
    );
    if (isNotOwner) {
      toast.error("You are not the owner of these NFTs.");
      return;
    }

    const hasBidsOnSale = bulkSelectedArray.some(
      (item) => item?.bids.length > 0 && item?.isSale === 2
    );
    if (hasBidsOnSale) {
      toast.warn("You cannot burn because you had one or more bid(s) already.");
      return;
    }

    setVisibleModalBurn(false);

    if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
      setProcessing(true);

      try {
        const txHash = await bulkBurnNFT(
          currentUsr.address,
          collection?.cw721address,
          bulkSelectedArray?.map((item) => item.tokenId)
        );

        if (txHash === -1) {
          throw new Error("Tx error.");
        }

        const ids = bulkSelectedArray?.map((item) => item._id);
        const response = await bulkBurnApi(ids, collection?._id);

        if (response.code !== 0) {
          throw new Error(response.message || "Error in burning items.");
        }

        toast.success("You've burnt items.");

        const params = {
          items: ids,
          origin: currentUsr?._id,
          transactionHash: txHash,
          actionType: ITEM_ACTION_TYPES.DESTROYED,
        };

        await saveMultipleItemActivity(params);
        await getCollectionList(true, 0);

      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to Bulk Burn.");
      } finally {
        setProcessing(false);
        dispatch(emptyBulkSelectedArray());
        setSelectAll(false);
      }
    }
  };

  const onBulkDelist = async () => {
    const hasBidsOnSale = bulkSelectedArray.some(
      (item) => item?.bids.length > 0 && item?.isSale === 2
    );
    if (hasBidsOnSale) {
      toast.warn("You cannot burn because you had one or more bid(s) already.");
      return;
    }
    const isBidsOnSale = bulkSelectedArray.some((item) => item?.isSale <= 0);
    if (isBidsOnSale) {
      toast.error("Please correctly selected items on sale and try again.");
      return;
    }

    let checkResult = await checkWalletAddrAndChainId();
    if (!checkResult) {
      return;
    }
    setVisibleModalDelist(false);
    if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
      setProcessing(true);
      try {
        let txHash = await bulkCancelSaleNFT(
          currentUsr.address,
          collection?.address,
          bulkSelectedArray.map((item) => item.tokenId)
        );
        if (txHash === -1) {
          throw new Error("Tx error.");
        }
        const token_ids = bulkSelectedArray.map((item) => item._id);
        const response = await bulkRemoveFromSaleApi(token_ids);
        if (response.code !== 0) {
          throw new Error(response.message || "Error in delisting items.");
        }
        toast.success("Succeed in delisting items.");

        let params = {
          items: token_ids,
          origin: currentUsr?._id,
          transactionHash: txHash,
          actionType: ITEM_ACTION_TYPES.DELISTED,
        };
        await saveMultipleItemActivity(params);
        await getCollectionList(true, 0);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to Delist.");
      } finally {
        setProcessing(false);
        dispatch(emptyBulkSelectedArray());
        setSelectAll(false);
      }
    }
  };

  const onPutSale = async (price, instant, period) => {
    let checkResult = await checkWalletAddrAndChainId();
    if (!checkResult) {
      return;
    }
    const isNotOwner = bulkSelectedArray.some(
      (item) => item.owner?.address !== currentUsr.address
    );
    if (isNotOwner) {
      toast.error("You are not the owner of these NFTs.");
      return;
    }
    const isOnSale = bulkSelectedArray.some((item) => item?.isSale > 0);
    if (isOnSale) {
      toast.error(
        "Please correctly selected item(s) that is no on sale and try again."
      );
      return;
    }
    setVisibleModalSale(false);
    if (Number(price) <= 0 || isNaN(price)) {
      toast.error("Invalid price.");
      return;
    }
    var aucperiod = instant === true ? 0 : period * 24 * 3600;
    var tokenIds = bulkSelectedArray.map((item) => item.tokenId);
    if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
      setProcessing(true);
      try {
        const denormArg = { native: config.COIN_MINIMAL_DENOM };
        let txhash = await bulkListNFT(
          currentUsr.address,
          collection?.cw721address,
          !instant ? "Auction" : "Fixed",
          !instant
            ? {
                Time: [
                  Math.floor(Date.now() / 1000),
                  Math.floor(Date.now() / 1000) + Math.floor(aucperiod),
                ],
              }
            : "Fixed",
          price,
          price,
          denormArg,
          tokenIds,
          collection?.address
        );
        if (txhash === -1) {
          throw new Error("Tx error.");
        }
        const response = await bulkPutOnSaleApi(
          tokenIds,
          aucperiod,
          price,
          txhash,
          collection?._id
        );
        if (response.code !== 0) {
          throw new Error(response.message || "Error in listing items.");
        }
        toast.success("Succeed put on sale.");
        const params = {
          items: bulkSelectedArray?.map((item) => item._id),
          price: price,
          origin: currentUsr._id,
          actionType: ITEM_ACTION_TYPES.LISTED,
          transactionHash: txhash,
        };
        saveMultipleItemActivity(params);
        getCollectionList(true, 0);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to Bulk List.");
      } finally {
        setProcessing(false);
        dispatch(emptyBulkSelectedArray());
        setSelectAll(false);
      }
    }
  };

  const renderSaleModalContent = () => {
    return (
      <PutSale
        onOk={onPutSale}
        onCancel={() => setVisibleModalSale(false)}
        multiple={bulkSelectedArray?.length}
      />
    );
  };

  const renderDelistModalContent = () => {
    return (
      <CancelSale
        multiple={bulkSelectedArray?.length}
        onOk={onBulkDelist}
        onCancel={() => setVisibleModalDelist(false)}
      />
    );
  };

  useEffect(() => {
    dispatch(changeBulkOpsMode(false));
    dispatch(setBulkSelectArray([]));
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    localStorage.setItem("currentItemIndex", "0");
    getCollectionList(true, 0);
    more.current = false;
    return () => {
      dispatch(changeDetailedCollection({}));
      setItems([]);
    };
  }, []);

  const getCollectionList = async (reStart, useStart) => {
    let currentItemCount = localStorage.getItem("currentItemIndex");
    if (currentItemCount === null || currentItemCount === undefined) {
      localStorage.setItem("currentItemIndex", "0");
    }
    var param = {
      start: reStart === true ? useStart : Number(currentItemCount),
      last:
        reStart === true
          ? useStart + 10
          : Number(currentItemCount) + Number(10),
    };
    param.collId = collectionId;
    param.userId = currentUsr?._id;

    if (reStart) {
      localStorage.setItem("currentItemIndex", "0");
      setItems([]);
      setProcessing(true);
    }
    try {
      const response = await getSearchInaCollection(param);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      var list = [];
      let currentInfo = localStorage.getItem("hideCollections");
      if (currentInfo === null || !currentInfo) currentInfo = "{}";
      else currentInfo = JSON.parse(currentInfo.toString());

      let currentInfo1 = localStorage.getItem("hideItems");
      if (currentInfo1 === null || currentInfo1 === undefined)
        currentInfo1 = "{}";
      else currentInfo1 = JSON.parse(currentInfo1.toString());
      for (var i = 0; i < response.list.length; i++) {
        var item = response.list[i].item_info;
        item.isLiked = response.list[i].item_info.likes.includes(
          currentUsr._id
        );
        item.owner = response.list[i].owner_info;
        item.blur = response.list[i].blurItems;
        item.users = [{ avatar: response.list[i].creator_info.avatar }];
        let collectionHideflag = Boolean(currentInfo[response.list[i]._id]);
        if (collectionHideflag === true) item.hideItem = true;
        else {
            item.hideItem = Boolean(
              currentInfo1[response.list[i].item_info._id]
          );
          item.verified = item.creator_info?.verified;
        }

        list.push(item);
      }

      if (reStart) {
        localStorage.setItem(
          "currentItemIndex",
          (Number(list.length) + useStart).toString()
        );
        setItems(list);
        setCollectionMinPrice(calcFloorPrice(list));
      } else {
        setItems((items) => {
          localStorage.setItem(
            "currentItemIndex",
            (Number(currentItemCount) + Number(list.length)).toString()
          );
          setCollectionMinPrice(calcFloorPrice(items.concat(list)));
          return items.concat(list);
        });
      }
      if (response?.list.length < 10) {
        // setViewNoMore(true);
      } else {
        more.current = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentItemCount = localStorage.getItem("currentItemIndex");
      if (!more.current && isScrollAtBottom() && currentItemCount > 0) {
        more.current = true;
        getCollectionList(false, 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionDetails(collectionId);
        const data = response.data || [];

        if (data?.explicit?.some((id) => id === currentUsr?._id)) {
          setShowExplicit(true);
        }

        dispatch(changeDetailedCollection(data));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch collection data");
      }
    };

    fetchCollectionDetails();
  }, [collectionId]);

  useEffect(() => {
    if (
      collection?.explicit?.findIndex((item) => item === currentUsr?._id) >= 0
    ) {
      setShowExplicit(true);
    }
  }, [currentUsr]);

  const applyChangeExplicitContents = async () => {
    //save explicit showing flag
    if (isEmpty(currentUsr?._id)) {
      toast.warn("Please connect your wallet and try again.");
      return;
    }
    try {
      //update explicit
      const updateResponse = await updateExplicitApi(
        currentUsr?._id,
        collectionId
      );
      if (updateResponse.code === 0) {
        setShowExplicit(!showExplicit);
        setTimeout(() => {
          getCollectionList(true, 0);
        }, [1000]);
      }
    } catch (error) {}
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setStartIndex(event.target.value);
      localStorage.setItem("currentItemIndex", event.target.value);
      getCollectionList(true, parseInt(event.target.value));
    }
  };

  const handleStartIndex = (event) => {
    setStartIndex(event.target.value);
  };

  const isScrollAtBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    // Calculate the adjusted heights based on the zoom level
    const zoomFactor = 1 / window.devicePixelRatio; // Get the zoom factor
    const adjustedWindowHeight = windowHeight * zoomFactor;
    const adjustedDocumentHeight = documentHeight * zoomFactor;
    const adjustedScrollPosition = scrollPosition * zoomFactor;

    return (
      (adjustedWindowHeight + adjustedScrollPosition) * 2 >=
      adjustedDocumentHeight
    );
  };




    const tabsSorting = [
        {
            title: "All",
            value: "all",
            anchor: scrollToAll,
        },
        {
            title: "NFTs",
            value: "nfts",
            counter: "456,789",
            anchor: scrollToNFTs,
        },
        {
            title: "Collections",
            value: "collections",
            counter: "123,987",
            anchor: scrollToCollections,
        },
        {
            title: "Artist",
            value: "artist",
            counter: "45,678",
            anchor: scrollToArtist,
        },
    ];
    return (
        <Layout layoutNoOverflow noRegistration>
            <Main scrollToRef={scrollToAll} />
            <Catalog
                title="NFTs"
                tabsSorting={tabsSorting}
                tabsTime={tabsTime}
                filters={statuses}
                items={nfts}
                scrollToRef={scrollToNFTs}
            />
            {/* <Auctions color="#DBFF73" items={auctions} /> */}
            {/* <Collections scrollToRef={scrollToCollections} /> */}
            {/* <Artists scrollToRef={scrollToArtist} /> */}
            {/* <Newsletter /> */}
        </Layout>
    );
};

export default HomePage;
