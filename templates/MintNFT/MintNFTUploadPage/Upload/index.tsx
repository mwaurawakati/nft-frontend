import { useState } from "react";
import cn from "classnames";
import styles from "./Upload.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type UploadProps = {
    title: string;
};

const Upload = ({ title }: UploadProps) => {
    const [objectURL, setObjectURL] = useState<any>(null);
    const [image, setImage] = useState<string>("");

    const handleUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setImage(file);
            setObjectURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.upload}>
            <div className={cn("h3", styles.stage)}>Upload your NFT</div>
            <div className={styles.file}>
                <Image
                    src="/images/main-pic-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Cute planet"
                />
            </div>
            <div className={cn("h3", styles.title)}>{title}</div>
            <div className={styles.item}>
                <div className={styles.preview}>
                    <Image
                        src="/images/cute-planet-1.png"
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
