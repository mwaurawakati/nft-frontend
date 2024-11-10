import React, { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Tokens.module.sass";
import Users from "@/components/Users";
import Actions from "@/components/Actions";
import Token from "@/components/Token";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import {
  selectBulkOpsMode,
  selectBulkSelectedArray,
} from "@/utils/api/reducers/collection.reducers";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";

import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { getLinkPathToJSON, getSystemTime, isJsonObject } from "@/utils/utils";
import { isEmpty } from "@/utils/api/methods";
import { config } from "@/utils/api/config";
import { toast } from "react-toastify";

type TokensProps = {
  titleUsers?: string;
  items: any;
  users: any;
  theme: any;
  setTheme: any;
  tItems?: any;
  showBulkFeatures?: any;
};

let Tokens = ({
  items,
  titleUsers,
  users,
  theme,
  setTheme,
  tItems,
  showBulkFeatures,
}: TokensProps) => {
  const [sorting, setSorting] = useState<string>("grid");

  return (
    <>
      <div className={styles.head}>
        {/* <Users
                    classUsersItem={styles.user}
                    classUsersCounter={styles.counter}
                    title={titleUsers}
                    items={users}
                    dark={theme}
                    border
                /> */}
        {/* <Actions
                    sortingValue={sorting}
                    setSortingValue={setSorting}
                    theme={theme}
                    setTheme={setTheme}
                    dark={theme}
                /> */}
      </div>
      <div
        className={cn(styles.tokens, {
          [styles.list]: sorting === "list",
        })}
      >
        {items.map((token: any, index: number) => {
          return (
            <Token
              className={styles.token}
              item={token}
              key={index}
              large={sorting === "list"}
              dark={theme}
              selectable={showBulkFeatures}
            />
          );
        })}
      </div>
      <Spinner dark={theme} />
    </>
  );
};

export default Tokens;
