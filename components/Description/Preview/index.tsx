import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type PreviewProps = {
    image: string;
    alt: string;
};

const Preview = ({ image, alt }: PreviewProps) => {
    return (
        <div className={styles.preview}>
            <Image src={image} layout="fill" objectFit="cover" alt={alt} />
            <div className={styles.actions}>
                <button className={styles.action}>
                    <Icon name="music" />
                </button>
                <button className={styles.action}>
                    <Icon name="full-view" />
                </button>
            </div>
        </div>
    )
};

export default Preview;
