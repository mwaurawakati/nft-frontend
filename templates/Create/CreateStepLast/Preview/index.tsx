import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => (
    <>
        <div className={styles.title}>Preview</div>
        <div className={styles.preview}>
            <Image
                src="/images/create-preview.jpg"
                layout="fill"
                objectFit="cover"
                alt="Prreview"
            />
            <div className={styles.image}>
                <Image
                    src="/images/create-image.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Prreview"
                />
            </div>
            <div className={styles.category}>CUTE</div>
        </div>
        <div className={styles.head}>
            <div className={cn("h4", styles.subtitle)}>Cute Planet</div>
            <div className={styles.price}>0 NFT</div>
        </div>
    </>
);

export default Preview;
