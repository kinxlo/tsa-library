"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

import { TSAButton } from "../../atoms/button";
import { Logo } from "../../atoms/logo";
import { NavItems } from "./nav-menu-item";

export const Navbar = forwardRef<HTMLElement, NavbarProperties>(
  (
    { logo = <Logo logo="/images/logo-black.png" />, links = NAV_LINKS, cta, user, className, sticky = true },
    reference,
  ) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      if (!sticky) return;
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [sticky]);

    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
      <nav
        ref={reference}
        className={cn(
          "w-full transition-all duration-300",
          sticky && "sticky top-0 z-50",
          isScrolled && "shadow-sm",
          className,
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="flex-shrink-0">{logo}</div>

            <NavItems links={links} className={`hidden lg:block`} />

            <div className="flex items-center space-x-4">
              {user || cta || (
                <div className="hidden space-x-4 lg:flex">
                  <TSAButton href="/login">Sign in</TSAButton>
                  <TSAButton variant="primary" href="/register">
                    Sign up
                  </TSAButton>
                </div>
              )}

              <TSAButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </TSAButton>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className={cn(
              "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
              sticky ? "top-16 md:top-20" : "top-0",
            )}
          >
            <div className="space-y-2 px-4 py-3">
              <NavItems links={links} isMobile />
              {!user && (
                <div className="flex flex-col space-y-2 pt-2">
                  <TSAButton href="/login" className="w-full">
                    Sign in
                  </TSAButton>
                  <TSAButton variant="primary" href="/register" className="w-full">
                    Sign up
                  </TSAButton>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
