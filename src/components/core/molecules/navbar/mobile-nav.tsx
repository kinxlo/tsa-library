/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListItem } from ".";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { FC } from "react";

import { CustomButton } from "../../atoms/button";

export const MobileNavbar: FC<TsaNavbarProperties> = ({ navLinks, linkClassName, children }) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded-sm bg-white" asChild>
        <Menu className="text-black" />
      </SheetTrigger>
      <SheetContent side="top" className="p-10">
        <NavigationMenu className="mx-auto flex max-w-xl flex-col gap-3">
          {navLinks?.map((item, index) =>
            item?.dropdown ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-1",
                    "hover:text-mid-danger bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                    "text-black focus:text-black active:text-black",
                    linkClassName,
                  )}
                >
                  <p className="hover:text-mid-danger text-black">{item.route}</p>
                  <div className="ml-1">
                    <ChevronDown className="text-black" size={`.8rem`} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item?.dropdown?.map((link: any) => (
                      <ListItem key={link.title} title={link.title} href={link.href}>
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavigationMenuList key={index}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.link}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:text-mid-danger bg-transparent text-sm hover:bg-transparent hover:underline focus:bg-transparent",
                    )}
                  >
                    {item.route}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            ),
          )}
          <div className="flex w-full items-center justify-center gap-x-2 md:gap-x-4">
            {children || (
              <CustomButton href="/signin" variant="primary" className="bg-mid-blue h-[47px] w-[97px] rounded-lg">
                Sign In
              </CustomButton>
            )}
          </div>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};
