import styles from "./Links.module.sass";
import Icon from "@/components/Icon";

type LinksProps = {
    items?: any;
};

const Links = ({ items }: LinksProps) => (
    <div className={styles.links}>
        {items.map((item: any, index: number) => (
            <a
                className={styles.link}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
            >
                <Icon name={item.icon} />
                {item.title}
            </a>
        ))}
    </div>
);

export default Links;
