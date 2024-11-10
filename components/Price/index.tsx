import Link from "next/link";
import cn from "classnames";
import styles from "./Price.module.sass";
import Field from "@/components/Field";
import {
  ACTIVE_CHAINS,
  COREUM_PAYMENT_COINS,
  PLATFORM_NETWORKS,
} from "@/utils/api/config";
import { isSupportedEVMNetwork } from "@/utils/utils";

type PriceProps = {
  title: any;
  price?: string;
  value?: any;
  setValue?: any;
  placeholder?: any;
  crypterFee?: string;
  percent?: string;
  totalReceive?: string;
  onClick?: () => void;
  buttonText: string;
  content: any;
  globalDetailNFT?: any;
};

const Price = ({
  title,
  price,
  value,
  setValue,
  placeholder,
  crypterFee,
  percent,
  totalReceive,
  onClick,
  buttonText,
  content,
  globalDetailNFT,
}: PriceProps) => (
  <div className={styles.price}>
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.wrap}>
        {price ? (
          <div className={styles.flex}>
            <div className={cn("h3", styles.price)}>
              {/* /////////////// */}
              {globalDetailNFT?.isSale === 2
                ? `${
                    globalDetailNFT.bids && globalDetailNFT.bids.length > 0
                      ? globalDetailNFT.bids[globalDetailNFT.bids.length - 1]
                          .price
                        ? globalDetailNFT.bids[globalDetailNFT.bids.length - 1]
                            .price
                        : 0
                      : globalDetailNFT?.price
                  }`
                : globalDetailNFT?.isSale === 1
                ? `${globalDetailNFT?.price || 0}`
                : ""}
              {/* ////////////// */}
            </div>
            <div className={cn("h3", styles.currency)}>
              {globalDetailNFT?.isSale === 2
                ? `
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
                ? `${
                    globalDetailNFT.networkSymbol === PLATFORM_NETWORKS.COREUM
                      ? globalDetailNFT.coreumPaymentUnit ===
                        COREUM_PAYMENT_COINS.RIZE
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
          </div>
        ) : (
          <div className={styles.box}>
            <Field
              className={styles.field}
              inputClassName={styles.input}
              placeholder={placeholder || "0.00"}
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              large
              required
            />
            <div className={cn("h3", styles.currency)}>ETH</div>
          </div>
        )}
        {crypterFee && (
          <div className={styles.line}>
            <div className={styles.label}>Crypter fee</div>
            <div className={styles.value}>{crypterFee}</div>
          </div>
        )}
        {totalReceive && (
          <div className={styles.line}>
            <div className={styles.label}>Total receive</div>
            <div className={styles.percent}>{percent}</div>
            <div className={styles.value}>{totalReceive}</div>
          </div>
        )}
      </div>
      {onClick ? (
        <button
          className={cn("button-large button-wide", styles.button)}
          onClick={onClick}
        >
          {buttonText}
        </button>
      ) : (
        <Link href={`/congrats/${globalDetailNFT?._id}`}>
          <a className={cn("button-large button-wide", styles.button)}>
            {buttonText}
          </a>
        </Link>
      )}
    </div>
    <div className={styles.content}>{content}</div>
  </div>
);

export default Price;
