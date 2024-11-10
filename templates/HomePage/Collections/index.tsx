import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./Collections.module.sass";
import Collection from "./Collection";

import { curatedCollections } from "@/mocks/collections";
import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { renameManyObject } from "@/utils/api/methods";
import { HolderCollections } from "@/mocks/HolderCollections";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

type CollectionsProps = {};

const Collections = ({}: CollectionsProps) => {
  const [processing, setProcessing]: any = useState(true);
  const [collection, setCollection]: any = useState([]);

  useEffect(() => {
    setCollection(HolderCollections);
    setProcessing(false);
  }, []);
  return (
    <div className={styles.collections}>
      {processing ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className={cn("h1", styles.title)}>Curated collections.</div>
          <div className={styles.wrapper}>
            <Swiper
              navigation={true}
              slidesPerView="auto"
              effect={"fade"}
              scrollbar={{
                hide: true,
              }}
              modules={[Navigation, Scrollbar]}
              className="collections-swiper"
            >
              {collection.map((collection: any, index: any) => (
                <SwiperSlide key={index}>
                  <Collection item={collection} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Collections;
