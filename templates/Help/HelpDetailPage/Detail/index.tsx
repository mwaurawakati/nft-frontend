import cn from "classnames";
import styles from "./Detail.module.sass";
import Image from "@/components/Image";

type DetailProps = {
    detail: any;
};

const Detail = ({ detail }: DetailProps) => (
    <div className={styles.detail}>
        {detail.map((item: any, index: number) => (
            <div className={styles.item} key={index}>
                <div className={styles.preview}>
                    <Image
                        src={item.image}
                        width={480}
                        height={540}
                        alt="Detail"
                    />
                </div>
                <div className={cn("content", styles.content)}>
                    {item.content}
                </div>
            </div>
        ))}
    </div>
);

export default Detail;
