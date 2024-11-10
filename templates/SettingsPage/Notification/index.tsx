import { useState } from "react";
import styles from "./Notification.module.sass";
import Toggle from "@/components/Toggle";

type NotificationProps = {};

const Notification = ({}: NotificationProps) => {
    const [auction, setAuction] = useState<boolean>(false);
    const [buy, SetBuy] = useState<boolean>(true);
    const [offer, setOffer] = useState<boolean>(true);
    const [news, setNews] = useState<boolean>(true);

    const notification = [
        {
            title: "Auction notification",
            content: "Amet nesciunt voluptas quas cum sequi a pariatur harum.",
            value: auction,
            setValue: setAuction,
        },
        {
            title: "Buy now notification",
            content: "Dolorem vitae ratione aut assumenda accusamus.",
            value: buy,
            setValue: SetBuy,
        },
        {
            title: "Offer notification",
            content:
                "Qui nulla fuga omnis aperiam nostrum excepturi asperiores.",
            value: offer,
            setValue: setOffer,
        },
        {
            title: "Crypter news",
            content: "Placeat quo qui cum ea nisi optio.",
            value: news,
            setValue: setNews,
        },
    ];

    return (
        <div className={styles.notification}>
            {notification.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.details}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.content}>{item.content}</div>
                    </div>
                    <Toggle
                        className={styles.toggle}
                        value={item.value}
                        onChange={() => item.setValue(!item.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Notification;
