import Link from "next/link";
import cn from "classnames";
import styles from "./ShareNFTPage.module.sass";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Details from "./Details";

const socials = [
    {
        icon: "twitter",
        url: "https://twitter.com/ui8",
    },
    {
        icon: "facebook",
        url: "https://www.facebook.com/ui8.net/",
    },
    {
        icon: "linkedin",
        url: "https://www.linkedin.com/company/ui8",
    },
    {
        icon: "instagram",
        url: "https://www.instagram.com/ui8net/",
    },
];

const ShareNFTPage = () => {
    return (
        <Layout
            classHeader={styles.header}
            background="#F1F4F4"
            layoutNoOverflow
            footerHide
            emptyHeader
        >
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Details />
                        </div>
                        <div className={styles.col}>
                            <div className={cn("h1", styles.title)}>
                                Share this NFT
                            </div>
                            <div className={styles.info}>
                                Share this NFT with your social Community
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
                    </div>
                    <Link href="/">
                        <a className={cn("button-circle", styles.close)}>
                            <Icon name="close-fat" />
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default ShareNFTPage;
