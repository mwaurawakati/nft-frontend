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
                {image ? (
                    <Image
                        src={objectURL}
                        layout="fill"
                        objectFit="cover"
                        alt="Cute planet"
                    />
                ) : (
                    <>
                        <input
                            type="file"
                            className={styles.input}
                            onChange={handleUpload}
                        />
                        <div className={styles.details}>
                            <div className={styles.icon}>
                                <Icon name="upload" />
                            </div>
                            <div className={styles.info}>
                                Drag and drop to upload your NFT
                            </div>
                            <div className={styles.format}>
                                JPG, PNG, MP4. Max 50Mb
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={cn("h3", styles.title)}>{title}</div>
            <div className={styles.item}>
                <div className={styles.preview}></div>
                <div className={styles.wrap}>
                    <div className={styles.subtitle}></div>
                    <div className={styles.price}></div>
                </div>
                <div className={styles.lines}></div>
            </div>
        </div>
    );
};

export default Upload;
