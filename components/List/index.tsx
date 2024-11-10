import cn from "classnames";
import styles from "./List.module.sass";
import Tabs from "./Tabs";

type ListProps = {
    tabs: any;
    tabsValue: any;
    setTabsValue: any;
    children: React.ReactNode;
    light?: boolean;
};

const List = ({
    tabs,
    tabsValue,
    setTabsValue,
    children,
    light,
}: ListProps) => {
    return (
        <div className={cn(styles.list, { [styles.light]: light })}>
            <Tabs
                items={tabs}
                value={tabsValue}
                setValue={setTabsValue}
                dark={light}
            />
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};

export default List;
