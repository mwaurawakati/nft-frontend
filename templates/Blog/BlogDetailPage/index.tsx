import Layout from "@/components/Layout";
import Main from "@/components/Main";
import Article from "./Article";
import BlogList from "./BlogList";
import Newsletter from "@/components/Newsletter";

import { blogSlider } from "@/mocks/blog";

const BlogDetailPage = () => {
    return (
        <Layout layoutNoOverflow>
            <Main
                classTitle="h1"
                image="/images/blog-detail.jpg"
                title="8 things you didn't know you could do on Crypter"
                info="Crypter NFT marketplace blog"
            />
            <Article />
            <BlogList items={blogSlider} />
            <Newsletter />
        </Layout>
    );
};

export default BlogDetailPage;
