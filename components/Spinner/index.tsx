import cn from "classnames";
import styles from "./Spinner.module.sass";

type SpinnerProps = {
    className?: string;
    dark?: boolean;
};

const Spinner = ({ className, dark }: SpinnerProps) => (
    <div className={cn(styles.spinner, { [styles.dark]: dark }, className)}>
        {Array.from(Array(8).keys()).map((x) => (
            <span key={x}></span>
        ))}
    </div>
);

export default Spinner;
