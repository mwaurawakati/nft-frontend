import cn from "classnames";
import styles from "./Balance.module.sass";
import Icon from "@/components/Icon";

type BalanceProps = {
    className?: string;
    value: number;
    dark?: boolean;
};

const Balance = ({ className, value, dark }: BalanceProps) => (
    <div
        className={cn(
            styles.balance,
            { [styles.negative]: value < 0, [styles.dark]: dark },
            className
        )}
    >
        <Icon name="balance" />
        <div className={styles.value}>{value < 0 ? value : "+" + value}%</div>
    </div>
);

export default Balance;
