import cn from "classnames";
import styles from "./Notifications.module.sass";
import Image from "@/components/Image";
import Follow from "@/components/Follow";
import Spinner from "@/components/Spinner";
import { config } from "@/utils/api/config";

type ItemsType = {
    content: any;
    avatar: string;
    date: string;
    // follow: boolean;
};

type NotificationsType = {
    month: string;
    items: ItemsType[];
};

type NotificationsProps = {
    items: NotificationsType[];
};

const Notifications = ({ items }: NotificationsProps) => {

    // console.log("::::::::",items)

    return (
        <div className={styles.notifications}>
            <div className={cn("h3", styles.title)}>Notification</div>
            {items[0].items  && 
            <div className={styles.list}>
            {items.map((x, index) => (
                <div className={styles.box} key={index}>
                    {/* <div className={styles.month}>{x.month}</div> */}
                    <div className={styles.group}>
                        {x.items.map((item, index) => {
                            return (
                                <div className={styles.item} key={index}>
                                   <div className={styles.avatar}>
                                        <Image
                                            src={`${config.UPLOAD_URL}uploads/${item.imgUrl}`}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className={styles.details}>
                                        <div className={styles.content}>
                                            {item.description}
                                        </div>
                                        <div className={styles.date}>
                                            {item.date}
                                        </div>
                                    </div> 
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
        }
            <Spinner />
        </div>
    )
};

export default Notifications;
