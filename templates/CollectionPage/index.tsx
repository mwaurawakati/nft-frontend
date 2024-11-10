"use client";

import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "./Collection";
import { useSigningClient } from "@/utils/api/cosmwasm";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import {
  selectCurrentNetworkSymbol,
  selectCurrentUser,
} from "@/utils/api/reducers/auth.reducers";
import {
  changeBulkOpsMode,
  changeDetailedCollection,
  emptyBulkSelectedArray,
  selectBulkOpsMode,
  selectBulkSelectedArray,
  selectDetailedCollection,
  setBulkSelectArray,
} from "@/utils/api/reducers/collection.reducers";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { useItemsApiServices } from "@/utils/api/api/useItemsApiServices";
import { useWalletOperations } from "@/utils/hooks/useWalletOperations";
import {
  ITEM_ACTION_TYPES,
  PLATFORM_NETWORKS,
  config,
} from "@/utils/api/config";
import { toast } from "react-toastify";
import { isEmpty, saveMultipleItemActivity } from "@/utils/api/methods";
import PutSale from "@/utils/NftDetailPage/PutSale";
import {
  getCollectionDetails,
  getSearchInaCollection,
  updateExplicitApi,
} from "@/utils/api/api/collections";
import { calcFloorPrice } from "@/utils/utils";
import { Backdrop, CircularProgress } from "@mui/material";

interface Param {
  start?: any;
  last?: any;
  collId?: any;
  userId?: any;
}

const CollectionPage = () => {
  let collection: any = useAppSelector(selectDetailedCollection);
  // const bulkSelectedArray = useAppSelector(selectBulkSelectedArray);
  const showBulkFeatures = useAppSelector(selectBulkOpsMode);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUsr = useAppSelector(selectCurrentUser);
  const [DEMO_NFT_ID] = React.useState(nanoid());
  const { id: collectionId }: any = router.query;

  const [collectionMinPrice, setCollectionMinPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [processing, setProcessing] = useState(true);
  const more: any = useRef();

  var list: any = [];

  useEffect(() => {
    dispatch(changeBulkOpsMode(false));
    dispatch(setBulkSelectArray([]));
  }, []);

  useEffect(() => {
    localStorage.setItem("currentItemIndex", "0");
    getCollectionList(true, 0);
    return () => {
      // dispatch(changeDetailedCollection({}));
      dispatch(changeDetailedCollection());
      setItems([]);
    };
  }, []);

  const getCollectionList = async (reStart: any, useStart: any) => {
    let currentItemCount: any = localStorage.getItem("currentItemIndex");
    if (currentItemCount === null || currentItemCount === undefined) {
      localStorage.setItem("currentItemIndex", "0");
    }
    var param: Param = {
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
      // var list = [];
      let currentInfo: any = localStorage.getItem("hideCollections");
      if (currentInfo === null || !currentInfo) currentInfo = "{}";
      else currentInfo = JSON.parse(currentInfo.toString());

      let currentInfo1: any = localStorage.getItem("hideItems");
      if (currentInfo1 === null || currentInfo1 === undefined)
        currentInfo1 = "{}";
      else currentInfo1 = JSON.parse(currentInfo1.toString());
      for (var i = 0; i < response.list.length; i++) {
        var item = response.list[i].item_info;
        item.isLiked = response.list[i].item_info.likes.includes(
          currentUsr?._id
        );
        item.owner = response.list[i].owner_info;
        item.blur = response.list[i].blurItems;
        item.users = [{ avatar: response.list[i].creator_info.avatar }];
        let collectionHideflag = Boolean(currentInfo[response.list[i]._id]);
        if (collectionHideflag === true) item.hideItem = true;
        else {
          item.hideItem = Boolean(currentInfo1[response.list[i].item_info._id]);
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
      if (response.list.length < 10) {
        // setViewNoMore(true);
      } else {
        // more.current = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentItemCount: any = localStorage.getItem("currentItemIndex");
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

        if (data?.explicit?.some((id: any) => id === currentUsr?._id)) {
          // setShowExplicit(true);
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
      collection?.explicit?.findIndex(
        (item: any) => item === currentUsr?._id
      ) >= 0
    ) {
      // setShowExplicit(true);
    }
  }, [currentUsr]);

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
        <Layout layoutNoOverflow lightHeader footerHide>
          <Background
            image={`${config.UPLOAD_URL}uploads/${collection?.bannerURL}`}
          />
          {collection && (
            <Collection
              collection={collection}
              collectionMinPrice={collectionMinPrice}
              itemsLength={collection?.items?.length}
              collectionId={collectionId}
              unitPrice={parseInt(collection?.mintingPrice)}
              launchpadState={collection?.launchstate}
              items={items}
              showBulkFeatures={showBulkFeatures}
            />
          )}
        </Layout>
      )}
    </>
  );
};

export default CollectionPage;
