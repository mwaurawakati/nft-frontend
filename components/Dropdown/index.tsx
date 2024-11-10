import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
// import Icon from "../../StyleComponent/Icon";

const cl = console.log.bind(console);

interface DropdownProps {
  className?: string;
  value: {
    text: string;
    value: number;
  };
  setValue?: any;
  options?: any;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  value,
  setValue,
  options = [],
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value: any, index: any) => {
    cl('Index: ', index, '\nValue: ', value);
    setValue(value, index);
    setVisible(false);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => setVisible(false)}
      disabled={disabled}
    >
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>{value.text}</div>
          <div className={styles.arrow}>
            {/* <Icon name="arrow-bottom" size="10" />
            
             */}

            <svg
              className={''}
              width={'10'}
              height={'10'}
              viewBox="0 0 16 16"
              fill={'inherit'}
            >
              <path d={'M15.039 3.961c-.653-.653-1.713-.653-2.366 0L8 8.634 3.327 3.961c-.653-.653-1.713-.653-2.366 0s-.653 1.713 0 2.366l5.856 5.856c.653.653 1.713.653 2.366 0l5.856-5.856c.653-.653.653-1.713 0-2.366z'}></path>
            </svg>
          </div>
        </div>
        <div
          className={styles.body}
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {options &&
            options.length > 0 &&
            options.map((x: any, index: any) => (
              <div
                className={cn(styles.option, {
                  [styles.selectioned]: x.value === value.value,
                })}
                onClick={() => handleClick(x, index)}
                key={index}
              >
                {x.text}
              </div>
            ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
