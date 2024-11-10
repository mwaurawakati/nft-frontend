import Link from "next/link";
import cn from "classnames";
import styles from "./Articles.module.sass";
import Icon from "@/components/Icon";

const links = [
    {
        title: "Connect your wallet to Crypter",
        url: "/help/detail",
    },
    {
        title: "Guide to collection NFT artworks on Crypter",
        url: "/help/detail",
    },
    {
        title: "Marketplace balance",
        url: "/help/detail",
    },
    {
        title: "Marketplace fees",
        url: "/help/detail",
    },
    {
        title: "What is offer price?",
        url: "/help/detail",
    },
];

type ArticlesProps = {};

const Articles = ({}: ArticlesProps) => (
    <div className={styles.articles}>
        <div className={cn("h1", styles.title)}>
            Related <br></br>articles.
        </div>
        <div className={styles.links}>
            {links.map((link: any, index: number) => (
                <Link href={link.url} key={index}>
                    <a className={styles.link}>
                        <div className={styles.circle}></div>
                        {link.title}
                    </a>
                </Link>
            ))}
        </div>
    </div>
);

export default Articles;
