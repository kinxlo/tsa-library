import * as React from "react";
declare function Breadcrumb({ ...properties }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbList({ className, ...properties }: React.ComponentProps<"ol">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbItem({ className, ...properties }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...properties }: React.ComponentProps<"a"> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbPage({ className, ...properties }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...properties }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbEllipsis({ className, ...properties }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };
