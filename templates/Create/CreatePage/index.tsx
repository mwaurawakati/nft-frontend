import Link from "next/link";
import cn from "classnames";
import styles from "./CreatePage.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";

const CreatPage = () => {
    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <>
                        <div className={cn("h1", styles.title)}>
                            Create on <br></br>Crypter.
                        </div>
                        <Arrow className={styles.arrow} />
                        <div className={styles.content}>
                            We are laying the groundwork for web3 — the next
                            generation of the internet full of limitless
                            possibilities. Join the millions of creators,
                            collectors, and curators who are on this journey
                            with you.
                        </div>
                    </>
                }
            >
                <div className={styles.head}>
                    <div className={styles.subtitle}>Your collection</div>
                    <div className={styles.counter}>0</div>
                </div>
                <Link href="/create/create-collection">
                    <a className={styles.add}>
                        <div className={styles.plus}></div>
                        <div className={styles.info}>Create new collection</div>
                        <div className={styles.text}>a</div>
                    </a>
                </Link>
                <div className={styles.list}>
                    {Array.from(Array(3).keys()).map((x) => (
                        <div className={styles.item} key={x}>
                            <div className={styles.preview}>
                                <Icon name="picture" />
                            </div>
                            <div className={styles.lines}></div>
                        </div>
                    ))}
                </div>
                <div className={styles.foot}>
                    <Link href="/article">
                        <a className={styles.link}>
                            Learn about Collection on Crypter
                        </a>
                    </Link>
                </div>
            </LayoutCreate>
        </Layout>
    );
};

export default CreatPage;
