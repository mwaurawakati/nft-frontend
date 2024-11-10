import Link from "next/link";
import cn from "classnames";
import styles from "./Congrats.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useAppSelector } from "@/utils/api/hooks";
import { selectDetailOfAnItem } from "@/utils/api/reducers/nft.reducers";

type CongratsProps = {
  title: string;
  content: any;
};

import NcImage from "@/utils/NcComponent/NcImage";
import axios from "axios";
import { useAppDispatch, } from "@/utils/api/hooks";
import { config, PLATFORM_NETWORKS } from "@/utils/api/config";
import {
  changeItemDetail,
} from "@/utils/api/reducers/nft.reducers";
// import { useNavigate, useParams } from "react-router-dom";
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
import AudioForNft from "@/utils/Card/AudioForNft";
import VideoForNft from "@/utils/Card/VideoForNft";
import ThreeDForNft from "@/utils/Card/ThreeDForNft";
import { nanoid } from "@reduxjs/toolkit";
// import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer";
import { useSigningClient } from "@/utils/api/cosmwasm";
import { io } from "socket.io-client";
import {
  getLinkPathToJSON,
  getSystemTime,
  isJsonObject,
  isVideo,
} from "@/utils/utils";
import NcModal from "@/utils/NcComponent/NcModal";
import { FILE_TYPE } from "@/utils/api/config";
// import Clock from "./Clock/Clock";
// import PricesUnit from "components/StyleComponent/PricesUnit";
import VideoForPreview from "@/utils/Card/VideoForPreview";
import PaymentPayloadViewer from "@/utils/Card/XRPLPayloadViewer";
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
import { useRouter } from "next/router";
import { useState } from "react";

const Congrats = ({ title, content }: CongratsProps) => {
  const socket = io(`${config.socketUrl}`);
  const router = useRouter();

  const globalDetailNFT = useAppSelector(selectDetailOfAnItem);
  const currentUsr = useAppSelector(selectCurrentUser);
  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [visibleModalCancelSale, setVisibleModalCancelSale] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { id: tokenId } = router.query;
  const [DEMO_NFT_ID] = useState(nanoid());
  const [sysTime, setSysTime] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
//   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getNftDetail } = useItemsApiServices();
  const { fetchBalance }: any = useSigningClient();
  const [isMobile, setIsMobile] = useState(false);
  const [blurContent, setBlurContent] = useState(false);
  const [showNSFWModal, setShowNSFWModal] = useState(false);
  const [nftMetaData, setNftMetaData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const { removeSaleOnCoreum, bidOnCoreum, buyOnCoreum, listOnCoreum, acceptOnCoreum, getLeftDuration, plusPlayCount } = useCoreumOperations();
  const { removeSaleOnEVM, bidOnEVM, buyOnEVM, listOnEVM, acceptOnEVM } = useEVMOperations();
  const { removeSaleOnXRP, paymentPayload, bidOnXRP, buyOnXRP, listOnXRP, acceptOnXRP }: any = useXRPOperations();
  const { checkWalletAddrAndChainId }: any = useWalletOperations();


  console.log("::::tres==> globalDetail id",tokenId)
  console.log("''''currentNetworkSymbol''",currentNetworkSymbol)
  console.log("/////currentUsr...",currentUsr)

  return (
    <div className={styles.congrats}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={cn("button-circle", styles.close)}>
            <Icon name="close" />
          </a>
        </Link>
        <div className={styles.inner}>
          <div className={styles.preview}>
            <div className={styles.image}>
              <Image
                src="/images/congrats.png"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                alt="Avatar"
              />
            </div>
            <div className={styles.polygon}>
              <div className={styles.background}>
                <svg width="0" height="0" style={{ display: "block" }}>
                  <clipPath id="polygon" clipPathUnits="objectBoundingBox">
                    <path d="M0.56734176,0.00289554786 C0.588460408,-0.00379357421 0.611542883,0.00129193347 0.627894867,0.016236395 L0.958957144,0.318801867 C0.975311066,0.333746135 0.982451374,0.356279281 0.97768471,0.37791238 L0.881186884,0.815905858 C0.87642022,0.837539926 0.860475146,0.854986693 0.839356498,0.861676493 L0.411795427,0.997104015 C0.390676779,1.00379382 0.367594303,0.998708404 0.35124232,0.983763168 L0.020177136,0.68119818 C0.00382466766,0.666253913 -0.00331254023,0.643720766 0.00145363969,0.622087667 L0.0979503025,0.184093898 C0.102716967,0.162460315 0.11866204,0.145012773 0.139780689,0.138323651 L0.56734176,0.00289554786 Z" />
                  </clipPath>
                </svg>
              </div>
            </div>
            <div className={styles.confetti}>
              <Image
                src="/images/confetti.png"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                alt="Avatar"
              />
            </div>
          </div>
          <div className={styles.details}>
            <div className={cn("h1", styles.title)}>{title}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.btns}>
              <Link href="/nft">
                <a className={cn("button-large", styles.button)}>Buy now</a>
              </Link>
              <Link href="/share-nft">
                <a
                  className={cn(
                    "button-stroke-grey button-large",
                    styles.button
                  )}
                >
                  <span>Cancel</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
