import cn from "classnames";
import styles from "./Article.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

const socials = [
    {
        title: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com/ui8net/",
    },
    {
        title: "Twitter",
        icon: "twitter",
        url: "https://twitter.com/ui8",
    },
    {
        title: "Facebook",
        icon: "facebook",
        url: "https://www.facebook.com/ui8.net/",
    },
];

type ArticleProps = {};

const Article = ({}: ArticleProps) => (
    <div className={styles.article}>
        <div className={cn("content", styles.content)}>
            <h3>Introducing CrypterOS the operating system for web3.</h3>
            <h5>
                Web3 is the next evolution of the internet built on open
                infrastructure where information, code, and objects are free to
                travel.
            </h5>
            <p>
            Premier Coreum NFT Marketplace
            </p>
            <p>
                Ratione earum minus quia consectetur debitis magnam. Ex nemo
                maiores reiciendis distinctio. Cupiditate nihil doloribus
                repellat voluptatem.
            </p>
            <p>
                Et id possimus harum ipsa eum odit labore. Eligendi repellat
                impedit eaque corporis dolor ipsam vero. Vitae beatae aperiam
                consequatur consequatur praesentium minus sequi magni.
            </p>
            <p>
                Et neque dolor velit aliquid earum reiciendis sequi harum.
                Laudantium et doloremque deleniti quaerat. Dolorem molestias
                doloribus. Non non laboriosam ut assumenda vel aut sequi.
            </p>
        </div>
        <div className={styles.photo}>
            <Image
                src="/images/content-pic-1.jpg"
                width={1440}
                height={848}
                alt="Content"
            />
        </div>
        <div className={cn("content", styles.content)}>
            <h3>Introducing CrypterOS the operating system for web3.</h3>
            <h5>
                Web3 is the next evolution of the internet built on open
                infrastructure where information, code, and objects are free to
                travel.
            </h5>
            <figure>
                <Image
                    src="/images/content-pic-2.jpg"
                    width={960}
                    height={600}
                    alt="Content"
                />
            </figure>
            <p>
            Premier Coreum NFT Marketplace
            </p>
            <p>
                Ratione earum minus quia consectetur debitis magnam. Ex nemo
                maiores reiciendis distinctio. Cupiditate nihil doloribus
                repellat voluptatem.
            </p>
            <p>
                Et id possimus harum ipsa eum odit labore. Eligendi repellat
                impedit eaque corporis dolor ipsam vero. Vitae beatae aperiam
                consequatur consequatur praesentium minus sequi magni.
            </p>
            <p>
                Et neque dolor velit aliquid earum reiciendis sequi harum.
                Laudantium et doloremque deleniti quaerat. Dolorem molestias
                doloribus. Non non laboriosam ut assumenda vel aut sequi.
            </p>
            <ul>
                <li>Connect your wallet to Crypter</li>
                <li>Guide to collection NFT artworks on Crypter</li>
                <li>Marketplace balance</li>
                <li>Marketplace fees</li>
                <li>What is offer price?</li>
            </ul>
        </div>
        <div className={styles.share}>
            <div className={styles.info}>share this post</div>
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
                        {social.title}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

export default Article;
