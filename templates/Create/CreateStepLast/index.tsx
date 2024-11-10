import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep2Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
// import Field from "@/components/Field";
import Preview from "./Preview";

const CreatPage = () => {
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");

    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <>
                    <div className={styles.head}>
                        <div className={cn("h1", styles.title)}>
                            Deploy your smart contract
                        </div>
                        <Link href="/create/step-1">
                            <a className={cn("button-circle", styles.back)}>
                                <Icon name="arrow-left" />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.info}>
                        Approve the transaction in your wallet
                    </div>
                    <div className={styles.content}>
                        Deploying a smart contract means that your
                        collection will be added to the blockchain. Anytime
                        you interact with the blockchain, you’ll need to
                        approve the transaction and pay a gas fee to the
                        network.{" "}
                    </div>
                    <Link href="/create/congrats">
                        <a className={cn("button-large", styles.button)}>
                            <span>deploy your contract</span>
                            <Icon name="arrow-right" />
                        </a>
                    </Link>
                    </>
                }
            >
                <Preview />
            </LayoutCreate>
        </Layout>
    );
};

// ::::::::::::::::::::::::::::::::::::::::::: Left section only for the create page
interface CreateLeftLastProps {
    onChangeStep: (newStep: number) => void;
    onSubmit: () => void;
}

export const CreateLeftLast: React.FC<CreateLeftLastProps> = ({ onChangeStep, onSubmit }) => {
    const handleSubmit = () => {
        onSubmit();
    }

    return (
        <>
        <div className={styles.head}>
            <div className={cn("h1", styles.title)}>
                Deploy your smart contract
            </div>
            <button onClick={()=>onChangeStep(3)} className={cn("button-circle", styles.back)}>
                <Icon name="arrow-left" />
            </button>
        </div>
        <div className={styles.info}>
            Approve the transaction in your wallet
        </div>
        <div className={styles.content}>
            Deploying a smart contract means that your
            collection will be added to the blockchain. Anytime
            you interact with the blockchain, you’ll need to
            approve the transaction and pay a gas fee to the
            network.{" "}
        </div>
        
        {/* :::::::::::::::  SUBMIT BUTTON */}
        <button 
            className={cn("button-large", styles.button)} 
            onClick={handleSubmit}
        >
            <span>deploy your contract</span>
            <Icon name="arrow-right" />
        </button>
        </>
    )
}

export default CreatPage;
