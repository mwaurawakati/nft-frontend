import Link from "next/link";
import cn from "classnames";
import styles from "./Slide.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import TimeCounter from "@/components/TimeCounter";

type SlideProps = {
    item: any;
};

const Slide = ({ item }: SlideProps) => {
    // console.log("::::slide item", item)
    return (
        <div className={styles.slide}>
            <Image src={item.image} layout="fill" objectFit="cover" alt="Slide" />
            <div className={styles.row}>
                <div className={styles.details}>
                    <div className={styles.head}>
                        {/* <div className={cn("h1", styles.title)}>{item.title}</div> */}
                        <div className={styles.author}>
                            <div className={styles.avatar}>
                                <Image
                                    src={item.avatar}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Avatar"
                                />
                            </div>
                            @{item.login}
                        </div>
                    </div>
                    {/* <div className={styles.btns}>
                        <Link href="/nft">
                            <a className={cn("button-stroke-white", styles.button)}>
                                <span>View NFT</span>
                                <Icon name="arrow-right" />
                            </a>
                        </Link>
                        <Link href="/place-a-bid">
                            <a className={cn("button-white", styles.button)}>
                                place a bid
                            </a>
                        </Link>
                    </div> */}
                </div>
                <div className={styles.box}>
                    <div className={styles.info}>Auction ends in</div>
                    <TimeCounter
                        className={styles.timer}
                        classTimerItem={styles.timerItem}
                        classTimerValue={styles.timerValue}
                        classTimerText={styles.timerText}
                        time={item.time}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slide;
