import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Main.module.sass";
import Slide from "./Slide";

import { discover } from "@/mocks/discover";

import { EffectFade, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type MainProps = {
    scrollToRef: any;
};

const Main = ({ scrollToRef }: MainProps) => {
    return (
        <div className={styles.main} ref={scrollToRef}>
            <Swiper
                navigation={true}
                loop={true}
                effect={"fade"}
                modules={[EffectFade, Navigation]}
                className="discover-swiper"
            >
                {discover.map((x, index) => (
                    <SwiperSlide key={index}>
                        <Slide item={x} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Main;
