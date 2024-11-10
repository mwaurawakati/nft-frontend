import { useState } from "react";
import cn from "classnames";
import styles from "./Stories.module.sass";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Storie from "./Storie";
import AddStory from "./AddStory";

import { stories, storiesGallery } from "@/mocks/stories";

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className={styles.stories}>
            <div className={cn("h1", styles.title)}>Stories</div>
            <div className={styles.list}>
                <button className={styles.add} onClick={() => setVisible(true)}>
                    <Icon name="plus" />
                </button>
                <Modal
                    className={styles.modal}
                    closeClassName={styles.close}
                    containerClassName={styles.container}
                    visible={visible}
                    onClose={() => setVisible(false)}
                >
                    <AddStory />
                </Modal>
                {stories.map((storie, index) => (
                    <Storie
                        item={storie}
                        stories={storiesGallery}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Stories;
