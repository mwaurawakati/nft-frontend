import styles from "./Collections.module.sass";
import Users from "@/components/Users";
import Collection from "@/components/Collection";
import Actions from "@/components/Actions";
import Spinner from "@/components/Spinner";

type CollectionsProps = {
    items: any;
    users: any;
    theme: any;
    setTheme: any;
};

const Collections = ({ items, users, theme, setTheme }: CollectionsProps) => {
    return (
        <>
            <div className={styles.head}>
                <Users title="Collected by" items={users} dark={theme} border />
                <Actions theme={theme} setTheme={setTheme} dark={theme} />
            </div>
            <div className={styles.collections}>
                {items.map((token: any, index: number) => (
                    <Collection
                        className={styles.collection}
                        item={token}
                        key={index}
                        dark={theme}
                    />
                ))}
            </div>
            <Spinner dark={theme} />
        </>
    );
};

export default Collections;
