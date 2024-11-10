import { useState } from "react";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { CATEGORIES } from "@/utils/api/config.js";
import Dropdown from '@/components/Dropdown';
import Toggle from '@/components/Toggle';
// redux
import { useDispatch, useSelector } from "react-redux";
import {
    updateCollectionCategory,
    updateBlurState,
    updateLaunchPadState,
    updateCollectionTermsConditions
} from "@/utils/api/reducers/create.collection.reducers";

const cl = console.log.bind(console);

// ::::::::::::::::::::::::::::::::::::::::::: Left section only for the create page
interface CreateLeft2Props {
    onChangeStep: (newStep: number) => void;
}


export const CreateLeft3: React.FC<CreateLeft2Props> = ({ onChangeStep }) => {

    // ::::::::::::::::::::::::::::::::::: COLLECTION DETAILS STATE
    const { category, termsConditions, blurState, launchPadState } = useSelector((state: any) => state.createCollection);
    const createCollectionDetails = useSelector((state: any) => state.createCollection);
    const dispatch = useDispatch();
    
    const categoryOptions = CATEGORIES;

    const [localCategory, setLocalCategory] = useState(categoryOptions[0]);
    const [localTermsConditions, setLocalTermsConditions] = 
        useState<string>(termsConditions || "");
    const [localBlurState, setLocalBlurState] = 
        useState<boolean>(blurState);
    const [localLaunchPadState, setLocalLaunchPadState] = 
        useState<boolean>(launchPadState);
    
    // Change Terms and Condition       
    const handleTermsConditions = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTermsConditions(e.target.value);
    };
    
    // SUBMIT FUNCTION
    const handleSubmit = () => {
        onChangeStep(4); // Move to next step
        dispatch(updateCollectionCategory(localCategory.text));
        dispatch(updateCollectionTermsConditions(localTermsConditions));
        dispatch(updateBlurState(localBlurState));
        dispatch(updateLaunchPadState(localLaunchPadState));

        // cl('terms and conditions: ', termsConditions, '\ncategory: ', category);
        cl('Collection details (from Redux state): ', createCollectionDetails);
    };

    return (
        <>
        <div className={styles.head}>
            <div className={cn("h1", styles.title)}>
                {/* Create a <br></br>Collection. */}
                Finish setting up<br></br>your Collection
            </div>
            <button
                onClick={()=>onChangeStep(2)} 
                className={cn("button-circle", styles.back)}
            >
                <Icon name="arrow-left" />
            </button>
        </div>
        <div className={styles.info}>
            {/* Showcase your artworks graphically. */}
            Make your collection stand out.
        </div>
        <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
        >
            <Dropdown
                // className={styles.dropdown}
                value={localCategory}
                setValue={setLocalCategory}
                options={categoryOptions}
            />
            {/* :::::::::::::::::::::::::::: TOGGLE OPTIONS */}
            <div className={styles.toggles}>
                <div className={styles.toggle}>
                    <span className={styles.text}>Blur Items</span>
                    <Toggle 
                        // className={styles.toggle}
                        value={localBlurState}
                        onChange={() => setLocalBlurState(!localBlurState)}
                    />
                </div>
                <div className={styles.toggle}>
                    <span className={styles.text}>Enable Launchpad</span>
                    <Toggle 
                        // className={styles.toggle}
                        value={localLaunchPadState}
                        onChange={() => setLocalLaunchPadState(!localLaunchPadState)}
                    />
                </div>
            </div>
            
            {/* :::::::::::::::::::::::::::: Terms and conditions */}
            <Field
                className={styles.field}
                placeholder="Extra Terms and Conditions"
                icon="profile"
                value={localTermsConditions}
                onChange={handleTermsConditions}
                large
                // required
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
