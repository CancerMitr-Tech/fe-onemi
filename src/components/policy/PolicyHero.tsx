"use client";

type Props = {
  html: string;
  title: string;
  cssLinks: string[];
  styleBlocks: string[];
};

export default function PolicyHero({ html }: Props) {
  // We intentionally ignore cssLinks and styleBlocks —
  // Elementor CSS is unreliable in Next.js (CORS, SSR fetch issues).
  // Our policy.css handles all styling directly on WP raw HTML.
  return (
    <div className="wp-policy">
      <div className="wp-policy-inner">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}