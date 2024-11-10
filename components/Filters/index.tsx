import { useState } from "react";
import cn from "classnames";
import Form from "@/components/Form";
import styles from "./Filters.module.sass";
import Status from "./Status";

type StatusesType = {
    title: string;
    status: boolean;
};

type FiltersProps = {
    statuses: StatusesType[];
    dark?: boolean;
};

const Filters = ({ statuses, dark }: FiltersProps) => {
    const [email, setEmail] = useState<string>("");
    const [min, setMin] = useState<string>("");
    const [max, setMax] = useState<string>("");

    return (
        <div className={cn(styles.filters, { [styles.dark]: dark })}>
            <div className={styles.head}>
                <div className={cn("h3", styles.title)}>Advanced filter</div>
                <Form
                    className={styles.form}
                    inputClassName={styles.formInput}
                    placeholder="Search by NFTs"
                    value={email}
                    setValue={setEmail}
                    onSubmit={() => console.log("Submit")}
                    dark={dark}
                />
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.label}>Status</div>
                    <div className={styles.statuses}>
                        {statuses.map((status, index) => (
                            <Status
                                className={styles.status}
                                item={status}
                                key={index}
                                dark={dark}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.label}>Price</div>
                    <div className={styles.fieldset}>
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="tel"
                                value={min}
                                onChange={(e: any) => setMin(e.target.value)}
                                placeholder="Min"
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="tel"
                                value={max}
                                onChange={(e: any) => setMax(e.target.value)}
                                placeholder="Max"
                                required
                            />
                        </div>
                        <button
                            className={cn(
                                {
                                    "button-large": !dark,
                                    "button-white button-large": dark,
                                },
                                styles.button
                            )}
                        >
                            apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
