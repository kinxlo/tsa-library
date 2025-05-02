/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CustomButton } from "../../atoms/button";

export const Navbar = ({
  logo,
  links = [],
  cta,
  user,
  className,
  theme = "light",
  sticky = true,
}: NavbarProperties) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky navbar
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname?.startsWith(path));
  };

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    custom: "",
  };

  // const breakpointClass = `max-${mobileBreakpoint}:flex ${mobileBreakpoint}:hidden`;

  return (
    <nav
      className={cn(
        "w-full transition-all duration-300",
        themeClasses[theme],
        sticky && "sticky top-0 z-50",
        isScrolled && "shadow-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">{logo}</div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 lg:flex">
            {links.map((link: any) => (
              <NavItem key={link.path} link={link} isActive={isActive(link?.path)} />
            ))}
          </div>

          {/* CTA/User Area */}
          <div className="flex items-center space-x-4">
            {user || cta || (
              <div className="hidden space-x-4 lg:flex">
                <CustomButton href="/login">Sign in</CustomButton>
                <CustomButton variant="primary" href="/register">
                  Sign up
                </CustomButton>
              </div>
            )}

            {/* Mobile menu button */}
            <CustomButton
              variant="ghost"
              size="icon"
              className={cn("lg:hidden")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
            sticky ? "top-16 md:top-20" : "top-0",
          )}
        >
          <div className="space-y-2 px-4 py-3">
            {links.map((link: any) => (
              <MobileNavItem key={link.path} link={link} isActive={isActive(link?.path)} />
            ))}
            {!user && (
              <div className="flex flex-col space-y-2 pt-2">
                <CustomButton href="/login" className="w-full">
                  Sign in
                </CustomButton>
                <CustomButton variant="primary" href="/register" className="w-full">
                  Sign up
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Nav Item Component
const NavItem = ({ link, isActive }: { link: NavLink; isActive: boolean }) => {
  if (link.type === "dropdown" && link.subLinks) {
    return (
      <div className="group relative">
        <CustomButton variant="ghost" className="flex items-center gap-1">
          {link.name}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </CustomButton>
        <div className="invisible absolute left-0 mt-2 w-56 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="py-1">
            {link.subLinks.map((subLink) => (
              <Link key={subLink.path} href={subLink.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
                {subLink.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <CustomButton variant="ghost" href={link.path} className={cn(isActive && "bg-accent font-medium")}>
      {link.name}
    </CustomButton>
  );
};

// Mobile Nav Item Component
const MobileNavItem = ({ link, isActive }: { link: NavLink; isActive: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (link.type === "dropdown" && link.subLinks) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2",
            isActive && "bg-accent font-medium",
          )}
        >
          <span>{link.name}</span>
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="ml-4 space-y-1">
            {link.subLinks.map((subLink) => (
              <Link key={subLink.path} href={subLink.path} className="block rounded-md px-3 py-2 hover:bg-gray-100">
                {subLink.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.path}
      className={cn("block rounded-md px-3 py-2 hover:bg-gray-100", isActive && "bg-accent font-medium")}
    >
      {link.name}
    </Link>
  );
};
