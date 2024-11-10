import { useState } from "react";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Icon from "@/components/Icon";
import FileUpload from "@/components/FileUpload";
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateCollectionBannerFile, updateCollectionAvatarFile } from '@/utils/api/reducers/create.collection.reducers';

const cl = console.log.bind(console);

// ::::::::::::::::::::::::::::::::::::::::::: Left section only for the create page
interface CreateLeft2Props {
    onChangeStep: (newStep: number) => void;
}

export const CreateLeft2: React.FC<CreateLeft2Props> = ({ onChangeStep }) => {
    
    const createCollectionDetails = useSelector((state: any) => state.createCollection);
    const dispatch = useDispatch();

    // :::::::::::::::::::::::::::::::::: SELECTED FILE STATE
    // const [selectedBannerFile, setSelectedBannerFile] = useState(null);
    // const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
    
    // ::::::::::::::::::::::::::::::::::: STINGIFIED FILE STATE
    const [bannerFile, setBannerFile] = useState<string>(createCollectionDetails.bannerFile || "");
    const [avatarFile, setAvatarFile] = useState<string>(createCollectionDetails.avatarFile || "");

    // :::::::::::::::::::::::::::::::::: IMAGE UPLOAD FUNCTIONS
    const handleBannerFile = (event: any) => {
        var file = event.target.files[0];
        if (file === null) return;
        // setSelectedBannerFile(file);
        let reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBannerFile(reader.result);
        };
        reader.onerror = function (error: any) {
            cl('Change Avatar error: ', error);
        };
    };

    const handleAvatarFile = (event: any) => {
        var file = event.target.files[0];
        if (file === null) return;
        // setSelectedAvatarFile(file);
        let reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatarFile(reader.result?.toString() || "");
        // openModalCrop();
        };
        reader.onerror = function (error: any) {
            cl('Change Avatar error: ', error);
        };
    };

    const handleSubmit = () => {
        onChangeStep(3); // Move to next step
        dispatch(updateCollectionBannerFile(bannerFile));
        dispatch(updateCollectionAvatarFile(avatarFile)); 
        
        cl('Collection details (from Redux state): ', createCollectionDetails);
    };

    
    return (
        <>
        <div className={styles.head}>
            <div className={cn("h1", styles.title)}>
                Create a <br></br>Collection.
            </div>
            <button
                onClick={()=>onChangeStep(1)} 
                className={cn("button-circle", styles.back)}
            >
                <Icon name="arrow-left" />
            </button>
        </div>
        <div className={styles.info}>
            Showcase your artworks graphically.
        </div>
        <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
        >
            <FileUpload
                label="Select Banner Image"
                // value={bannerFile}
                // value={selectedBannerFile}
                onChange={handleBannerFile}
                name="banner_image"// required
            />
            <FileUpload
                label="Select Avatar Image"
                // value={avatarFile}
                // value={selectedAvatarFile}
                onChange={handleAvatarFile}
                name="avatar_image"// required
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
    )
}
