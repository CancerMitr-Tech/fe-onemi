"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROGRAM_LINKS } from "@/constants/nav";

export default function NavDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg border border-gray-100 min-w-[220px] z-50 overflow-hidden"
    >
      {PROGRAM_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block px-6 py-4 text-[#1A1A2E] hover:text-[#E85D04] hover:bg-orange-50 transition-colors text-sm font-medium border-b border-gray-50 last:border-0"
        >
          {link.label}
        </Link>
      ))}
    </motion.div>
  );
}
