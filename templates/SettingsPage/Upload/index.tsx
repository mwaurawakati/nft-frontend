import { useState } from "react";
import cn from "classnames";
import styles from "./Upload.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type UploadProps = {};

const Upload = ({}: UploadProps) => {
    const [objectURL, setObjectURL] = useState<any>(
        "/images/cute-planet-1.png"
    );

    const handleUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // setImage(file);
            setObjectURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.upload}>
            <div className={styles.preview}>
                {objectURL !== null && (
                    <>
                        <button
                            className={styles.close}
                            onClick={() => setObjectURL(null)}
                        >
                            <Icon name="close" />
                        </button>
                        <Image
                            // src={objectURL}
                            src={`https://stakecoreum.com/uploads/2222c0513da4a5d8cabfd05113717c99.png`}
                            layout="fill"
                            objectFit="cover"
                            alt="Upload"
                        />
                    </>
                )}
            </div>
            <div className={styles.details}>
                <div className={cn("h4", styles.title)}>Profile photo</div>
                <div className={styles.content}>
                    We recommended an image of at least 800x800. Gifs work too.
                </div>
                <div className={styles.file}>
                    <input
                        className={styles.input}
                        type="file"
                        onChange={handleUpload}
                    />
                    <button
                        className={cn(
                            "button-stroke-grey button-medium",
                            styles.button
                        )}
                    >
                        upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
