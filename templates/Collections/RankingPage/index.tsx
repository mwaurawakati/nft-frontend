import Layout from "@/components/Layout";
import Artists from "./Artists";

const HomePage = () => {
    return (
        <Layout layoutNoOverflow footerHide>
            <Artists />
        </Layout>
    );
};

export default HomePage;
