import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import TimeCounter from "@/components/TimeCounter";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => (
    <div className={styles.preview}>
        <div className={styles.image}>
            <Image
                src="/images/main-pic-1.jpg"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                alt="Logo"
            />
        </div>
        <div className={styles.head}>
            <div className={cn("h3", styles.title)}>Escape</div>
            <TimeCounter
                className={styles.timer}
                classTimerItem={styles.timerItem}
                classTimerValue={styles.timerValue}
                classTimerText={styles.timerText}
                time={20}
                abbreviated
            />
        </div>
        <div className={styles.foot}>
            <div className={styles.item}>
                <div className={styles.photo}>
                    <Image
                        src="/images/cute-planet.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Cute Planet"
                    />
                </div>
                <div className={styles.details}>
                    <div className={styles.subtitle}>Cute Planet</div>
                    <div className={styles.crypto}>12 NFTs</div>
                </div>
            </div>
            <div className={styles.lines}>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
);

export default Preview;
