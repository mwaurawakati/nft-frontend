import cn from "classnames";
import styles from "./Tabs.module.sass";

type TabType = {
    title: string;
    value: string;
    onClick?: () => void;
};

type TabsProps = {
    className?: string;
    items: TabType[];
    value: number | string;
    setValue: any;
    dark?: boolean;
};

const Tabs = ({ className, items, value, setValue, dark }: TabsProps) => {
    const handleClick = (value: string, onClick: any) => {
        setValue(value);
        onClick && onClick();
    };

    return (
        <div
            className={cn(styles.tabs, { [styles.tabsDark]: dark }, className)}
        >
            {items.map((item, index) => (
                <button
                    className={cn(styles.button, {
                        [styles.active]: value === item.value,
                    })}
                    onClick={() => handleClick(item.value, item.onClick)}
                    key={index}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
