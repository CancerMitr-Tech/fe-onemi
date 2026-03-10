"use client";

/**
 * HashLink — drop-in replacement for <a href="#section">
 * Always scrolls to the target even if URL hash is already the same.
 *
 * Usage:
 *   <HashLink href="#partners">Partners</HashLink>
 *
 * Replace every <a href="#..."> or <Link href="#..."> in your
 * Navbar / Footer with this component.
 */

import { useHashScroll } from "@/components/hook/Usehashscroll";

interface HashLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  offset?: number; // navbar height in px, default 80
}

export default function HashLink({
  href,
  offset = 80,
  children,
  className,
  ...rest
}: HashLinkProps) {
  const scrollTo = useHashScroll(offset);

  return (
    <a href={href} onClick={scrollTo} className={className} {...rest}>
      {children}
    </a>
  );
}