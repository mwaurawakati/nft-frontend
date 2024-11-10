import { useEffect, useState } from "react";
import styles from "./Information.module.sass";
import Field from "@/components/Field";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import { useRouter } from "next/router";

type InformationProps = {
};

const Information = ({ }: InformationProps) => {
  const [email, setEmail] = useState<string>("hello@ui8.net");
  const [name, setName] = useState<string>("Dash");
  const [bio, setBio] = useState<string>("");
  const [site, setSite] = useState<string>("https://ui8.net");
  const [twitter, setTwitter] = useState<string>("https://twitter.com/ui8");
  const [facebook, setFacebook] = useState<string>("https://facebook.com/ui8");

  // /////////
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
  // ////////

  return (
    <div className={styles.information}>
      <div className={styles.fieldset}>
        <Field
          className={styles.field}
          label="Username"
          icon="profile"
          value={nameText}
          onChange={(e: any) => setNameText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Email"
          icon="email"
          type="email"
          value={emailText}
          onChange={(e: any) => setEmailText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Bio"
          placeholder="About you"
          icon="list-open"
          value={bioText}
          onChange={(e: any) => setBioText(e.target.value)}
          textarea
          required
        />
      </div>
      <div className={styles.label}>links</div>
      <div className={styles.socials}>
        <Field
          className={styles.field}
          label="Website"
          icon="link"
          value={websiteText}
          onChange={(e: any) => setWebsiteText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Facebook"
          icon="facebook"
          value={facebookText}
          onChange={(e: any) => setFacebookText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Twitter"
          icon="twitter"
          value={twitterText}
          onChange={(e: any) => setTwitterText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Telegram"
          icon="telegram"
          value={telegramText}
          onChange={(e: any) => setTelegramText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Spotify"
          icon="spotify"
          value={spotifyText}
          onChange={(e: any) => setSpotifyText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Instagram"
          icon="instagram"
          value={instagramText}
          onChange={(e: any) => setInstagramText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="SoundCloud"
          icon="soundcloud"
          value={soundCloudText}
          onChange={(e: any) => setSoundCloudText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Bandcamp"
          icon="bandcamp"
          value={bandcampText}
          onChange={(e: any) => setBandcampText(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Wallet Account"
          icon="wallet"
          value={walletAccountText}
          onChange={(e: any) => setWalletAccountText(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default Information;
