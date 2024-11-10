import { useState } from "react";
import styles from "./AddCollectionCover.module.sass";
import Background from "@/components/Background";

type AddCollectionCoverProps = {
    image?: any;
    setImage?: any;
};

const AddCollectionCover = ({ image, setImage }: AddCollectionCoverProps) => {
    const [objectURL, setObjectURL] = useState<any>(null);

    const handleUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setImage(file);
            setObjectURL(URL.createObjectURL(file));
        }
    };

    return image ? (
        <Background image={objectURL} />
    ) : (
        <div className={styles.cover}>
            <input
                className={styles.file}
                type="file"
                onChange={handleUpload}
            />
            <div className={styles.details}>
                <div className={styles.title}>
                    Drag and Drop to upload collection cover
                </div>
                <div className={styles.info}>JPG, PNG. Max 5MB</div>
            </div>
        </div>
    );
};

export default AddCollectionCover;
