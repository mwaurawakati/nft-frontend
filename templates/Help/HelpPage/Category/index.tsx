import Link from "next/link";
import cn from "classnames";
import styles from "./Category.module.sass";
import Image from "@/components/Image";

type CategoryProps = {
    item: any;
};

const Category = ({ item }: CategoryProps) => (
    <Link href={item.url}>
        <a className={styles.category}>
            <div className={styles.details}>
                <div
                    className={styles.color}
                    style={{ backgroundColor: item.color }}
                ></div>
                <div className={cn("h4", styles.title)}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
            </div>
            <div className={styles.preview}>
                <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Figure"
                />
            </div>
        </a>
    </Link>
);

export default Category;
