import cn from "classnames";
import styles from "./Checkbox.module.sass";

type CheckboxProps = {
    className?: string;
    label: string;
    value: any;
    onChange: any;
};

const Checkbox = ({ className, label, value, onChange }: CheckboxProps) => {
    return (
        <label className={cn(styles.checkbox, className)}>
            <input
                className={styles.input}
                type="checkbox"
                value={value}
                onChange={onChange}
                checked={value}
            />
            <span className={styles.inner}>
                <span className={styles.tick}></span>
                <span className={styles.label}>{label}</span>
            </span>
        </label>
    );
};

export default Checkbox;
