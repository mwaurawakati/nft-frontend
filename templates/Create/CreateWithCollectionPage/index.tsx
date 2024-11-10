import Link from "next/link";
import cn from "classnames";
import styles from "./CreateWithCollectionPage.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Arrow from "@/components/Arrow";
import Image from "@/components/Image";

// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
// import ButtonPrimary from "components/Button/ButtonPrimary";
import {
  changeCollectionList,
  selectConllectionList,
} from "@/utils/api/reducers/collection.reducers";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import {
  selectCurrentNetworkSymbol,
  selectCurrentUser,
} from "@/utils/api/reducers/auth.reducers";
import CollectionCard from "@/utils/Card/CollectionCard";
import { useSigningClient } from "@/utils/api/cosmwasm";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import { getCollectionList, removeOne } from "@/utils/api/api/collections";
import { useEffect, useState } from "react";
// import MainSection from "components/Section/MainSection";

const list = [
  {
    title: "Cute Planet",
    price: "4 NFT",
    image: "/images/cute-planet.jpg",
    url: "/collection",
  },
  {
    title: "Escape",
    price: "12 NFT",
    image: "/images/escape.jpg",
    url: "/collection",
  },
];

const CreatPage = () => {
  // const [processing, setProcessing] = useState(true);
  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const currentUsr = useAppSelector(selectCurrentUser);
  const collections: any = useAppSelector(selectConllectionList);
  const { removeCollection } = useSigningClient();
  const dispatch = useAppDispatch();
  // const history = useNavigate();
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const fetchCollections = async (limit: any, currentUserId: any) => {
    setWorking(true);
    try {
      const response = await getCollectionList(
        limit,
        currentUserId,
        currentNetworkSymbol
      );
      const colData = response.data || [];
      dispatch(changeCollectionList(colData));
    } catch (err) {
      console.log(err);
    } finally {
      setWorking(false);
    }
  };

  useEffect(() => {
    fetchCollections(90, currentUsr._id);
  }, [currentUsr._id]);

  // useEffect(() => {
  //   console.log("////collections", collections);
  //   if (collections?.length > 0) setProcessing(false);
  // }, [collections]);

  const createNewCollection = () => {
    router.push("/createCollection");
  };

  const handleRemove = (_id: any, collectionNumber: any) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to remove the collection?",
      showCancelButton: true,
    }).then(async (res) => {
      if (!res.isConfirmed) return;
      setWorking(true);
      try {
        const resp = await removeCollection(
          currentUsr?.address,
          collectionNumber
        );
        if (resp !== -1) {
          await removeOne(_id);
          fetchCollections(90, currentUsr._id);
          setWorking(false);
          toast.success("Successfully removed the collection");
        }
      } catch (err) {
        setWorking(false);
        console.log(err);
      }
    });
  };

  return (
    <>
      {working ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={working}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Layout layoutNoOverflow footerHide emptyHeader>
          <LayoutCreate
            left={
              <>
                <div className={cn("h1", styles.title)}>
                  Create on <br></br>Rizenfts.
                </div>
                <Arrow className={styles.arrow} />
                <div className={styles.content}>
                  Premier Coreum NFT Marketplace
                </div>
              </>
            }
          >
            <div className={styles.head}>
              <div className={styles.subtitle}>My collections</div>
              <div className={styles.counter}>{collections?.length || 0}</div>
            </div>
            <Link href="/create/create-collection">
              <a className={styles.add}>
                <div className={styles.plus}></div>
                Create new collection
              </a>
            </Link>
            <div className={styles.list}>
              {/* {list.map((item, index) => (
                        <Link href={item.url} key={index}>
                            <a className={styles.item}>
                                <div className={styles.preview}>
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="NFTs"
                                    />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.info}>
                                        {item.title}
                                    </div>
                                    <div className={styles.price}>
                                        {item.price}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))} */}

              {collections && collections.length > 0
                ? collections.map((x: any, index: any) => {
                    return (
                      <CollectionCard
                        className={styles.card}
                        collection={x}
                        key={"collectoinCard" + index}
                        onRemove={handleRemove}
                      />
                    );
                  })
                : null}
            </div>
            <div className={styles.foot}>
              <Link href="/">
                <a className={styles.link}>
                  Learn about Collection on Rizenfts
                </a>
              </Link>
            </div>
          </LayoutCreate>
        </Layout>
      )}
    </>
  );
};

export default CreatPage;
