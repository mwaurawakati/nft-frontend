import { useState } from "react";
import cn from "classnames";
import styles from "./AddStory.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type AddStoryProps = {};

const AddStory = ({}: AddStoryProps) => {
    const [objectURL, setObjectURL] = useState<any>(null);
    const [image, setImage] = useState<boolean>(false);

    const handleUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setImage(file);
            setObjectURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.add}>
            <div className={styles.inner}>
                {image ? (
                    <Image
                        src={objectURL}
                        layout="fill"
                        objectFit="cover"
                        alt="Story"
                    />
                ) : (
                    <>
                        <input
                            className={styles.input}
                            type="file"
                            onChange={handleUpload}
                        />
                        <div className={styles.details}>
                            <div className={styles.icon}>
                                <Icon name="upload-alt" />
                            </div>
                            <div className={cn("h4", styles.title)}>
                                Drag & drop to upload
                            </div>
                            <div className={styles.text}>
                                <p>
                                    Quickly share your work in progress with
                                    your followers. It will be appeared in their
                                    feed.
                                </p>
                                <p>Maximum: 4 images.</p>
                            </div>
                        </div>
                    </>
                )}
                <button className={cn("button-white", styles.button)}>
                    <span>share your story</span>
                    <Icon name="arrow-right-thin" />
                </button>
            </div>
        </div>
    );
};

export default AddStory;
