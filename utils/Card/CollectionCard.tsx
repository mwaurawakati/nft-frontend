import React, { FC } from "react";
// import Avatar from "components/StyleComponent/Avatar";
// import NcImage from "components/NcComponent/NcImage";
// import VerifyIcon from "../StyleComponent/VerifyIcon";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import styles from "./CreateWithCollectionPage.module.sass";
import {
  changeConsideringCollectionId,
  CollectionData,
} from "@/utils/api/reducers/collection.reducers";
import { config } from "@/utils/api/config.js";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import { nanoid } from "@reduxjs/toolkit";
import VideoForBannerPreview from "./VideoForBannerPreview";
import { isVideo } from "@/utils/utils";
import Image from "@/components/Image";
import { Link } from "react-router-dom";

export interface CollectionCardProps {
  className?: string;
  imgs?: string[];
  collection?: CollectionData;
  isEditable?: Boolean;
  onRemove?: Function;
  key?: any;
}

const CollectionCard: FC<CollectionCardProps> = ({
  className,
  collection,
  isEditable = true,
  onRemove,
}) => {
  const dispatch = useAppDispatch();
  const currentUsr = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [DEMO_NFT_ID] = React.useState(nanoid());

  const onSelectCollection = (id: string) => {
    if (id !== "" && id) {
      dispatch(changeConsideringCollectionId(id));
      localStorage.setItem("collectionId", id);
      router.push("/collection/" + id);
    }
  };
  // const handleEdit = (id: string) => {
  //   if (collection && currentUsr?._id === collection?.owner?._id) {
  //     router.push("/editCollection/" + id);
  //   }
  // };

  // const handleRemove = (id: any, number: any) => {
  //   if (collection && currentUsr?._id === collection?.owner?._id) {
  //     onRemove(id, number);
  //   }
  // };

  return (
    <div
      onClick={() => {
        onSelectCollection(collection?._id || "");
      }}
    >
      <a className={styles.item}>
        <div className={styles.preview}>
          <Image
            src={`${config.UPLOAD_URL}uploads/${collection?.bannerURL}`}
            layout="fill"
            objectFit="cover"
            alt="NFTs"
          />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>{collection?.name}</div>
          <div className={styles.price}>{`${collection?.itemslength} Item${
            collection?.itemslength > 1 ? "s" : ""
          }`}</div>
        </div>
      </a>
    </div>
  );
};

export default CollectionCard;
