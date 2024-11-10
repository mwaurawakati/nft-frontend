import styles from "./Tags.module.sass";

type TagsProps = {
    tags: any;
};

const Tags = ({ tags }: TagsProps) => (
    <div className={styles.tags}>
        {tags.map((tag: any, index: number) => (
            <div className={styles.tag} key={index}>
                {tag}
            </div>
        ))}
    </div>
);

export default Tags;
