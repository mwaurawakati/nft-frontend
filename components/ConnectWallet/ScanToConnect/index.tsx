import cn from "classnames";
import styles from "./ScanToConnect.module.sass";
import Image from "@/components/Image";

type ScanToConnectProps = {};

const ScanToConnect = ({}: ScanToConnectProps) => (
    <div className={styles.scan}>
        <div className={cn("h3", styles.title)}>Scan to connect</div>
        <div className={styles.code}>
            <div className={styles.lines}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Image src="/images/scan.png" width={256} height={256} alt="Code" />
        </div>
        <div className={styles.foot}>
            <div className={styles.info}>Powered by UI8</div>
            <button className={styles.question}>
                Don’t have a wallet app?
            </button>
        </div>
    </div>
);

export default ScanToConnect;
