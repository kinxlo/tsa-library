type NavbarProperties = {
    logo: React.ReactNode;
    links?: NavLink[];
    cta?: React.ReactNode;
    user?: React.ReactNode;
    className?: string;
    mobileBreakpoint?: "sm" | "md" | "lg" | "xl";
    theme?: "light" | "dark" | "custom";
    sticky?: boolean;
};
export declare const Navbar: ({ logo, links, cta, user, className, theme, sticky, }: NavbarProperties) => import("react/jsx-runtime").JSX.Element;
export {};
