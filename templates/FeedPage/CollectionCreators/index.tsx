import cn from "classnames";
import styles from "./CollectionCreators.module.sass";
import Collection from "./Collection";
import TopUsers from "./TopUsers";

import { collectionsCreators } from "@/mocks/collections";
import { creators } from "@/mocks/creators";
import { collectors } from "@/mocks/collectors";

type CollectionCreatorsProps = {};

const CollectionCreators = ({}: CollectionCreatorsProps) => (
    <div className={styles.row}>
        <div className={styles.col}>
            <div className={cn("h1", styles.title)}>
                Collection<br></br> from creators<br></br> you follow
            </div>
            <div className={styles.list}>
                {collectionsCreators.map((collection, index) => (
                    <Collection
                        className={styles.collection}
                        item={collection}
                        key={index}
                    />
                ))}
            </div>
            <div className={styles.btns}>
                <button
                    className={cn("button-stroke button-medium", styles.button)}
                >
                    load more
                </button>
            </div>
        </div>
        <div className={styles.col}>
            <TopUsers
                className={styles.users}
                title="Top creators of&nbsp;the&nbsp;week."
                items={creators}
            />
            <TopUsers
                className={styles.users}
                title="Top collectors of&nbsp;the&nbsp;week."
                items={collectors}
            />
        </div>
    </div>
);

export default CollectionCreators;
