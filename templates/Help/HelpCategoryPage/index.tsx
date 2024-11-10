import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./HelpCategoryPage.module.sass";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Item from "./Item";

import { categories } from "@/mocks/help";

const HelpCategoryPage = () => {
    const [search, setSearch] = useState<string>("");

    return (
        <Layout layoutNoOverflow footerHide>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.wrap}>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                Gettings started on Crypter
                            </div>
                            <Link href="/help">
                                <a className={styles.back}>
                                    <Icon name="arrow-left" />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.preview}>
                            <Image
                                src="/images/help-pic-1.png"
                                layout="fill"
                                objectFit="cover"
                                alt="Figure"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <Form
                        className={styles.form}
                        placeholder="Search topics"
                        value={search}
                        setValue={setSearch}
                        onSubmit={() => console.log("Submit")}
                        buttonRight
                    />
                    {categories.map((category, index) => (
                        <Item item={category} key={index} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HelpCategoryPage;
