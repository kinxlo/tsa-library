"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

import Button from "../../atoms/button";
import { Logo } from "../../atoms/logo";
import { Wrapper } from "../../atoms/wrapper";
import { NavItems } from "./nav-menu-item";

export const Navbar = forwardRef<HTMLElement, NavbarProperties>(
  (
    {
      logo = <Logo logo="/images/logo-black.png" />,
      links = NAV_LINKS,
      cta,
      user,
      className,
      navbarStyle,
      sticky = true,
    },
    reference,
  ) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
      <nav
        ref={reference}
        className={cn("w-full transition-all duration-300", sticky && "fixed top-0 z-50", navbarStyle)}
      >
        <Wrapper className={`p-0`}>
          <div className={cn("flex h-16 items-center justify-between md:h-24", className)}>
            <div className="flex-shrink-0">{logo}</div>
            <NavItems links={links} className={`hidden lg:block`} />
            <div className="flex items-center gap-4">
              <div className="hidden gap-4 lg:flex">
                {user || cta || (
                  <>
                    <Button href="/login">Sign in</Button>
                    <Button variant="accent" href="/register">
                      Sign up
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                isIconOnly
                icon={isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              />
            </div>
          </div>
        </Wrapper>

        {isMobileMenuOpen && (
          <div
            className={cn(
              "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
              sticky ? "top-16 md:top-20" : "top-0",
            )}
          >
            <div className="space-y-2 px-4 py-3">
              <NavItems links={links} isMobile />
              <div className="flex flex-col space-y-2 pt-2">
                {user || cta || (
                  <>
                    <Button href="/login">Sign in</Button>
                    <Button variant="accent" href="/register">
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
