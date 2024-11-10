import { useEffect, useRef, useState } from "react";
import styles from "./Notice.module.sass";
import List from "@/components/List";
import Notifications from "./Notifications";
import Filters from "./Filters";
import Offer from "./Offer";
import Preview from "./Preview";

import { notifications } from "@/mocks/notifications";
import { filters } from "@/mocks/filters";


import { changeNotifyList } from "@/utils/api/reducers/notify.reducers";
import { config } from "@/utils/api/config";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/utils/api/hooks";
import { selectNotifyList } from "@/utils/api/reducers/notify.reducers";
import { selectCurrentUser } from "@/utils/api/reducers/auth.reducers";
import axios from "axios";
// import ButtonPrimary from "components/Button/ButtonPrimary";
// import Avatar from "components/StyleComponent/Avatar";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
// import { TbMoodEmpty } from "react-icons/tb";
// import MainSection from "components/Section/MainSection";

type NoticeProps = {};

const Notice = ({}: NoticeProps) => {
    const [sorting, setSorting] = useState<string>("notification");
    const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

    const tabsTokens = [
        {
            title: "Notification",
            value: "notification",
            counter: "24",
        },
        // {
        //     title: "Activity",
        //     value: "activity",
        //     counter: "0",
        // },
    ];

    const onSelectAll = () => {
        setSelectedFilters(filters.map((x: any) => x.value));
    };

    const onDeselectAll = () => {
        setSelectedFilters([]);
    };

    // //////////////
  const [activeIndex, setActiveIndex] = useState(1);
  const notifiesList = useAppSelector(selectNotifyList);
  const currentUsr = useAppSelector(selectCurrentUser);
  const userRef = useRef<any>();
//   const navigate = useNavigate();
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [processing, setProcessing] = useState(false);


  useEffect(() => {
    if (currentUsr) {
      userRef.current = currentUsr._id;
    }
  }, [currentUsr]);

//   console.log(":::::notifiesList",notifiesList)


  const getNotifiesByLimit = (limit:any, userId:any, filter:any = []) => {
    setProcessing(true);
    axios
      .post(
        `${config.baseUrl}notify/getlist`,
        { limit, userId, filter },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((result) => {
        dispatch(changeNotifyList(result.data.data));
        setProcessing(false);
      })
      .catch(() => {
        setProcessing(false);
      });
  };


  const getMyNotifiesByLimit = (limit:any, userId:any, filter:any = []) => {
    setProcessing(true);
    axios
      .post(
        `${config.baseUrl}notify/getmylist`,
        { limit, userId, filter },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((result) => {
        dispatch(changeNotifyList(result.data.data));
        setProcessing(false);
      })
      .catch(() => {
        setProcessing(false);
      });
  };

  const markAllAsRead = (notifyIds:any, userId:any) => {
    setProcessing(true);
    axios
      .post(
        `${config.baseUrl}notify/markAllAsRead`,
        { notifyIds, userId },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(() => {
        setTimeout(() => {
          if (activeIndex === 1) {
            getNotifiesByLimit(50, userRef.current, [5]);
          } else if (activeIndex === 0) {
            getMyNotifiesByLimit(50, userRef.current);
          } else {
            getNotifiesByLimit(50, userRef.current);
          }
        }, 2000);
        setProcessing(false);
      })
      .catch(() => {
        setProcessing(false);
      });
  };

//   const onClickMarkAllAsRead = () => {
//     if (notifiesList && notifiesList.length > 0) {
//       let idList = [];
//       let j;
//       for (j = 0; j < notifiesList.length; j++)
//         idList.push(notifiesList[j]._id);
//       markAllAsRead(idList, userRef.current);
//       dispatch(changeNotifyList());
//     }
//   };

  useEffect(() => {
    var reshapedFilters = [];
    if (selectedFilters && selectedFilters.length > 0) {
      for (var j = 0; j < selectedFilters.length; j++) {
        if (!selectedFilters[j].checked) continue;
        switch (selectedFilters[j].label) {
          default:
            break;
          case "Sales":
            reshapedFilters.push(1);
            break;
          case "Listings":
            reshapedFilters.push(2);
            break;
          case "Bids":
            reshapedFilters.push(3);
            break;
          case "Burns":
            reshapedFilters.push(4);
            break;
          case "Followings":
            reshapedFilters.push(5);
            break;
          case "Likes":
            reshapedFilters.push(6);
            break;
          case "Purchase":
            reshapedFilters.push(7);
            break;
          case "Transfers":
            reshapedFilters.push(8);
            break;
        }
      }
    }
    if (reshapedFilters.length > 0) {
      getNotifiesByLimit(50, userRef.current, reshapedFilters);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (activeIndex === 1) {
      getNotifiesByLimit(50, userRef.current, [5]);
    } else if (activeIndex === 0) {
      getMyNotifiesByLimit(50, userRef.current);
    } else {
      getNotifiesByLimit(50, userRef.current);
    }
  }, [activeIndex]);

  const goDetail = (url:string) => {
    // navigate(url);
    router.push(url);
  };

//   ///////////////

const newNotifies = [
    {
        month: "",
        items: notifiesList
    }
]

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <List
                    tabs={tabsTokens}
                    tabsValue={sorting}
                    setTabsValue={setSorting}
                >
                    {sorting === "notification" ? (
                        // <Notifications items={notifications} />
                        <Notifications items={newNotifies} />
                    ) : (
                        <Offer />
                    )}
                </List>
            </div>
            <div className={styles.col}>
                {sorting === "notification" ? (
                    <Filters
                        filters={filters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        onSelectAll={onSelectAll}
                        onDeselectAll={onDeselectAll}
                    />
                ) : (
                    <Preview />
                )}
            </div>
        </div>
    );
};

export default Notice;
