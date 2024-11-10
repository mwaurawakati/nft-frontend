import Link from "next/link";
import type { NextPage } from "next";

const links = [
  { href: "/", label: "Home page" },
  { href: "/profile", label: "Profile page" },
  { href: "/notification", label: "Notification page" },
  { href: "/discover", label: "Discover page" },
  { href: "/feed", label: "Feed page" },
  { href: "/discover/ranking", label: "Ranking page" },
  { href: "/create", label: "Create (no collection) page" },
  { href: "/create/with-collection", label: "Create (collection available) page" },
  //   { href: "/create/step-1", label: "Create (step 1) page" },
  //   { href: "/create/step-2", label: "Create (step 2) page" },
  { href: "/create/create-collection", label: "Create Collection in steps ::::: Chocho on this" },
  { href: "/create/congrats", label: "Create congrats page" },
  { href: "/collection-first-view", label: "Collection first view page" },
  { href: "/collection", label: "Collection details page" },
  { href: "/mint-nft", label: "Mint NFT placeholder page" },
  { href: "/mint-nft/upload", label: "Mint NFT upload page" },
  { href: "/mint-nft/preview-mode", label: "Mint NFT preview mode page" },
  { href: "/mint-nft/sign-wallet", label: "Mint NFT sign wallet page" },
  { href: "/mint-nft/congrats", label: "Mint NFT congrats page" },
  { href: "/share-nft", label: "Share NFT page" },
  { href: "/set-price", label: "Set price page" },
  { href: "/settings", label: "Settings page" },
  { href: "/buy-now/1", label: "Buy now page" },
  { href: "/place-a-bid", label: "Place a bid page" },
  { href: "/make-offer", label: "Make offer page" },
  { href: "/congrats", label: "Congrats page" },
  { href: "/help", label: "Help center page" },
  { href: "/help/category", label: "Help center (category) page" },
  { href: "/help/detail", label: "Help center (detail) page" },
  { href: "/blog", label: "Blog page" },
  { href: "/blog/detail", label: "Blog (detail) page" },
  { href: "/nft", label: "NFT detail page" },
  { href: "/nft/current-bid", label: "NFT detail (current bid) page" },
  { href: "/nft-detail", label: "NFT Detail page" }
];

const Home: NextPage = () => {
  return (
    <div style={{ padding: 40 }}>
      {links.map(({ href, label }) => (
        <div key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
