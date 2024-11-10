import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./Main.module.sass";
import Arrow from "@/components/Arrow";
import Item from "./Item";
import { HolderNFTS } from "@/mocks/HolderNFTS";
import { renameManyObject } from "@/utils/api/methods";

const keysObjects = [
  {
    oldKey: "name",
    newKey: "title",
  },
  {
    oldKey: "thumbnailURL",
    newKey: "image",
  },
];

// let list = [
//     {
//         title: "The creator network  .",
//         collection: "Escape II",
//         price: "10.00 ETH",
//         reserve: "2.38 ETH",
//         image: "/images/main-pic-1.jpg",
//     },
//     {
//         title: "The creator network.",
//         collection: "Escape I",
//         price: "24.33 ETH",
//         reserve: "5.64 ETH",
//         image: "/images/main-pic-2.jpg",
//         color: "#BCE6EC",
//     },
//     {
//         title: "The creator network.",
//         collection: "Escape III",
//         price: "5.4 ETH",
//         reserve: "1.45 ETH",
//         image: "/images/auction-pic-2.jpg",
//         color: "#B9A9FB",
//     },
// ];

import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

type MainProps = {};

const Main = ({}: MainProps) => {
  const [processing, setProcessing] = useState(true);
  const [nfts, setNfts]: any = useState([]);

  useEffect(() => {
    setNfts(HolderNFTS);
    setProcessing(false);
  }, []);

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
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <h1 className={cn("hero", styles.title)}>CURATED NFTS</h1>
              <Arrow className={styles.arrow} />
            </div>
            <div className={styles.col}>
              <div className={styles.content}>
                Premier Coreum NFT Marketplace
              </div>
              {/* <Link href="/discover">
                        <a className={cn("button-empty", styles.search)}>
                            start your search
                        </a>
                    </Link> */}
            </div>
          </div>
          <div className={styles.wrapper}>
            <Swiper
              navigation={true}
              loop={false}
              modules={[Navigation, Scrollbar]}
              className="vertical-swiper"
              direction="vertical"
              scrollbar={{
                hide: true,
              }}
              speed={700}
              breakpoints={{
                320: {
                  direction: "horizontal",
                },
                1024: {
                  direction: "vertical",
                },
              }}
            >
              {renameManyObject(HolderNFTS, keysObjects).map((x, index) => (
                <SwiperSlide key={index}>
                  <Item item={x} key={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
