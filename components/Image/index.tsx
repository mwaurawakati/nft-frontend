import { useState } from "react";
import { default as NextImage, ImageProps } from "next/image";
import cn from "classnames";
import styles from "./Image.module.sass";

const Image = ({ className, src, ...props }: ImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <NextImage
            className={cn(styles.image, { [styles.loaded]: loaded }, className)}
            onLoadingComplete={() => setLoaded(true)}
            src={src}
            {...props}
        />
    );
};

export default Image;
