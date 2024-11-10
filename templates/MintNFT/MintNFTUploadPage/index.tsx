import { useState } from "react";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Form from "./Form";
import Upload from "./Upload";

const MintNFTPage = () => {
    const [title, setTitle] = useState<string>("The Explorer");
    const [description, setDescription] = useState<string>(
        "Premier Coreum NFT Marketplace"
    );

    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <Form
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                    />
                }
            >
                <Upload title={title} />
            </LayoutCreate>
        </Layout>
    );
};

export default MintNFTPage;
