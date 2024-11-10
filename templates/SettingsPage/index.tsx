import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./SettingsPage.module.sass";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Upload from "./Upload";
import Information from "./Information";
import Wallet from "./Wallet";
import Notification from "./Notification";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { changeAuthor, changeDetailedUserInfo, selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import { useRouter } from "next/router";
import { ValidateEmail, ValidateWebsiteLink } from "@/utils/utils";
import { toast } from "react-toastify";
import { getUserInfo, updateUser } from "@/utils/api/api/users";

const SettingsPage = () => {
  const scrollToRefProfile = useRef<any>(null);
  const scrollToRefWallet = useRef<any>(null);
  const scrollToRefNotification = useRef<any>(null);
  const [active, setActive] = useState<any>(scrollToRefProfile);

  // ////////
  const currentUsr = useAppSelector(selectCurrentUser);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [bioText, setBioText] = useState("");
  const [websiteText, setWebsiteText] = useState("");
  const [facebookText, setFacebookText] = useState("");
  const [twitterText, setTwitterText] = useState("");
  const [telegramText, setTelegramText] = useState("");
  const [spotifyText, setSpotifyText] = useState("");
  const [instagramText, setInstagramText] = useState("");
  const [soundCloudText, setSoundCloudText] = useState("");
  const [bandcampText, setBandcampText] = useState("");
  const [walletAccountText, setWalletAccountText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [isCrop, setIsCrop] = useState(false);
  // EMAIL IS VERIFIED STATE
  const [emailVerified, setEmailVerified] = useState(false);

  //   const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const openModalCrop = () => setIsCrop(true);
  const closeModalCrop = () => setIsCrop(false);

  useEffect(() => {
    setNameText(currentUsr?.username || "");
    setEmailText(currentUsr?.email?.toString() || "");
    setBioText(currentUsr?.userBio?.toString() || "");
    setEmailText(currentUsr?.email?.toString() || "");
    setWebsiteText(currentUsr?.websiteURL?.toString() || "");
    setFacebookText(currentUsr?.facebook?.toString() || "");
    setTwitterText(currentUsr?.twitter?.toString() || "");
    setTelegramText(currentUsr?.telegram?.toString() || "");
    setSpotifyText(currentUsr?.spotify?.toString() || "");
    setInstagramText(currentUsr?.instagram?.toString() || "");
    setSoundCloudText(currentUsr?.soundcloud?.toString() || "");
    setBandcampText(currentUsr?.bandcamp?.toString() || "");
    setWalletAccountText(currentUsr?.address?.toString() || "");
    setSelectedAvatarFile(currentUsr?.avatar);
    // BACKEND VALUE OF EMAIL VERIFIED STATE
    // setEmailVerified(currentUsr?.verified || false);
  }, [currentUsr]);

  const changeAvatar = (event: any) => {
    var file = event.target.files[0];
    if (file === null) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewAvatar(reader.result?.toString() || "");
      openModalCrop();
    };
    reader.onerror = function () {};
  };

  const onClickUpdate = async () => {
    const params = {
      email: emailText,
      address: walletAccountText,
      username: nameText,
      websiteURL: websiteText,
      userBio: bioText,
      verified: true,
      banner: "",
      twitter: twitterText,
      facebook: facebookText,
      telegram: telegramText,
      spotify: spotifyText,
      instagram: instagramText,
      soundcloud: soundCloudText,
      bandcamp: bandcampText,
      avatar: selectedAvatarFile,
    };

    if (emailText !== "") {
      let correct = ValidateEmail(emailText);
      if (!correct) {
        toast.error("Invalid email.");
        params.email = "";
        return;
      }
    }
    if (walletAccountText !== "") {
    } else {
      toast.warn("Wallet account can not be empty.");
      return;
    }
    if (nameText === "") {
      toast.warn("Username can not be empty.");
      return;
    }
    params.username = nameText;
    if (websiteText !== "") {
      let correct = ValidateWebsiteLink(websiteText);
      if (!correct) {
        toast.warn("Invalid custom url.");
        params.websiteURL = "";
        return;
      }
    } else params.websiteURL = "";

    if (facebookText !== "") {
      let correct = ValidateWebsiteLink(facebookText);
      if (!correct) {
        toast.warn(
          "Invalid facebook url. Please input full path including https."
        );
        params.facebook = "";
        return;
      }
    } else params.facebook = "";

    if (twitterText !== "") {
      let correct = ValidateWebsiteLink(twitterText);
      if (!correct) {
        toast.warn(
          "Invalid twitter url. Please input full path including https."
        );
        params.twitter = "";
        return;
      }
    } else params.twitter = "";

    if (telegramText !== "") {
      let correct = ValidateWebsiteLink(telegramText);
      if (!correct) {
        toast.warn(
          "Invalid telegram url. Please input full path including https."
        );
        params.telegram = "";
        return;
      }
    } else params.telegram = "";

    if (spotifyText !== "") {
      let correct = ValidateWebsiteLink(spotifyText);
      if (!correct) {
        toast.warn(
          "Invalid spotify url. Please input full path including https."
        );
        params.spotify = "";
        return;
      }
    } else params.spotify = "";

    if (instagramText !== "") {
      let correct = ValidateWebsiteLink(instagramText);
      if (!correct) {
        toast.warn(
          "Invalid instagram url. Please input full path including https."
        );
        params.instagram = "";
        return;
      }
    } else params.instagram = "";

    if (soundCloudText !== "") {
      let correct = ValidateWebsiteLink(soundCloudText);
      if (!correct) {
        toast.warn(
          "Invalid soundcloud url. Please input full path including https."
        );
        params.soundcloud = "";
        return;
      }
    } else params.soundcloud = "";

    if (bandcampText !== "") {
      let correct = ValidateWebsiteLink(bandcampText);
      if (!correct) {
        toast.warn(
          "Invalid bandcamp url. Please input full path including https."
        );
        params.bandcamp = "";
        return;
      }
    } else params.bandcamp = "";

    if (selectedAvatarFile && selectedAvatarFile !== "") {
      params.avatar = selectedAvatarFile;
    }
    setProcessing(true);
    try {
      const updateResponse = await updateUser(params, currentUsr?._id);
      if (updateResponse.code === 0) {
        const userInfoResponse = await getUserInfo(currentUsr._id);
        dispatch(changeAuthor(userInfoResponse.data));
        dispatch(changeDetailedUserInfo(userInfoResponse.data));
        toast.success("Successfully updated the profile");
        router.push("/");
      } else {
        toast.warn(updateResponse.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occured");
    }
    setProcessing(false);
  };

  // EMAIL VERIFICATION MODAL AND FORM
  const [open, setOpen] = useState(false);
  const handleOpenEmail = () => {
    setOpen(true);
    console.log("open email modal");
  };
  const handleCloseEmail = () => setOpen(false);
  const [email, setEmail] = useState(emailText);

  const requestVerification = async () => {
    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!ValidateEmail(email)) {
        toast.error("Invalid Email");
        return;
      }
      handleCloseEmail();
      // const response = await axios.get(`${config.API_URL}api/users/get/privacy_policy/${email}`)
      // setEmail("");
      // if(response.data.code === 0){
      //   toast.success("Email Sent Successfully");
      // }else{
      //   toast.error(response.data.message)
      // }
    } catch (error) {
      toast.error("Error Sending Email");
    }
  };
  // ///////

  const menu = [
    {
      title: "Profile",
      anchor: scrollToRefProfile,
    },
    // {
    //   title: "Wallet",
    //   anchor: scrollToRefWallet,
    // },
    // {
    //   title: "Notification",
    //   anchor: scrollToRefNotification,
    // },
  ];

  const handleClick = (anchor: any) => {
    anchor.current.scrollIntoView({
      behavior: "smooth",
    });
    setActive(anchor);
  };

  return (
    <Layout layoutNoOverflow footerHide>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>Profile settings</div>
              <button className={cn("button-large", styles.button)}
               onClick={() => {
                onClickUpdate();
              }}>
                <span>Save</span>
                <Icon name="check" />
              </button>
            </div>
            <div className={styles.menu}>
              {menu.map((link, index) => (
                <button
                  className={cn("h4", styles.link, {
                    [styles.active]: link.anchor === active,
                  })}
                  key={index}
                  onClick={() => handleClick(link.anchor)}
                >
                  {link.title}
                  <Icon name="arrow-right" />
                </button>
              ))}
            </div>
            <Upload />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.section}>
            <div className={styles.anchor} ref={scrollToRefProfile}></div>
            <div className={styles.label}>information</div>
            <Information
             />
          </div>
          {/* <div className={styles.section} id="wallet">
            <div className={styles.anchor} ref={scrollToRefWallet}></div>
            <div className={styles.label}>wallet</div>
            <Wallet />
          </div> */}
          {/* <div className={styles.section}>
            <div className={styles.anchor} ref={scrollToRefNotification}></div>
            <div className={styles.label}>notification</div>
            <Notification />
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
