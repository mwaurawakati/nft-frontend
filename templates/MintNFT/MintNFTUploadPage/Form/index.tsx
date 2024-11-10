import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./Form.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type FormProps = {
    title: string;
    setTitle: any;
    description: string;
    setDescription: any;
};

const Form = ({ title, setTitle, description, setDescription }: FormProps) => {
    const router = useRouter();
    return (
        <form
            className={styles.form}
            action=""
            onSubmit={() => console.log("Submit")}
        >
            <div className={styles.head}>
                <div className={cn("h1", styles.title)}>Mint NFT</div>
                <button
                    className={cn("button-circle", styles.back)}
                    onClick={() => router.back()}
                    type="button"
                >
                    <Icon name="arrow-left" />
                </button>
            </div>
            <div className={styles.info}>
                Deploy a smart contract to showcase a series of NFT artworks.
            </div>
            <Field
                className={styles.field}
                placeholder="NFT title"
                icon="edit"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                large
                required
            />
            <Field
                className={styles.field}
                placeholder="Description"
                icon="edit"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                textarea
                large
                required
            />
            <div className={styles.box}>
                <div className={styles.category}>Collection</div>
                <div className={styles.collection}>
                    <div className={styles.preview}>
                        <Image
                            src="/images/balls.jpg"
                            layout="fill"
                            objectFit="cover"
                            alt="Balls"
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.subtitle}>Escape</div>
                        <div className={styles.price}>12 NFTs</div>
                    </div>
                    <div className={styles.check}>
                        <Icon name="check" />
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                <Link href="/mint-nft/preview-mode">
                    <a
                        className={cn(
                            "button-stroke-grey button-large",
                            styles.button
                        )}
                    >
                        Preview
                    </a>
                </Link>
                <Link href="/mint-nft/congrats">
                    <a className={cn("button-large", styles.button)}>
                        <span>Mint</span>
                        <Icon name="arrow-right" />
                    </a>
                </Link>
            </div>
        </form>
    );
};

export default Form;
