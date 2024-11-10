import cn from "classnames";
import styles from "./Caption.module.sass";
import Icon from "@/components/Icon";

type CaptionProps = {
    title?: string;
    date?: string;
};

const Caption = ({ title, date }: CaptionProps) => (
    <div className={styles.caption}>
        <div className={styles.line}>
            <div className={cn("h2", styles.title)}>{title}</div>
            <div className={styles.actions}>
                <button
                    className={cn("button-circle button-medium", styles.button)}
                >
                    <Icon name="dots" />
                </button>
                <a
                    className={cn("button-circle button-medium", styles.button)}
                    href="https://ui8.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon name="share" />
                </a>
            </div>
        </div>
        {/* <div className={styles.date}>
            <Icon name="external-link" />
            {date}
        </div> */}
    </div>
);

export default Caption;
