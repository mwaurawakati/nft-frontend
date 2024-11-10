import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "./Details";

const statistics = [
    {
        label: "Created by",
        avatar: "/images/avatar.jpg",
        history: true,
        title: "Dash",
        login: "randomdash",
    },
    {
        label: "Collection",
        image: "/images/balls.jpg",
        title: "Cute Planet",
        category: "cute",
    },
];

const MintNFTPage = () => {
    return (
        <Layout layoutNoOverflow headerHide footerHide>
            <Description
                exit
                image="/images/main-pic-1.jpg"
                title="Escape"
                date="Minted on Aug 18, 2022"
                statistics={statistics}
                content={
                    <>
                        <p>
                            We are laying the groundwork for web3 — the next
                            generation of the internet full of limitless
                            possibilities. Join the millions of creators,
                            collectors, and curators who are on this journey.
                        </p>
                        <p>Official website: ui8.net</p>
                    </>
                }
            >
                <Details />
            </Description>
        </Layout>
    );
};

export default MintNFTPage;
