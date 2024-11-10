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
import { thumbnailNotBroken } from "@/utils/api/methods";

const NcImage = ({
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
  let _imageEl = null;

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [holderAvailable, setHolderAvailable] = useState(false);
  const [holderImg, setHolderImg] = useState("");

  // checked if the image was changed in public/holders
  const validateImg = async () => {
    const valid = await thumbnailNotBroken(thumbnail);
    if (valid) {
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
      target: _containerRef.current,
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
      <>
        {thumbnail && <img src={thumbnail} alt="" />}
        {!thumbnail && (
          <div
            className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
          >
            <img src={'https://stakecoreum.com/uploads/239d4e7b0d8b9a5fd316faa8abf89931.png'} alt={alt} className="object-cover h-full" />
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {__src && imageLoaded ? (
        <img src={__src} className={className} alt={alt} {...args} />
      ) : thumbnail ? (
        <img src={thumbnail} alt="" />
      ) : holderAvailable && holderImg && !thumbnail ? (
        <img src={holderImg} className={className} alt={alt} {...args} />
      ) : ( 
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;