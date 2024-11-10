import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./NavLink.module.sass";
import Icon from "@/components/Icon";

type NavLinkProps = {
    className?: string;
    activeClassName?: any;
    href: string;
    children: React.ReactNode;
};

const NavLink = ({
    className,
    activeClassName,
    href,
    children,
}: NavLinkProps) => {
    const router = useRouter();

    return (
        <Link href={href}>
            <a
                className={cn("h3", styles.link, className, {
                    [styles.active]: router.pathname === href,
                })}
            >
                <div className={styles.title}>
                    {children}
                    <span className={styles.hover}>{children}</span>
                </div>
                <Icon name="arrow-right" />
            </a>
        </Link>
    );
};

export default NavLink;
