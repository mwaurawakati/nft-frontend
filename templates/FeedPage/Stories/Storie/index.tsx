import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Storie.module.sass";
import Image from "@/components/Image";
import Modal from "@/components/Modal";

type StoriesType = {
    author: string;
    login: string;
    avatar: string;
    gallery: Array<string>;
};

type StorieProps = {
    item: string;
    stories: StoriesType[];
};

import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Storie = ({ item, stories }: StorieProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <button className={styles.storie} onClick={() => setVisible(true)}>
                <span className={styles.image}>
                    <Image
                        src={item}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </span>
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                containerClassName={styles.container}
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <div className={styles.wrapper}>
                    <Swiper
                        navigation={true}
                        slidesPerView={3}
                        loop={true}
                        centeredSlides={true}
                        modules={[Navigation]}
                        className="stories-swiper"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {stories.map((story, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.box}>
                                    <div className={styles.author}>
                                        <div className={styles.avatar}>
                                            <Image
                                                src={story.avatar}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="Story"
                                            />
                                        </div>
                                        <div className={styles.details}>
                                            <div className={styles.name}>
                                                {story.author}
                                            </div>
                                            <div className={styles.login}>
                                                @{story.login}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.inner}>
                                        <Swiper
                                            navigation={false}
                                            modules={[Navigation, Pagination]}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            className="stories-inner-swiper"
                                        >
                                            {story.gallery.map(
                                                (image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div
                                                            className={
                                                                styles.preview
                                                            }
                                                        >
                                                            <Image
                                                                src={image}
                                                                layout="fill"
                                                                objectFit="cover"
                                                                alt="Story"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Modal>
        </>
    );
};

export default Storie;
