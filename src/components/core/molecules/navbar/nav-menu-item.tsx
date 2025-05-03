"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

interface NavItemProperties extends React.HTMLAttributes<HTMLElement> {
  links: NavLink[];
  isMobile?: boolean;
}

export const NavItems: React.FC<NavItemProperties> = ({ links, isMobile, className }) => {
  return (
    <NavigationMenu className={cn(isMobile && "block max-w-full", className)}>
      <NavigationMenuList className={cn(isMobile && "block")}>
        {links.map((link) => {
          if (link.type === "dropdown" && link.subLinks) {
            return (
              <NavigationMenuItem key={link.id}>
                <NavigationMenuTrigger className={`w-full`}>{link.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[600px] md:grid-cols-2">
                    {link.subLinks.map((subLink) => (
                      <ListItem key={subLink.id} href={subLink.href} title={subLink.title}>
                        {subLink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={link.id}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full")}>
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...properties }, reference) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={reference}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
              className,
            )}
            {...properties}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
