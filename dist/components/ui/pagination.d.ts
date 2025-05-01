import { Button } from './button';
import * as React from "react";
declare function Pagination({ className, ...properties }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
declare function PaginationContent({ className, ...properties }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
declare function PaginationItem({ ...properties }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
type PaginationLinkProperties = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> & React.ComponentProps<"a">;
declare function PaginationLink({ className, isActive, size, ...properties }: PaginationLinkProperties): import("react/jsx-runtime").JSX.Element;
declare function PaginationPrevious({ className, ...properties }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationNext({ className, ...properties }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationEllipsis({ className, ...properties }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
