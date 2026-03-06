"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS, PROGRAM_LINKS } from "@/constants/nav";

interface MobileMenuProps {
  onClose: () => void;
  activePath: string;
}

export default function MobileMenu({ onClose, activePath }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-2xl font-bold">
          <span className="text-[#1A1A2E]">one</span>
          <span className="text-[#E85D04]">Mi</span>
        </span>
        <button onClick={onClose} aria-label="Close menu">
          <X className="w-6 h-6 text-[#1A1A2E]" />
        </button>
      </div>
      <nav className="flex flex-col px-6 py-4 gap-1">
        {NAV_LINKS.filter((l) => !l.hasDropdown).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`py-3 text-lg font-medium border-b border-gray-100 ${
              activePath === link.href ? "text-[#E85D04]" : "text-[#1A1A2E]"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="py-2">
          <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">
            Our Programs
          </p>
          {PROGRAM_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block py-2 text-base text-[#1A1A2E] hover:text-[#E85D04] pl-3"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
