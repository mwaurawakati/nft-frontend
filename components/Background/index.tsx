import styles from "./Background.module.sass";
import Image from "@/components/Image";

type BackgroundProps = {
    image: any;
};

const Background = ({ image }: BackgroundProps) => (
    <div className={styles.background}>
        <Image src={image} layout="fill" objectFit="cover" alt="Background" />
    </div>
);

export default Background;
