import * as React from "react";
interface NavItemProperties extends React.HTMLAttributes<HTMLElement> {
    links: NavLink[];
    isMobile?: boolean;
}
export declare const NavItems: React.FC<NavItemProperties>;
export {};
