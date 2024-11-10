import cn from "classnames";
import styles from "./Field.module.sass";
import Icon from "@/components/Icon";

type FieldProps = {
    className?: string;
    inputClassName?: string;
    textarea?: boolean;
    type?: string;
    value: string;
    onChange: any;
    placeholder?: string;
    required?: boolean;
    children?: any;
    icon?: string;
    autoFocus?: any;
    light?: boolean;
    large?: boolean;
    label?: string;
};

const Field = ({
    className,
    inputClassName,
    textarea,
    type,
    value,
    onChange,
    placeholder,
    required,
    icon,
    autoFocus,
    light,
    large,
    label,
}: FieldProps) => (
    <div
        className={cn(
            styles.field,
            { [styles.fieldIcon]: icon },
            { [styles.fieldTextarea]: textarea },
            { [styles.fieldLight]: light },
            { [styles.fieldLarge]: large },
            className
        )}
    >
        <div className={styles.wrap}>
            {textarea ? (
                <textarea
                    className={styles.textarea}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                ></textarea>
            ) : (
                <input
                    className={cn(styles.input, inputClassName)}
                    type={type || "text"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                />
            )}
            {icon && <Icon className={styles.icon} name={icon} />}
        </div>
        {label && <div className={styles.label}>{label}</div>}
    </div>
);

export default Field;
