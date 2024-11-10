import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Profile from "./Profile";

const PrfilePage = () => {
    return (
        <Layout layoutNoOverflow lightHeader footerHide>
            <Background image="/images/background-1.jpg" />
            <Profile />
        </Layout>
    );
};

export default PrfilePage;
