import styles from "./Image.module.sass";

import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import checkInViewIntersectionObserver from "@/utils/isInViewPortIntersectionObserver";
// import defaultLogo from "images/default_logo.png";
import { config } from "@/utils/api/config";
import {
  notBroken,
  thumbnailNotBroken,
  notBrokenImgHolder,
} from "@/utils/api/methods";
import Description from "@/components/Description";
import Details from "@/components/Details";
import Preview from "@/components/Description/Preview";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  isLocal?: boolean;
  isXRP?: boolean;
  thumbnail?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  isLocal = false,
  isXRP = false,
  alt = "nc-imgs",
  src = "",
  thumbnail = "",
  className = "object-cover w-full h-full",
  ...args
}) => {
  const path =
    src === ""
      ? src
      : isXRP
      ? src
      : isLocal
      ? `${config.UPLOAD_URL}uploads/` + src
      : config.ipfsGateway + src;
  const _containerRef = useRef(null);
  let _imageEl: HTMLImageElement | null = null;

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [holderAvailable, setHolderAvailable] = useState(false);
  const [holderImg, setHolderImg] = useState("");

  // checked if the image was changed in public/holders
  const validateImg = async () => {
    const valid = await thumbnailNotBroken(thumbnail);
    if (valid) {
      // setHolderImg(`${config.UPLOAD_URL}thumbnails/${thumbnail}?quality=0&sharpen=false&blur=5`)
      setHolderImg(`${config.UPLOAD_URL}thumbnails/${thumbnail}`);
      setHolderAvailable(valid);
    }
  };

  useEffect(() => {
    validateImg();
  });
  const _checkInViewPort = () => {
    if (!_containerRef.current) return;
    checkInViewIntersectionObserver({
      target: _containerRef.current as any,
      options: {
        root: null,
        rootMargin: "0%",
        threshold: 0,
      },
      freezeOnceVisible: true,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src || src === "") {
      _handleImageLoaded();
      return true;
    }
    _imageEl = new Image();
    if (_imageEl) {
      _imageEl.src = path;
      _imageEl.addEventListener("load", _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    setImageLoaded(true);
    set__src(path);
  };

  useEffect(() => {
    _checkInViewPort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div className={styles.preview}>
          <img
            src={thumbnail}
            alt={alt}
            className={styles.sImage}
          />
        <div className={styles.actions}></div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {__src && imageLoaded ? (
        <Preview image={__src} alt={"_src NcImage"} />
      ) : holderAvailable && holderImg ? (
        <Preview image={holderImg} alt={"holderImg NcImage"} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;
