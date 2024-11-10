import cn from "classnames";
import styles from "./Toggle.module.sass";

type ToggleProps = {
    className?: string;
    value: boolean;
    onChange: any;
};

const Toggle = ({ className, value, onChange }: ToggleProps) => {
    const handleOnChange = () => {
        onChange(!value);
    }

    return (
    <label className={cn(styles.toggle, className)}>
        <input
            className={styles.input}
            type="checkbox"
            onChange={handleOnChange}
            checked={value}
        />
        <span className={styles.inner}></span>
    </label>
)};

export default Toggle;
