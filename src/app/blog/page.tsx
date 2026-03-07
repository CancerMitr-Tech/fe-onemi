import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WP_API, decodeEntities, formatDate } from "@/lib/blog";
import { BASE_URL } from "@/constants/metadata";

export const revalidate = 3600;

const PER_PAGE = 9;

export const metadata: Metadata = {
  title: "Blog — Health & Wellness Insights",
  description:
    "Expert articles on cancer care, wellness, AI-powered health management, and more from the oneMi team.",
  openGraph: {
    title: "Blog — Health & Wellness Insights | oneMi",
    description:
      "Expert articles on cancer care, wellness, AI-powered health management, and more.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Health & Wellness Insights | oneMi",
  },
};

async function getPosts(page: number) {
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=${PER_PAGE}&page=${page}&_embed`,
      { next: { revalidate: 3600 } }
    );
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
    const data = await res.json();

    const posts = Array.isArray(data)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((p: any) => ({
          id: p.id as number,
          title: decodeEntities(p.title.rendered as string),
          slug: p.slug as string,
          date: p.date as string,
          excerpt: decodeEntities(
            ((p.excerpt?.rendered as string) ?? "").replace(/<[^>]+>/g, "")
          ),
          img: (p._embedded?.["wp:featuredmedia"]?.[0]?.source_url as string) ?? "",
          categories: (p._embedded?.["wp:term"]?.[0]?.map(
            (t: { name: string }) => t.name
          ) ?? []) as string[],
        }))
      : [];

    return { posts, totalPages };
  } catch {
    return { posts: [], totalPages: 1 };
  }
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  // Show up to 5 page numbers centred around current page
  const delta = 2;
  const start = Math.max(1, page - delta);
  const end = Math.min(totalPages, page + delta);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      {page > 1 && (
        <Link
          href={`/blog?page=${page - 1}`}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          ← Previous
        </Link>
      )}
      {start > 1 && (
        <>
          <Link href="/blog?page=1" className="w-9 h-9 flex items-center justify-center rounded-lg text-sm border border-gray-200 text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors">1</Link>
          {start > 2 && <span className="text-[#9CA3AF] text-sm px-1">…</span>}
        </>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={`/blog?page=${p}`}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? "bg-brand-orange text-white"
              : "border border-gray-200 text-brand-dark hover:border-brand-orange hover:text-brand-orange"
          }`}
        >
          {p}
        </Link>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-[#9CA3AF] text-sm px-1">…</span>}
          <Link href={`/blog?page=${totalPages}`} className="w-9 h-9 flex items-center justify-center rounded-lg text-sm border border-gray-200 text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors">{totalPages}</Link>
        </>
      )}
      {page < totalPages && (
        <Link
          href={`/blog?page=${page + 1}`}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          Next →
        </Link>
      )}
    </div>
  );
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  const { posts, totalPages } = await getPosts(page);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#F9FAFB] py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
          Our <span className="text-brand-orange">Blog</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-sm sm:text-base">
          Expert articles on health management, cancer care, wellness, and AI-powered care.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-brand-muted py-20">No posts found.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-50 shrink-0">
                    {post.img ? (
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#FEF3EC] to-[#FDE8D4]" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {post.categories.length > 0 && (
                      <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-2">
                        {post.categories[0]}
                      </span>
                    )}
                    <h2 className="text-base font-bold text-brand-dark group-hover:text-brand-orange transition-colors leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-brand-muted leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-[#9CA3AF] mt-3">{formatDate(post.date)}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} />
          </>
        )}
      </div>
    </div>
  );
}