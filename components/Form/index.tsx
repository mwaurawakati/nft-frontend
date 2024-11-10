import cn from "classnames";
import styles from "./Form.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";

type FormProps = {
    className?: string;
    inputClassName?: string;
    onSubmit: any;
    value: string;
    setValue: any;
    placeholder: string;
    dark?: boolean;
    buttonRight?: boolean;
};

const Form = ({
    className,
    inputClassName,
    onSubmit,
    value,
    setValue,
    placeholder,
    dark,
    buttonRight,
}: FormProps) => {
    return (
        <form
            className={cn(
                styles.form,
                { [styles.dark]: dark, [styles.buttonRight]: buttonRight },
                className
            )}
            action=""
            onSubmit={onSubmit}
        >
            <Field
                className={styles.field}
                inputClassName={cn(styles.input, inputClassName)}
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                required
            />
            <button className={styles.button} type="submit">
                <Icon name="search" />
            </button>
        </form>
    );
};

export default Form;
