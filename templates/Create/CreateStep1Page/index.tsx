import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from '../Preview';
import { useDispatch, useSelector } from "react-redux";
import {
  updateCollectionName,
  updateCollectionDescription,
} from "@/utils/api/reducers/create.collection.reducers";

const cl = console.log.bind(console);

const CreatePage = (props: any) => {
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");

  return (
    <Layout layoutNoOverflow footerHide emptyHeader>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Create a <br></br>Collection.
              </div>
              <Link href="/create">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>
              Deploy a smart contract to showcase a series of NFT artworks.
            </div>
            <form
              className={styles.form}
              action=""
              onSubmit={() => console.log("Submit")}
            >
              <Field
                className={styles.field}
                placeholder="Collection name"
                icon="profile"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Collection symbol"
                icon="email"
                type="email"
                value={symbol}
                onChange={(e: any) => setSymbol(e.target.value)}
                large
                required
              />
              <Link href="/create/step-2">
                <a className={cn("button-large", styles.button)}>
                  <span>Continue</span>
                  <Icon name="arrow-right" />
                </a>
              </Link>
            </form>
          </>
        }
      >
        <Preview />
      </LayoutCreate>
    </Layout>
  );
};

interface CreateLeft1Props {
  onChangeStep: (newStep: number) => void;
}

export const CreateLeft1: React.FC<CreateLeft1Props> = ({ onChangeStep }) => {
  const createCollectionDetails = useSelector((state: any) => state.createCollection);
  const dispatch = useDispatch();

  const [name, setName] = useState(createCollectionDetails.name);
  const [description, setDescription] = useState(createCollectionDetails.description);

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onChangeStep(2); // Move to next step
    dispatch(updateCollectionName(name));
    dispatch(updateCollectionDescription(description));
  };

  return (
    <>
      <div className={styles.head}>
        <div className={cn("h1", styles.title)}>
          Create a <br></br>Collection.
        </div>
        <button
          onClick={() => onChangeStep(1)}
          className={cn("button-circle", styles.back)}
        >
          <Icon name="arrow-left" />
        </button>
      </div>
      <div className={styles.info}>
        Deploy a smart contract to showcase a series of NFT artworks.
      </div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Field
          className={styles.field}
          placeholder="Collection name"
          icon="profile"
          value={name}
          onChange={handleUpdateName}
          large
          required
        />
        <Field
          className={styles.field}
          placeholder="Collection description"
          icon="email"
          value={description}
          onChange={handleUpdateDescription}
          large
          required
        />

        {/* :::::::::::::::  SUBMIT BUTTON */}
        <button
          className={cn("button-large", styles.button)}
          onClick={handleSubmit}
        >
          <span>Continue</span>
          <Icon name="arrow-right" />
        </button>
      </form>
    </>
  );
};

export default CreatePage;
