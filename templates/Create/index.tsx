import {
  selectCurrentNetworkSymbol,
  selectCurrentUser,
  selectCurrentWallet,
  selectIsCommunityMember,
} from "@/utils/api/reducers/auth.reducers";
import {
  createCollectionApi,
  deleteCollectionApi,
  updateCollectionApi,
} from "@/utils/api/api/collections";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCollectionBannerFile,
  updateCollectionAvatarFile 
} from '@/utils/api/reducers/create.collection.reducers';


// import Icon from "../../components/StyleComponent/Icon";
// import styles from "./Profile.module.sass";
// import styles1 from "./ProfileEdit.module.sass";
// import styles2 from "./UploadDetails.module.sass";
import { toast } from "react-toastify";
import { config, CATEGORIES, PLATFORM_NETWORKS } from "@/utils/api/config.js";
// import Dropdown from "../../components/Button/Dropdown";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { nanoid } from "@reduxjs/toolkit";
// import ButtonPrimary from "components/Button/ButtonPrimary";
import { changeConsideringCollectionId } from "@/utils/api/reducers/collection.reducers";
// import FormItem from "components/StyleComponent/FormItem";
// import Input from "components/StyleComponent/Input";
// import Textarea from "components/StyleComponent/Textarea";
// import Checkbox from "@mui/material/Checkbox";
// import Label from "components/StyleComponent/Label";
// import IconButton from "@mui/material/IconButton";
// import { AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
// import { Backdrop, CircularProgress } from "@mui/material";
import { useSigningClient } from "@/utils/api/cosmwasm";
import { isSupportedEVMNetwork } from "@/utils/InteractWithSmartContract/interact";
// import VideoForBannerPreview from "components/Card/VideoForBannerPreview";
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { checkNativeCurrencyAndTokenBalances, isVideo } from "@/utils/utils";
// import MainSection from "components/Section/MainSection";
import { uploadFile } from "@/utils/api/api/utils";
// import ModalCrop from "components/Modal/CropModal";
// import Avatar from "components/StyleComponent/Avatar";

// ::::::::::::::::::::::::::::: Styling
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Preview from "./Preview";

// ::::::::::::::::::::::::::::: Components
import { CreateLeft1 } from './CreateStep1Page';
import { CreateLeft2 } from './CreateStep2Page';
import { CreateLeft3 } from './CreateStep3Page';
import { CreateLeftLast } from './CreateStepLast';

const cl = console.log.bind(console);

