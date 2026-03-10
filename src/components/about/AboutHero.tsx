"use client";

import { useEffect } from "react";

type Props = {
  html: string;
  cssLinks: string[];
  styleBlocks: string[];
};

export default function AboutHero({ html, cssLinks, styleBlocks }: Props) {
  useEffect(() => {
    import("@/lib/about-page-effects").then((m) => {
      m.initAll();
    });
  }, []);

  return (
    <div className="wp-about elementor-3813">
      {/* Elementor external CSS (core, page-specific, Google Fonts) */}
      {cssLinks.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}

      {/* Elementor inline style blocks (custom properties, kit styles) */}
      {styleBlocks.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}

      {/* Page HTML from WordPress REST API */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
