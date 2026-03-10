"use client";

type Props = {
  html: string;
  cssLinks: string[];
  styleBlocks: string[];
};

export default function ContactHero({ html, cssLinks, styleBlocks }: Props) {
  return (
    /*
     * negative marginTop cancels whatever padding-top the Next.js layout
     * applies to <main> for the fixed navbar height.
     * Adjust the value (e.g. -72px, -80px) to match your navbar height.
     */
    <div
      className="wp-contact"
      style={{ marginTop: "calc(-1 * var(--navbar-height, 0px))" }}
    >
      <div className="elementor elementor-4417 elementor-location-single">
        {/* Elementor external CSS */}
        {cssLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}

        {/* Elementor inline style blocks */}
        {styleBlocks.map((css, i) => (
          <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
        ))}

        {/* WordPress page HTML */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}