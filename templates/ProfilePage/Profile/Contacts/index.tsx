import Link from "next/link";
import styles from "./Contacts.module.sass";
import Icon from "@/components/Icon";

type LinksType = {
    title: string;
    icon: string;
    url: string;
};

type SocialsType = {
    icon: string;
    url: string;
};

type ContactsProps = {
    links: LinksType[];
    socials: SocialsType[];
};

const Contacts = ({ links, socials }: ContactsProps) => (
    <div className={styles.contacts}>
        <div className={styles.description}>
            <div className={styles.item}>
                <div className={styles.category}>bio</div>
                <div className={styles.content}>
                Premier Coreum NFT Marketplace 
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.category}>links</div>
                <div className={styles.links}>
                    {links.map((link, index) => (
                        <Link href={link.url} key={index}>
                            <a className={styles.link}>
                                <Icon name={link.icon} />
                                {link.title}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.socials}>
            {socials.map((social, index) => (
                <a
                    className={styles.social}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                >
                    <Icon name={social.icon} />
                </a>
            ))}
        </div>
    </div>
);

export default Contacts;
