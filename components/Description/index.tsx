import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./Description.module.sass";
import Icon from "@/components/Icon";
import Preview from "./Preview";
import Statistics from "./Statistics";
import Caption from "./Caption";
import Links from "./Links";
import Tags from "./Tags";
import Provenance from "./Provenance";
import NcImage from "@/utils/NcComponent/NcImage";
import { isVideo } from "@/utils/utils";
import VideoForBannerPreview from "@/utils/Card/VideoForBannerPreview";
import { FILE_TYPE, config } from "@/utils/api/config";
import VideoForPreview from "@/utils/Card/VideoForPreview";
import VideoForNft from "@/utils/Card/VideoForNft";
import ThreeDForNft from "@/utils/Card/ThreeDForNft";
import AudioForNft from "@/utils/Card/AudioForNft"

type DescriptionProps = {
  exit?: boolean;
  image: string;
  statistics: any;
  content: any;
  links?: any;
  addTags?: boolean;
  tags?: any;
  provenanceAction?: any;
  provenance?: any;
  captionHide?: boolean;
  title: string;
  date: string;
  children: React.ReactNode;
  globalDetailNFT?: any;
  nftMetaData?: any;
  blurContent?: any;
  DEMO_NFT_ID?: any;
};

const Description = ({
  exit,
  image,
  statistics,
  content,
  links,
  addTags,
  tags,
  provenanceAction,
  provenance,
  captionHide,
  title,
  date,
  children,
  globalDetailNFT,
  nftMetaData,
  blurContent,
  DEMO_NFT_ID,
}: DescriptionProps) => {
  const router = useRouter();

  // console.log(":::::::globalNFTDETAIL",globalDetailNFT)

  return (
    <>
      {exit && (
        <div className={styles.top}>
          <button className={styles.exit} onClick={() => router.back()}>
            <Icon name="close-fat" />
            <span>Exit preview mode</span>
          </button>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.col}>
          {/* <Preview image={image} alt={title} /> */}
          {globalDetailNFT?.fileType > FILE_TYPE.IMAGE ? (
            <>
              {isVideo(globalDetailNFT?.logoURL) === false ? (
                <NcImage
                  src={
                    globalDetailNFT?.logoURL !== ""
                      ? globalDetailNFT?.logoURL
                      : nftMetaData?.previewImage
                  }
                  containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                  className={`${blurContent === true ? "blur-2xl" : ""}`}
                />
              ) : (
                <VideoForPreview
                  src={
                    globalDetailNFT?.logoURL !== ""
                      ? globalDetailNFT?.logoURL
                      : nftMetaData?.previewImage
                  }
                  isLocal={false}
                  nftId={globalDetailNFT?._id || DEMO_NFT_ID}
                  className="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                  containStrict={true}
                />
              )}
              {/* //////// */}
              {globalDetailNFT.fileType === FILE_TYPE.THREED && (
                <>
                  {/* <ItemType3DIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" /> */}
                  <ThreeDForNft
                    src={
                      globalDetailNFT?.musicURL !== undefined ||
                      globalDetailNFT?.musicURL !== ""
                        ? `${config.ipfsGateway}${globalDetailNFT.musicURL}`
                        : `${config.ipfsGateway}${nftMetaData.image}`
                    }
                    nftId={globalDetailNFT?._id || DEMO_NFT_ID}
                  />
                </>
              )}
              {globalDetailNFT.fileType === FILE_TYPE.VIDEO && (
                <>
                  {/* <ItemTypeVideoIcon className="absolute w-8 h-8 left-3 top-3 md:w-10 md:h-10" /> */}
                  <VideoForNft
                    src={
                      globalDetailNFT?.musicURL !== undefined ||
                      globalDetailNFT?.musicURL !== ""
                        ? `${config.ipfsGateway}${globalDetailNFT.musicURL}?stream=true`
                        : `${config.ipfsGateway}${nftMetaData.image}?stream=true`
                    }
                    nftId={globalDetailNFT?._id || DEMO_NFT_ID}
                  />
                </>
              )}
              {globalDetailNFT.fileType === FILE_TYPE.AUDIO && (
                <AudioForNft
                  src={
                    globalDetailNFT?.musicURL !== undefined ||
                    globalDetailNFT?.musicURL !== ""
                      ? `${config.ipfsGateway}${globalDetailNFT.musicURL}`
                      : `${config.ipfsGateway}${nftMetaData.image}`
                  }
                  nftId={globalDetailNFT?._id || DEMO_NFT_ID}
                />
              )}
            </>
          ) : (
            <div>
              <NcImage
                src={image}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                className={`${blurContent === true ? "blur-2xl" : ""}`}
                thumbnail={`${globalDetailNFT?.thumbnailURL}`}
              />
            </div>
          )}
          <Statistics className={styles.box} items={statistics} />
          <div className={styles.box}>
            <div className={cn("h4", styles.stage)}>Description</div>
            <div className={styles.content}>{content}</div>
            {links && <Links items={links} />}
          </div>
          {provenance && (
            <div className={styles.box}>
              <div className={cn("h4", styles.stage)}>History</div>
              <Provenance
                action={provenanceAction}
                items={provenance}
                globalDetailNFT={globalDetailNFT}
              />
            </div>
          )}
        </div>
        <div className={styles.col}>
          <div className={styles.wrap}>
            {!captionHide && <Caption title={title} date={date} />}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
