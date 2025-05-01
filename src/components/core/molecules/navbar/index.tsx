"use client";

import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Navbar = ({
  logo,
  links = [],
  cta,
  user,
  className,
  mobileBreakpoint = "lg",
  theme = "light",
  sticky = true,
}: NavbarProperties) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky navbar with shadow
  useEffect(() => {
    if (sticky) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [sticky]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Determine active link
  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  // Theme classes
  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    custom: "",
  };

  const mobileMenuBreakpoint = {
    sm: "sm:hidden",
    md: "md:hidden",
    lg: "lg:hidden",
    xl: "xl:hidden",
  };

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
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">{logo}</div>

          {/* Desktop Navigation */}
          <div className={`hidden ${mobileBreakpoint}:flex items-center space-x-4`}>
            {links.map((link) => (
              <NavItem key={link.path} link={link} isActive={isActive(link.path)} />
            ))}
          </div>

          {/* CTA/User Area */}
          <div className="flex items-center space-x-4">
            {user ?? cta ?? (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 md:block"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="hidden rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 md:block"
                >
                  Sign up
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none ${mobileMenuBreakpoint[mobileBreakpoint]}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          `${mobileBreakpoint}:hidden fixed inset-x-0 z-40 w-full origin-top transform overflow-hidden bg-white shadow-md transition-all duration-300`,
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        )}
        style={{ top: sticky ? "5rem" : "4rem" }} // Adjust based on navbar height
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {links.map((link) => (
            <MobileNavItem key={link.path} link={link} isActive={isActive(link.path)} />
          ))}
          {!user && (
            <>
              <Link href="/login" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100">
                Sign in
              </Link>
              <Link
                href="/register"
                className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop Nav Item Component
const NavItem = ({ link, isActive }: { link: NavLink; isActive: boolean }) => {
  if (link.type === "dropdown" && link.subLinks) {
    return (
      <div className="group relative">
        <button className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">
          <span>{link.name}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="ring-opacity-5 invisible absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="py-1">
            {link.subLinks.map((subLink) => (
              <Link
                key={subLink.path}
                href={subLink.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {subLink.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={link.path}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
        isActive && "bg-gray-200 font-semibold",
      )}
    >
      {link.name}
    </Link>
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
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
        >
          <span>{link.name}</span>
          <svg
            className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
              <Link
                key={subLink.path}
                href={subLink.path}
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
              >
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
      className={cn(
        "block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100",
        isActive && "bg-gray-200 font-semibold",
      )}
    >
      {link.name}
    </Link>
  );
};
