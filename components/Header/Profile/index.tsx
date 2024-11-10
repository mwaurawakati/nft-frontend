import { useEffect, useRef } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Icon from "@/components/Icon";
import Wallet from "./Wallet";

const menu = [
    {
        title: "My profile",
        url: "/profile",
    },
    {
        title: "Settings",
        url: "/settings",
    },
    {
        title: "Help",
        url: "/help",
    },
];

type ProfileProps = {
    className?: string;
    headClassName?: string;
    bodyClassName?: string;
    visible: any;
    onOpen: () => void;
    onClose: () => void;
};

const Profile = ({
        className,
        headClassName,
        bodyClassName,
        onOpen,
        onClose,
        visible,
    }: ProfileProps) => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            visible ? disablePageScroll() : enablePageScroll();
        }
    }, [visible]);

    return (
        <OutsideClickHandler onOutsideClick={onClose}>
            <div
                className={cn(
                    styles.profile,
                    { [styles.active]: visible },
                    className
                )}
            >
                <button
                    className={cn(styles.head, headClassName)}
                    onClick={onOpen}
                >
                    <Image
                        src="/images/avatar.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </button>
                <div className={cn(styles.body, bodyClassName)}>
                    <button
                        className={cn(
                            "button-circle button-medium",
                            styles.close
                        )}
                        onClick={onClose}
                    >
                        <Icon name="close-fat" />
                    </button>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/avatar.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={cn("h3", styles.man)}>Dash</div>
                            <div className={styles.login}>@randomdash</div>
                        </div>
                    </div>
                    <Wallet onDisconnect={onClose} />
                    <div className={styles.menu}>
                        {menu.map((link, index) => (
                            <NavLink
                                className={cn(styles.link)}
                                activeClassName={styles.active}
                                href={link.url}
                                key={index}
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Profile;
