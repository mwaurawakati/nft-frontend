import Link from "next/link";
import cn from "classnames";
import styles from "./CreateNFT.module.sass";
import Icon from "@/components/Icon";

type CreateNFTProps = {};

const CreateNFT = ({}: CreateNFTProps) => (
    <>
        <div className={styles.create}>
            <div className={styles.box}>
                <div className={cn("h4", styles.title)}>
                    Create your first NFT
                </div>
                <div className={styles.text}>
                    This collection is empty, get it started by minting your
                    first artwork
                </div>
                <Link href="/mint-nft">
                    <a
                        className={cn(
                            "button-white button-large",
                            styles.button
                        )}
                    >
                        <span>mint nft</span>
                        <Icon name="plus" />
                    </a>
                </Link>
            </div>
            <Link href="/article">
                <a className={styles.link}>How to mint an NFT?</a>
            </Link>
        </div>
    </>
);

export default CreateNFT;
