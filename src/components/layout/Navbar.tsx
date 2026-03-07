"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, User } from "lucide-react";
import Logo from "@/components/ui/Logo";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/constants/nav";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { clearToken } from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const userName = useSelector((state: RootState) => state.auth.userName);

  // Hydrate from localStorage if Redux isn't populated yet (client-side)
  const [hydrated, setHydrated] = useState(false);
  const [localToken, setLocalToken] = useState<string | null>(null);
  useEffect(() => {
    setLocalToken(localStorage.getItem("auth_token"));
    setHydrated(true);
  }, [token]); // re-run when redux token changes

  const isLoggedIn = !!(token ?? localToken);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/about") return pathname === "/about";
    return false;
  };

  function handleLogout() {
    const t = token ?? localStorage.getItem("auth_token");
    if (t) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
        method: "POST",
        headers: { "auth-token": t },
      }).catch(() => {});
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    localStorage.removeItem("mhr_cart");
    localStorage.removeItem("mhr_order");
    dispatch(clearToken());
    dispatch(clearCart());
    setProfileOpen(false);
    router.push("/");
  }

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        >
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 list-none">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <li key={link.label} className="relative">
                    <button
                      className="flex items-center gap-1 font-medium text-[#1A1A2E] hover:text-[#E85D04] transition-colors"
                      onClick={() => setDropdownOpen((v) => !v)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && <NavDropdown />}
                    </AnimatePresence>
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-[#E85D04]"
                        : "text-[#1A1A2E] hover:text-[#E85D04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* Auth area */}
            {hydrated && (
              isLoggedIn ? (
                <li className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-label="Profile menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{initials}</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50"
                      >
                        {userName && (
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs text-[#6B7280]">Signed in as</p>
                            <p className="text-sm font-semibold text-[#1A1A2E] truncate">{userName}</p>
                          </div>
                        )}
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1A1A2E] hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1A1A2E] hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="bg-[#E85D04] hover:bg-[#C94E03] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
                  >
                    Login
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile: burger + optional profile icon */}
          <div className="flex md:hidden items-center gap-3">
            {hydrated && isLoggedIn && (
              <Link href="/profile" aria-label="Profile">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{initials}</span>
                </div>
              </Link>
            )}
            <button
              className="p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-[#1A1A2E]" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            onClose={() => setMobileOpen(false)}
            activePath={pathname}
            isLoggedIn={isLoggedIn}
          />
        )}
      </AnimatePresence>
    </>
  );
}
