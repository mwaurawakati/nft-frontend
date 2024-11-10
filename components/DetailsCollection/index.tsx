import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import Icon from "@/components/Icon";
import { getItemPriceUnitText } from "@/utils/ItemPriceUnitText";
import { useRouter } from "next/router";
import parse from "html-react-parser";

type DetailsType = {
  label: string;
  value: string;
};

type DetailsProps = {
  details: DetailsType[];
  collection?: any;
  collectionMinPrice?: any;
  ownersCount?: any;
  tradingVolumn?: any;
};

const Details = ({
  details,
  collection,
  collectionMinPrice,
  ownersCount,
  tradingVolumn,
}: DetailsProps) => {
  const router = useRouter();

  return (
    <div className={styles.details}>
      <div className={styles.head}>
        <div className={styles.box}>
          <div className={cn("h2", styles.user)}>
            {collection && collection.name}
          </div>
          {/* <div className={styles.line}>
                        <div className={styles.category}>CUTE</div>
                        <div className={styles.code}>
                            0xE5A1....D0306
                            <button className={styles.copy}>
                                <Icon name="copy" />
                            </button>
                        </div>
                    </div> */}
        </div>
        <button
          className={cn("button-stroke-grey button-medium", styles.button)}
          onClick={() => {
            router.push("/create/with-collection")
          }}
        >
          <span>Create NFTs</span>
        </button>
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>
            <Icon name="profile-fat" />
            {"Floor Price"}
          </div>
          <div className={cn("h4", styles.value)}>
            {" "}
            {collection && collectionMinPrice ? (
              <span className="font-[MyCutomFont] text-[2rem] text-[#33ff00]">
                {" " + collectionMinPrice + " "}
              </span>
            ) : (
              " 0 "
            )}
            {getItemPriceUnitText(collection)}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <Icon name="profile-fat" />
            {"All owners"}
          </div>
          <div className={cn("h4", styles.value)}>{ownersCount || 0}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <Icon name="profile-fat" />
            {"Trading volumn"}
          </div>
          <div className={cn("h4", styles.value)}>{tradingVolumn}</div>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.stage}>Description</div>
        <div className={styles.content}>{collection && parse(collection?.description || "")}</div>
      </div>
    </div>
  );
};

export default Details;
