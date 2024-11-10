import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import {
  ACTIVE_CHAINS,
  COREUM_PAYMENT_COINS,
  PLATFORM_NETWORKS,
} from "@/utils/api/config";
import { isSupportedEVMNetwork } from "@/utils/utils";

type DetailsProps = {
  globalDetailNFT?: any;
};

const Details = ({ globalDetailNFT }: DetailsProps) => (
  <div className={styles.details}>
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.label}>
          {globalDetailNFT?.isSale === 2
            ? globalDetailNFT?.bids && globalDetailNFT?.bids?.length > 0
              ? "Current Bid"
              : "Start price"
            : globalDetailNFT?.isSale === 1
            ? "Sale Price"
            : "Price"}
        </div>
        <div className={cn("h4", styles.value)}>
          {globalDetailNFT?.isSale === 2
            ? `${
                globalDetailNFT.bids && globalDetailNFT.bids.length > 0
                  ? globalDetailNFT.bids[globalDetailNFT.bids.length - 1].price
                    ? globalDetailNFT.bids[globalDetailNFT.bids.length - 1]
                        .price
                    : 0
                  : globalDetailNFT?.price
              } 
          ${
            globalDetailNFT.networkSymbol === PLATFORM_NETWORKS.COREUM
              ? globalDetailNFT.coreumPaymentUnit === COREUM_PAYMENT_COINS.RIZE
                ? "RIZE"
                : "CORE"
              : ""
          }
          ${
            isSupportedEVMNetwork(globalDetailNFT.networkSymbol) === true
              ? ACTIVE_CHAINS[globalDetailNFT.networkSymbol]?.currency || "ETH"
              : ""
          } 
          ${
            globalDetailNFT.networkSymbol === PLATFORM_NETWORKS.XRPL
              ? "XRP"
              : ""
          }                 
                  `
            : globalDetailNFT?.isSale === 1
            ? `${globalDetailNFT?.price || 0}  
          ${
            globalDetailNFT.networkSymbol === PLATFORM_NETWORKS.COREUM
              ? globalDetailNFT.coreumPaymentUnit === COREUM_PAYMENT_COINS.RIZE
                ? "RIZE"
                : "CORE"
              : ""
          }
          ${
            isSupportedEVMNetwork(globalDetailNFT.networkSymbol) === true
              ? ACTIVE_CHAINS[globalDetailNFT.networkSymbol]?.currency || "ETH"
              : ""
          }            
          ${
            globalDetailNFT.networkSymbol === PLATFORM_NETWORKS.XRPL
              ? "XRP"
              : ""
          }                   
          `
            : "Not listed"}
        </div>
        <Link href={`/buy-now/${globalDetailNFT._id}`}>
          <a className={cn("button-medium button-wide", styles.button)}>
            buy now
          </a>
        </Link>
      </div>
      <div className={styles.col}>
        {/* <div className={styles.label}>Reserve</div> */}
        {/* <div className={cn("h4", styles.value)}>0.35 ETH</div> */}
        {/* <Link href="/place-a-bid">
                    <a
                        className={cn(
                            "button-stroke-grey button-medium button-wide",
                            styles.button
                        )}
                    >
                        place a bid
                    </a>
                </Link> */}
      </div>
    </div>
    {/* <div className={styles.foot}>
            <div className={styles.box}>
                <div className={styles.label}>Last sold</div>
                <div className={cn("h4", styles.value)}>6.05 ETH</div>
            </div>
            <div className={styles.user}>
                <div className={cn(styles.avatar, styles.history)}>
                    <Image
                        src="/images/avatar.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.author}>Dash</div>
                    <div className={styles.code}>0x56C1...8eCC</div>
                </div>
            </div>
            <Link href="/make-offer">
                <a
                    className={cn(
                        "button-stroke-grey button-medium",
                        styles.button
                    )}
                >
                    make offer
                </a>
            </Link>
        </div> */}
  </div>
);

export default Details;
