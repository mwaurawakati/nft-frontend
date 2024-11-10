import Layout from "@/components/Layout";
import Main from "@/components/Main";
import Detail from "./Detail";
import Articles from "./Articles";

import { detail } from "@/mocks/help";

const breadcrumbs = [
    {
        title: "Help center",
        url: "/help",
    },
    {
        title: "Buying",
    },
];

const HelpDetailPage = () => {
    return (
        <Layout layoutNoOverflow>
            <Main
                classTitle="h1"
                image="/images/help-detail.jpg"
                title="Guide to collection NFT artworks on Crypter"
                breadcrumbs={breadcrumbs}
            />
            <Detail detail={detail} />
            <Articles />
        </Layout>
    );
};

export default HelpDetailPage;