const CreateCollection = () => {
  // ::::::::::::::::::::::::::::::::::: Create Collection function
  const categoriesOptions = CATEGORIES;

  // ::::::::::::::::::::::::::::::::::: COLLECTION DETAILS STATE
  const createCollectionDetails = useSelector((state: any) => state.createCollection);

  const { 
    name,
    description,
    category, 
    termsConditions, 
    blurState, 
    launchPadState,
    bannerFile,
    avatarFile
  } = useSelector((state: any) => state.createCollection);
  // const logoImg = createCollectionDetails?.logoImg || "";
  // const bannerImg = createCollectionDetails?.bannerImg || "";
  const isRizeMemberCollection = createCollectionDetails?.isRizeMemberCollection || false;
  const royaltyFields = createCollectionDetails?.royaltyFields || [];

  const [working, setWorking] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [DEMO_NFT_ID] = React.useState(nanoid());
  // const { addCollection, balances, getOwnedCollections } = useSigningClient();
  const client = useSigningClient();
  const { addCollection, balances, getOwnedCollections } = client as {
    addCollection: (...data: any) => Promise<void>; // Example type definition
    balances: any[]; // Example type definition
    getOwnedCollections: (...data: any) => Promise<any[]>; // Example type definition
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentWallet = useAppSelector(selectCurrentWallet);
  const currentUsr: any = useAppSelector(selectCurrentUser);
  const currentNetworkSymbol = useAppSelector(selectCurrentNetworkSymbol);
  const isUserAMemberOfCommunity = useAppSelector(selectIsCommunityMember);
  const [isCrop, setIsCrop] = useState(false);
  // const openModalCrop = () => setIsCrop(true);
  // const closeModalCrop = () => setIsCrop(false);


  
  // :::::::::::::::::::::::::::::::::: SAVE FUNCTION
  const saveCollection = async (params: any) => {
    let newCollectionId: any = 0;
    setWorking(true);
    try {
      const createResponse: any = await createCollectionApi(params);
      if (createResponse.code === 0) {
        newCollectionId = createResponse?.data || "";
        let isCreatingNewItem = localStorage.getItem("isNewItemCreating");
        if (isCreatingNewItem)
          localStorage.setItem("newCollectionId", newCollectionId);
        dispatch(changeConsideringCollectionId(newCollectionId));
        if (
          isSupportedEVMNetwork(currentNetworkSymbol) === true ||
          currentNetworkSymbol === PLATFORM_NETWORKS.XRPL
        ) {
          toast.success(<div>You&apos;ve created a new collection.</div>);
          setTimeout(() => {
            navigate("/collectionList");
          }, 5000);
        }
        if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
          let balanceCheck = checkNativeCurrencyAndTokenBalances(0, balances);
          if (balanceCheck === false) {
            await deleteCollectionApi(newCollectionId, currentUsr._id);
          }
          let royalties = [];
          for (let idx = 0; idx < royaltyFields.length; idx++) {
            royalties.push({
              address: royaltyFields[idx].address,
              rate: royaltyFields[idx].percentage * 10000,
            });
          }

          const createdTx: any = await addCollection(
            currentUsr.address,
            100000,
            name,
            "Rize2DayNFT",
            config.CW721_CODE_ID,
            1000000,
            [...royalties],
            newCollectionId
          );


          if (createdTx !== -1) {
            //read created collection info here
            let newCollections: any = await getOwnedCollections(currentUsr.address);

            console.log("newCollections : ", newCollections)

            if (newCollections?.list.length > 0) {
              let newCollectionInfo =
                newCollections.list[newCollections.list.length - 1];

              const updateResponse = await updateCollectionApi(
                {
                  collectionNumber: newCollectionInfo.id,
                  address: newCollectionInfo.collection_address,
                  cw721address: newCollectionInfo.cw721_address,
                },
                newCollectionId
              );
              if (updateResponse.code === 0) {
                toast.success(<div>You&apos;ve created a new collection.</div>);
                setTimeout(() => {
                  navigate("/collectionList");
                }, 5000);
              } else {
                toast.error("DB failed!");
                await deleteCollectionApi(newCollectionId, currentUsr._id);
              }
            }
          } else {
            toast.error("Transaction failed!");
            await deleteCollectionApi(newCollectionId, currentUsr._id);
          }
        }
      } else {
        toast.error(createResponse.message);
      }
    } catch (error) {
      console.log("creating collection error : ", error);
      if (newCollectionId !== "")
        await deleteCollectionApi(newCollectionId, currentUsr._id);
      toast.error("Uploading failed");
    } finally {
      setWorking(false);
    }
  };

  // ::::::::::::::::::::::::::::::::::: CREATE COLLECTION FUNCTION
  
  const createCollection = async () => {
    if (currentUsr === null || currentUsr === undefined) {
      toast.warn("Please sign in and try again.");
      return;
    }
    // if (selectedAvatarFile === null || selectedBannerFile === null) {
    //   toast.warn("You have to select logo and banner image.");
    //   return;
    // }
    // if (textName === "") {
    //   toast.warn("Collection name can not be empty.");
    //   return;
    // }

    setWorking(true);

    const params: any = {};

    params.collectionLogoURL = avatarFile
    
    var formData = new FormData();
    formData.append("itemFile", bannerFile);
    formData.append("authorId", "hch");
    try {
      const response: any = await uploadFile(formData);
      params.collectionBannerURL = response.path;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Uploading photo failed.");
      return;
    }

    /*
    export const CATEGORIES = [
  { value: 1, text: "Arts" },
  { value: 2, text: "Games" },
  { value: 3, text: "Sports" },
  { value: 4, text: "Photography" },
  { value: 5, text: "Utility" },
];

    */
    params.collectionName = name;
    params.collectionDescription = description;

    interface CollectionCategoryProps {
      value: number; 
      text: string
    }
    let collectionCategory: CollectionCategoryProps = {value: 1, text: "Arts"};
    category === "Arts"?
      collectionCategory = {value: 1, text: "Arts"} :
    category === "Games"? 
      collectionCategory = {value: 2, text: "Games"} : 
    category === "Sports"?
      collectionCategory = { value: 3, text: "Sports" } :
    category === "Photography"?
      collectionCategory = { value: 4, text: "Photography" } :
    category === "Utility"?
      collectionCategory = { value: 5, text: "Utility" } : null

    params.collectionCategory = collectionCategory.value;
    params.collectionTerms = termsConditions;
    params.price = 0;
    params.owner = currentUsr._id;
    params.networkSymbol = currentNetworkSymbol;
    params.creatorWallet = currentWallet;
    params.wantTobeMemberColl = isRizeMemberCollection;
    params.blurItems = blurState;
    params.enableLaunchpad = launchPadState;
    saveCollection(params);
  };

  // ::::::::::::::::::::::::::::::::::: Step function and state
  const [step, setStep] = useState<number>(1);
  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  };

  // ::::::::::::::::::::::::::::::::::: Layout step
  const LeftComponent = () => (
    <div>
      <div
        className={`transform ${step === 1? 'h-max opacity-[100] translate-x-0' : 'h-0 opacity-0 translate-x-[2rem] fixed z-[-200] bottom-[-100%] left-[-100%]'} ease-300`}
      >
        <CreateLeft1 onChangeStep={handleChangeStep} />
      </div>
      <div
        className={`transform ${step === 2? 'h-max opacity-[100] translate-x-0' : 'h-0 opacity-0 translate-x-[2rem] fixed z-[-200] bottom-[-100%] left-[-100%]'} ease-300` }
      >
        <CreateLeft2 onChangeStep={handleChangeStep} />
      </div>
      <div
        className={`transform ${step === 3? 'h-max opacity-[100] translate-x-0' : 'h-0 opacity-0 translate-x-[2rem] fixed z-[-200] bottom-[-100%] left-[-100%]'} ease-300` }
      >
        <CreateLeft3 onChangeStep={handleChangeStep} />
      </div>
      <div
        className={`transform ${step === 4? 'h-max opacity-[100] translate-x-0' : 'h-0 opacity-0 translate-x-[2rem] fixed z-[-200] bottom-[-100%] left-[-100%]'} ease-300`}
      >
        <CreateLeftLast onChangeStep={handleChangeStep} onSubmit={createCollection} />
      </div>
    </div>
  )
  

  return (
    <Layout layoutNoOverflow footerHide emptyHeader>
        <LayoutCreate left={<LeftComponent />}>
            <Preview />
        </LayoutCreate>
    </Layout>
  )
}

export default CreateCollection;