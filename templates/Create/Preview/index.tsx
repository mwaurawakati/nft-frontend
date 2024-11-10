import React from 'react';
import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";
// redux
import { useSelector } from 'react-redux';


const Preview = () => {
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
    
    
    return (
    <>
        <div className={styles.title}>Preview</div>
        <div className={styles.preview}>
            <Image
                src={bannerFile || "/images/create-preview.jpg"}
                layout="fill"
                objectFit="cover"
                alt="Preview"
            />
            <div className={styles.image}>
                <Image
                    src={avatarFile || "/images/create-image.jpg"}
                    layout="fill"
                    objectFit="cover"
                    alt="Preview"
                />
            </div>
            <div className={styles.category}>{category}</div>
        </div>
        <div className={styles.head + ' mb-[1rem]'}>
            <div className={cn("h4", styles.subtitle)}>{name}</div>
            {/* <div className={styles.price}>0 NFT</div> */}
        </div>
        <div className='flex flex-col gap-[1rem] '>
            <div className='flex flex-col '>
                <span className='font-semibold text-slate-600 text-[1.25rem] '>Collection Description:</span>
                <p className='text-[1.05rem] text-slate-900'>{description || "No description set"}</p>
            </div>
            <div className='flex flex-col  '>
                <span className='font-semibold text-slate-600 text-[1.25rem] '>Extra Terms and Conditions:</span>
                <p className='text-[1.05rem] text-slate-900'>{termsConditions || "No terms set"}</p>
            </div>            
        </div>
    </>
)};

export default Preview;
