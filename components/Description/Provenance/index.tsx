import cn from "classnames";
import styles from "./Provenance.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type ProvenanceProps = {
    action?: any;
    items: any;
    globalDetailNFT?:any;
};

const Provenance = ({ action, items, globalDetailNFT }: ProvenanceProps) => {
    console.log("::::::::::globalDetailNFT//////",globalDetailNFT)
    return (
        <div className={styles.provenance}>
            
            <div className={styles.list}>
                {items.map((item: any, index: number) => (
                    <div className={styles.item} key={index}>
                        <div className={styles.details}>
                            <div className={styles.content}>{item.content}</div>
                            <div className={styles.date}>{item.date}</div>
                        </div>
                        {item.price && (
                            <div className={styles.price}>{item.price}</div>
                        )}
                        {/* <a
                            className={styles.link}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="external-link" />
                        </a> */}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Provenance;
