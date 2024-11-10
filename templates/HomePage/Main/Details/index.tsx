import styles from "./Details.module.sass";

type DetailsProps = {
    collection: string;
    owner: string;
    likes: string;
};

const Details = ({ collection, owner, likes }: DetailsProps) => (
    <div className={styles.details}>
        <div className={styles.item}>
            <div className={styles.category}>Views</div>
            <div className={styles.value}>{collection}</div>
        </div>
        <div className={styles.item}>
            <div className={styles.category}>Owner</div>
            <div className={styles.value}>{owner}</div>
        </div>
        <div className={styles.item}>
            <div className={styles.category}>Likes</div>
            <div className={styles.value}>{likes}</div>
        </div>
    </div>
);

export default Details;
