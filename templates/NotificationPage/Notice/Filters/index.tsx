import { useState } from "react";
import cn from "classnames";
import styles from "./Filters.module.sass";
import Checkbox from "@/components/Checkbox";

type FiltersType = {
    title: string;
    value: string;
};

type FiltersProps = {
    filters: FiltersType[];
    selectedFilters: any;
    setSelectedFilters: any;
    onSelectAll?: () => void;
    onDeselectAll?: () => void;
};

const Filters = ({
    filters,
    selectedFilters,
    setSelectedFilters,
    onSelectAll,
    onDeselectAll,
}: FiltersProps) => {
    const handleChange = (filter: any) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(
                selectedFilters.filter((x: any) => x !== filter)
            );
        } else {
            setSelectedFilters((selectedFilters: any) => [
                ...selectedFilters,
                filter,
            ]);
        }
    };

    return (
        <div className={styles.filters}>
            <div className={cn("h4", styles.title)}>Filters</div>
            <div className={styles.list}>
                {filters.map((filter, index) => (
                    <Checkbox
                        className={styles.checkbox}
                        value={selectedFilters.includes(filter.value)}
                        onChange={() => handleChange(filter.value)}
                        label={filter.title}
                        key={index}
                    />
                ))}
            </div>
            <div className={styles.btns}>
                <button
                    className={cn(
                        "button-stroke-grey button-medium",
                        styles.button
                    )}
                    onClick={onSelectAll}
                >
                    select all
                </button>
                <button
                    className={cn(
                        "button-stroke-grey button-medium",
                        styles.button
                    )}
                    onClick={onDeselectAll}
                >
                    deselect all
                </button>
            </div>
        </div>
    );
};

export default Filters;
