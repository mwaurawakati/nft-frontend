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
        image: "/images/robot.jpg",
        title: "Cute Planet",
        category: "cute",
    },
];

const links = [
    {
        title: "View on Etherscane",
        icon: "country",
        url: "https://ui8.net/",
    },
    {
        title: "View metadata",
        icon: "link",
        url: "https://ui8.net/",
    },
    {
        title: "View on IPFS",
        icon: "link",
        url: "https://ui8.net/",
    },
];

const provenance = [
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                Bid placed by <span>0x56C1...8eCC</span>
            </>
        ),
        price: "5.00 ETH",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                Listed by <span>@randomdash</span>
            </>
        ),
        price: "5.00 ETH",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                Minted by <span>@randomdash</span>
            </>
        ),
        price: "5.00 ETH",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
];

const tags = [
    "Cute",
    "Robot",
    "Cute Planet",
    "Suitcase",
    "Spaceship",
    "Animation",
    "Redshift Render",
    "3D",
    "Character",
    "Cinema 4D",
];

const MintNFTPage = () => {
    return (
        <Layout layoutNoOverflow footerHide>
            <Description
                image="/images/cute-planet-large.jpg"
                title="The Explorer"
                date="Minted on Aug 18, 2022"
                statistics={statistics}
                links={links}
                tags={tags}
                provenanceAction={{
                    avatar: "/images/avatar.jpg",
                    history: true,
                    content: (
                        <>
                            Auction won by <span>0x56C1...8eCC</span>
                        </>
                    ),
                    title: (
                        <>
                            Sold for <span>6.05 ETH</span> $9,256.58
                        </>
                    ),
                    date: "Aug 18, 2022 at 18:80",

                    linkTitle: (
                        <>
                            Auction settled by <span>@Kohaku</span>
                        </>
                    ),
                    linkUrl: "https://ui8.net/",
                }}
                provenance={provenance}
                content="Premier Coreum NFT Marketplace"
            >
                <Details />
            </Description>
        </Layout>
    );
};

export default MintNFTPage;
