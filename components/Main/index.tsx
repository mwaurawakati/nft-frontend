import Link from "next/link";
import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "@/components/Image";

type MainProps = {
    classTitle: string;
    image: string;
    title: string;
    info?: string;
    breadcrumbs?: any;
};

const Main = ({ classTitle, image, title, info, breadcrumbs }: MainProps) => (
    <div className={styles.main}>
        <Image src={image} layout="fill" objectFit="cover" alt="Cover" />
        <div className={styles.wrap}>
            <div className={cn(classTitle, styles.title)}>{title}</div>
            {info && <div className={cn("h4", styles.info)}>{info}</div>}
            {breadcrumbs && (
                <div className={styles.breadcrumbs}>
                    {breadcrumbs.map((item: any, index: number) =>
                        item.url ? (
                            <Link href={item.url} key={index}>
                                <a className={styles.link}>{item.title}</a>
                            </Link>
                        ) : (
                            <div className={styles.link} key={index}>
                                {item.title}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    </div>
);

export default Main;
