/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { cn } from "@/lib/utils";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// import { CustomButton } from "../../atoms/button";

// type NavbarProperties = {
//   logo: React.ReactNode;
//   links?: NavLink[];
//   cta?: React.ReactNode;
//   user?: React.ReactNode;
//   className?: string;
//   mobileBreakpoint?: "sm" | "md" | "lg" | "xl";
//   theme?: "light" | "dark" | "custom";
//   sticky?: boolean;
// };

// export const Navbar = ({
//   logo,
//   links = [],
//   cta,
//   user,
//   className,
//   // mobileBreakpoint = "lg",
//   theme = "light",
//   sticky = true,
// }: NavbarProperties) => {
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll for sticky navbar
//   useEffect(() => {
//     if (!sticky) return;

//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [sticky]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   const isActive = (path: string) => {
//     return pathname === path || (path !== "/" && pathname?.startsWith(path));
//   };

//   const themeClasses = {
//     light: "bg-white text-gray-900",
//     dark: "bg-gray-900 text-white",
//     custom: "",
//   };

//   // const breakpointClass = `max-${mobileBreakpoint}:flex ${mobileBreakpoint}:hidden`;

//   return (
//     <nav
//       className={cn(
//         "w-full transition-all duration-300",
//         themeClasses[theme],
//         sticky && "sticky top-0 z-50",
//         isScrolled && "shadow-sm",
//         className,
//       )}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between md:h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0">{logo}</div>

//           {/* Desktop Navigation */}
//           <div className="hidden items-center space-x-4 lg:flex">
//             {links.map((link) => (
//               <NavItem key={link.path} link={link} isActive={isActive(link?.path)} />
//             ))}
//           </div>

//           {/* CTA/User Area */}
//           <div className="flex items-center space-x-4">
//             {user || cta || (
//               <div className="hidden space-x-4 lg:flex">
//                 <CustomButton href="/login">Sign in</CustomButton>
//                 <CustomButton variant="primary" href="/register">
//                   Sign up
//                 </CustomButton>
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <CustomButton
//               variant="ghost"
//               size="icon"
//               className={cn("lg:hidden")}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </CustomButton>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div
//           className={cn(
//             "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
//             sticky ? "top-16 md:top-20" : "top-0",
//           )}
//         >
//           <div className="space-y-2 px-4 py-3">
//             {links.map((link) => (
//               <MobileNavItem key={link.path} link={link} isActive={isActive(link?.path)} />
//             ))}
//             {!user && (
//               <div className="flex flex-col space-y-2 pt-2">
//                 <CustomButton href="/login" className="w-full">
//                   Sign in
//                 </CustomButton>
//                 <CustomButton variant="primary" href="/register" className="w-full">
//                   Sign up
//                 </CustomButton>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// // Desktop Nav Item Component
// const NavItem = ({ link, isActive }: { link: NavLink; isActive: boolean }) => {
//   if (link.type === "dropdown" && link.subLinks) {
//     return (
//       <div className="group relative">
//         <CustomButton variant="ghost" className="flex items-center gap-1">
//           {link.name}
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </CustomButton>
//         <div className="invisible absolute left-0 mt-2 w-56 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
//           <div className="py-1">
//             {link.subLinks.map((subLink) => (
//               <Link key={subLink.path} href={subLink.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
//                 {subLink.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <CustomButton variant="ghost" href={link.path} className={cn(isActive && "bg-accent font-medium")}>
//       {link.name}
//     </CustomButton>
//   );
// };

// // Mobile Nav Item Component
// const MobileNavItem = ({ link, isActive }: { link: NavLink; isActive: boolean }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   if (link.type === "dropdown" && link.subLinks) {
//     return (
//       <div className="space-y-1">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={cn(
//             "flex w-full items-center justify-between rounded-md px-3 py-2",
//             isActive && "bg-accent font-medium",
//           )}
//         >
//           <span>{link.name}</span>
//           <svg
//             className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>
//         {isOpen && (
//           <div className="ml-4 space-y-1">
//             {link.subLinks.map((subLink) => (
//               <Link key={subLink.path} href={subLink.path} className="block rounded-md px-3 py-2 hover:bg-gray-100">
//                 {subLink.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <Link
//       href={link.path}
//       className={cn("block rounded-md px-3 py-2 hover:bg-gray-100", isActive && "bg-accent font-medium")}
//     >
//       {link.name}
//     </Link>
//   );
// };
"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, forwardRef, useEffect, useState } from "react";

import { CustomButton } from "../../atoms/button";
import { Logo } from "../../atoms/logo";
import { MobileNavbar } from "./mobile-nav";

export const Navbar: FC<TsaNavbarProperties> = ({
  logoPath = "",
  navLinks,
  children,
  bgScrollColor,
  linkClassName,
  className,
}) => {
  const [scrolling, setIsScrolling] = useState<boolean>(false);
  const pathname = usePathname();

  const handleScrollEvent = () => {
    setIsScrolling(window.scrollY > 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const isActiveLink = (link: string) => pathname === link;

  return (
    <section
      className={`${
        scrolling ? `shadow-md ${bgScrollColor}` : "shadow-none"
      } sticky top-0 right-0 left-0 z-40 ${className}`}
    >
      {/* {showBanner && <Banner duration={bannerDuration || `1m`} />} */}
      <nav>
        <div
          className={`relative mx-auto flex w-full max-w-[1240px] items-center justify-between gap-x-4 px-4 py-4 transition-all duration-500 md:py-6 xl:px-0`}
        >
          <Logo logo={logoPath} />
          <NavigationMenu className="hidden w-full items-center justify-center gap-x-4 lg:flex lg:gap-x-6">
            {navLinks?.map((item: any, index: number) =>
              item?.dropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "flex gap-1",
                      "bg-transparent active:bg-transparent",
                      isActiveLink(item.link) ? "text-blue-500 underline" : "hover:text-mid-danger text-white",
                      linkClassName,
                    )}
                  >
                    <p>{item.route}</p>
                    <div className="mt-1">
                      <ChevronDown className="text-current" size={`.8rem`} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item?.dropdown?.map((link: any) => (
                        <ListItem
                          key={link.title}
                          title={link.title}
                          href={link.href}
                          className={isActiveLink(link.href) ? "bg-gray-200 text-black" : ""}
                        >
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
                        "bg-transparent text-sm",
                        isActiveLink(item.link) ? "text-blue-500 underline" : "hover:text-mid-danger text-white",
                        linkClassName,
                      )}
                    >
                      {item.route}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              ),
            )}
          </NavigationMenu>
          <div className="hidden w-fit items-center justify-end gap-x-2 justify-self-end lg:flex lg:gap-x-4">
            {children || (
              <CustomButton href="/signin" variant="primary" className="bg-mid-blue h-[47px] w-[97px] rounded-lg">
                Sign In
              </CustomButton>
            )}
          </div>
          <section className="lg:hidden">
            <MobileNavbar linkClassName={linkClassName} navLinks={navLinks} logoPath={""} />
          </section>
        </div>
      </nav>
    </section>
  );
};

export const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...properties }, reference) => {
    const pathname = usePathname(); // Get the current path
    const isActive = pathname === properties.href;

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={reference}
            className={cn(
              "block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
              isActive ? "bg-gray-200 text-black" : "hover:bg-accent hover:text-accent-foreground",
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
