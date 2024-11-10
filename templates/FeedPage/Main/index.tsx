import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Arrow from "@/components/Arrow";
import Item from "./Item";

const list = [
    {
        title: "Escape",
        image: "/images/main-pic-2.jpg",
        photo: "/images/balls.jpg",
        category: "ESCP",
        login: "randomdash",
        avatar: "/images/artists/artist-3.jpg",
        url: "/collection",
    },
    {
        title: "Escape II",
        image: "/images/main-pic-1.jpg",
        photo: "/images/avatar-1.jpg",
        category: "ESCP",
        login: "tranmautritam",
        avatar: "/images/artists/artist-4.jpg",
        color: "#BCE6EC",
        url: "/collection",
    },
    {
        title: "Escape",
        image: "/images/auction-pic-2.jpg",
        photo: "/images/cute-planet.jpg",
        category: "ESCP",
        login: "moyoshiro",
        avatar: "/images/artists/artist-5.jpg",
        color: "#DBFF73",
        url: "/collection",
    },
];

import { Navigation } from "swiper";
import "swiper/css/navigation";

type MainProps = {};

const Main = ({}: MainProps) => (
    <>
        <div className={styles.row}>
            <div className={styles.wrap}>
                <h1 className={cn("hero", styles.title)}>
                    Curated <br></br>Artwork.
                </h1>
                <Arrow className={styles.arrow} color="#DBFF73" />
            </div>
            <div className={styles.box}>
                <div className={cn("h4", styles.info)}>Price from</div>
                <div className={cn("h2", styles.price)}>1.00 ETH</div>
            </div>
        </div>
        <div className={styles.wrapper}>
            <Swiper
                navigation={true}
                loop={true}
                modules={[Navigation]}
                className="vertical-swiper"
                direction="vertical"
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
                {list.map((x, index) => (
                    <SwiperSlide key={index}>
                        <Item item={x} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>
);

export default Main;
