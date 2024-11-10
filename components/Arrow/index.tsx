import cn from "classnames";
import styles from "./Arrow.module.sass";

type ArrowProps = {
    className?: string;
    color?: string;
};

const Arrow = ({ className, color }: ArrowProps) => (
    <div
        className={cn(styles.arrow, className)}
        style={{ backgroundColor: color }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="132"
            height="37"
            viewBox="0 0 132 37"
        >
            <path d="M115.669 1.021l.159.151 14.5 14.5a4 4 0 0 1 .151 5.497l-.151.159-14.5 14.5a4 4 0 0 1-5.808-5.497l.151-.159L118.343 22H4a4 4 0 1 1 0-8h113.343l-7.171-7.172a4 4 0 0 1-.151-5.497l.151-.159a4 4 0 0 1 5.497-.151z" />
        </svg>
    </div>
);

export default Arrow;
