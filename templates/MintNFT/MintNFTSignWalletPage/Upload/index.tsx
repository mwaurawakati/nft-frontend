import cn from "classnames";
import styles from "./Upload.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type UploadProps = {};

const Upload = ({}: UploadProps) => {
    return (
        <div className={styles.upload}>
            <div className={cn("h3", styles.stage)}>Preview</div>
            <div className={styles.file}>
                <Image
                    src="/images/main-pic-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Cute planet"
                />
            </div>
            <div className={cn("h3", styles.title)}>Escape</div>
            <div className={styles.item}>
                <div className={styles.preview}>
                    <Image
                        src="/images/balls.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Cute planet"
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.subtitle}>Cute Planet</div>
                    <div className={styles.price}>12 NFTs</div>
                </div>
                <div className={styles.lines}></div>
            </div>
        </div>
    );
};

export default Upload;
