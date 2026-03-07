export const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://onemi.ai/wp-json/wp/v2";

export function decodeEntities(raw: string): string {
  return raw
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201c")
    .replace(/&#8221;/g, "\u201d")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export type WPPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  categories: string[];
  img: string;
};

export type NavPost = { title: string; slug: string };

export async function fetchPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const p = data[0];
    const terms: string[] =
      p._embedded?.["wp:term"]?.[0]?.map((t: { name: string }) => t.name) ?? [];
    const rawExcerpt: string = p.excerpt?.rendered ?? "";
    return {
      id: p.id,
      title: decodeEntities(p.title.rendered),
      content: p.content.rendered,
      excerpt: decodeEntities(rawExcerpt.replace(/<[^>]+>/g, "")),
      date: p.date,
      categories: terms,
      img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
      slug,
    };
  } catch {
    return null;
  }
}

export async function fetchAdjacentPosts(
  date: string
): Promise<{ prev: NavPost | null; next: NavPost | null }> {
  const [prevData, nextData] = await Promise.all([
    fetch(
      `${WP_API}/posts?before=${encodeURIComponent(date)}&per_page=1&orderby=date&order=desc&_fields=title,slug`,
      { next: { revalidate: 3600 } }
    )
      .then((r) => r.json())
      .catch(() => []),
    fetch(
      `${WP_API}/posts?after=${encodeURIComponent(date)}&per_page=1&orderby=date&order=asc&_fields=title,slug`,
      { next: { revalidate: 3600 } }
    )
      .then((r) => r.json())
      .catch(() => []),
  ]);

  return {
    prev:
      Array.isArray(prevData) && prevData.length > 0
        ? { title: decodeEntities(prevData[0].title.rendered), slug: prevData[0].slug }
        : null,
    next:
      Array.isArray(nextData) && nextData.length > 0
        ? { title: decodeEntities(nextData[0].title.rendered), slug: nextData[0].slug }
        : null,
  };
}

export async function fetchRecentAndRelated(
  currentSlug: string
): Promise<{
  recentPosts: Pick<WPPost, "id" | "title" | "slug" | "date">[];
  relatedArticles: Pick<WPPost, "id" | "title" | "slug" | "img">[];
}> {
  const [recentData, relatedData] = await Promise.all([
    fetch(`${WP_API}/posts?per_page=5&_fields=id,title,slug,date`, {
      next: { revalidate: 3600 },
    })
      .then((r) => r.json())
      .catch(() => []),
    fetch(`${WP_API}/posts?per_page=4&_embed`, {
      next: { revalidate: 3600 },
    })
      .then((r) => r.json())
      .catch(() => []),
  ]);

  const recentPosts = Array.isArray(recentData)
    ? recentData.map((p: { id: number; title: { rendered: string }; slug: string; date: string }) => ({
        id: p.id,
        title: decodeEntities(p.title.rendered),
        slug: p.slug,
        date: p.date,
      }))
    : [];

  const relatedArticles = Array.isArray(relatedData)
    ? relatedData
        .filter((p: { slug: string }) => p.slug !== currentSlug)
        .slice(0, 3)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((p: any) => ({
          id: p.id,
          title: decodeEntities(p.title.rendered),
          slug: p.slug,
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        }))
    : [];

  return { recentPosts, relatedArticles };
}
