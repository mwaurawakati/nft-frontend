import { useState, useEffect, useRef } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useMediaQuery } from "react-responsive";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Search.module.sass";
import Icon from "@/components/Icon";
import Item from "./Item";

type ItemsType = {
  title: string;
  buy?: string;
  reserve?: string;
  login?: string;
  image?: string;
  url: string;
};

type ResultType = {
  title: string;
  items: ItemsType[];
};

type SearchProps = {
  className?: string;
  light?: boolean;
  result: ResultType[];
};

const Search = ({ className, light, result }: SearchProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const onChange = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setResultVisible(false);
    } else {
      setResultVisible(true);
    }
  };

  const handleToggle = () => {
    setVisible(!visible);
    setSearch("");
    setResultVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
    setSearch("");
    setResultVisible(false);
  };

  const handleClear = () => {
    setSearch("");
    setResultVisible(false);
  };

  const initialRender = useRef(true);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      isDesktop && (resultVisible ? disablePageScroll() : enablePageScroll());
    }
  }, [resultVisible, isDesktop]);

  return (
    <OutsideClickHandler onOutsideClick={handleClose}>
      <div
        className={cn(
          styles.search,
          {
            [styles.active]: visible,
            [styles.visible]: resultVisible,
            [styles.light]: light,
          },
          className
        )}
      >
        <div className={styles.head}>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={onChange}
              placeholder="Search ..."
            />
          </div>
          <button className={styles.clear} onClick={handleClear}>
            clear
          </button>
          <button className={styles.toggle} onClick={handleToggle}>
            <Icon name="search" />
            <Icon name="close" />
          </button>
        </div>
        <div
          className={cn(styles.result, {
            [styles.visible]: resultVisible,
          })}
        >
          {result.map((x, index) => (
            <div className={styles.group} key={index}>
              <div className={styles.category}>{x.title}</div>
              <div className={styles.list}>
                {x.items.map((item, index) => (
                  <Item item={item} key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Search;
