"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const API_BASE = "https://onemi.ai/wp-json/wp/v2";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
  categories: string[];
  img: string;
};

type NavPost = {
  title: string;
  slug: string;
};

type ArticleCard = {
  id: number;
  title: string;
  slug: string;
  img: string;
};

type RecentPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
};

function decodeEntities(raw: string) {
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


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [prevPost, setPrevPost] = useState<NavPost | null>(null);
  const [nextPost, setNextPost] = useState<NavPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<ArticleCard[]>([]);

  // Contact form
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Fetch main post
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setPost(null);
    setPrevPost(null);
    setNextPost(null);

    fetch(`${API_BASE}/posts?slug=${slug}&_embed`)
      .then((r) => r.json())
      .then(async (data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setNotFound(true);
          return;
        }
        const p = data[0];
        const terms: string[] =
          p._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) ?? [];

        setPost({
          id: p.id,
          title: decodeEntities(p.title.rendered),
          content: p.content.rendered,
          date: p.date,
          categories: terms,
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        });

        // Fetch previous post (published before this one)
        fetch(
          `${API_BASE}/posts?before=${encodeURIComponent(p.date)}&per_page=1&orderby=date&order=desc&_fields=title,slug`
        )
          .then((r) => r.json())
          .then((d) => {
            if (Array.isArray(d) && d.length > 0)
              setPrevPost({ title: decodeEntities(d[0].title.rendered), slug: d[0].slug });
          })
          .catch(() => {});

        // Fetch next post (published after this one)
        fetch(
          `${API_BASE}/posts?after=${encodeURIComponent(p.date)}&per_page=1&orderby=date&order=asc&_fields=title,slug`
        )
          .then((r) => r.json())
          .then((d) => {
            if (Array.isArray(d) && d.length > 0)
              setNextPost({ title: decodeEntities(d[0].title.rendered), slug: d[0].slug });
          })
          .catch(() => {});
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch sidebar recent posts
  useEffect(() => {
    fetch(`${API_BASE}/posts?per_page=5&_fields=id,title,slug,date`)
      .then((r) => r.json())
      .then((data: any[]) =>
        setRecentPosts(
          data.map((p) => ({
            id: p.id,
            title: decodeEntities(p.title.rendered),
            slug: p.slug,
            date: p.date,
          }))
        )
      )
      .catch(() => {});
  }, []);

  // Fetch related/recent articles for bottom section
  useEffect(() => {
    fetch(`${API_BASE}/posts?per_page=4&_embed`)
      .then((r) => r.json())
      .then((data: any[]) => {
        const cards: ArticleCard[] = data
          .filter((p) => p.slug !== slug)
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            title: decodeEntities(p.title.rendered),
            slug: p.slug,
            img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
          }));
        setRelatedArticles(cards);
      })
      .catch(() => {});
  }, [slug]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
    }, 1000);
  }

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
            <div className="h-72 bg-gray-200 rounded-xl mb-8" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full mb-3" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-[#6B7280] mb-4">Blog post not found.</p>
          <button
            onClick={() => router.back()}
            className="text-[#E85D04] font-semibold hover:underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* ── 2-column: Article + Sidebar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* ── LEFT: Article ── */}
          <article>
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#E85D04] leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta: categories + author + date */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B7280] mb-6">
              {post.categories.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#E85D04] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#E85D04]">{post.categories.join(", ")}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                By: Admin
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {formatDate(post.date)}
              </span>
            </div>

            {/* Featured image */}
            {post.img && (
              <div className="relative w-full h-64 sm:h-80 overflow-hidden mb-8">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 700px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="
                [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-[#1A1A2E] [&_h1]:mt-6 [&_h1]:mb-3
                [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1A1A2E] [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#1A1A2E] [&_h3]:mt-5 [&_h3]:mb-2
                [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-[#1A1A2E] [&_h4]:mt-4 [&_h4]:mb-2
                [&_p]:text-[#3D3D3D] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1
                [&_li]:text-[#3D3D3D] [&_li]:text-sm [&_li]:leading-relaxed
                [&_a]:text-[#E85D04] [&_a]:underline
                [&_strong]:text-[#1A1A2E] [&_strong]:font-semibold
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#E85D04] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#6B7280] [&_blockquote]:my-4
                [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:mb-4
                [&_th]:bg-[#F9FAFB] [&_th]:text-[#1A1A2E] [&_th]:font-semibold [&_th]:px-3 [&_th]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:text-left
                [&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-gray-200 [&_td]:text-[#3D3D3D]
                [&_img]:rounded-lg [&_img]:w-full [&_img]:my-4
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">

            {/* Recent Posts */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-white px-5 py-4 border-b-2 border-[#E85D04]">
                <h3 className="text-base font-bold text-[#1A1A2E]">Recent Posts</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {recentPosts.map((rp) => (
                  <li key={rp.id}>
                    <a
                      href={`/blog/${rp.slug}`}
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <p className="text-sm font-medium text-[#1A1A2E] group-hover:text-[#E85D04] transition-colors leading-snug">
                        {rp.title}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{formatDate(rp.date)}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Send Us A Message */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-bold text-[#1A1A2E] text-center mb-4">
                Send Us A Message
              </h3>
              {sent ? (
                <p className="text-sm text-green-600 text-center py-4">
                  Message sent! We'll get back to you soon.
                </p>
              ) : (
                <form onSubmit={handleSend} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-[#E85D04]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-[#E85D04]"
                  />
                  <textarea
                    placeholder="Enter your message here..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-[#E85D04] resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#E85D04] hover:bg-[#C94E03] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </form>
              )}
            </div>

          </aside>
        </div>

        {/* ── Previous / Next navigation ── */}
        {(prevPost || nextPost) && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start justify-between gap-6">
              {/* Previous */}
              <div className="flex-1">
                {prevPost && (
                  <a
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-start gap-3 hover:text-[#E85D04] transition-colors"
                  >
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#6B7280] group-hover:text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Previous</p>
                      <p className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E85D04] leading-snug line-clamp-2">
                        {prevPost.title}
                      </p>
                    </div>
                  </a>
                )}
              </div>

              <div className="w-px h-12 bg-gray-200 flex-shrink-0 self-center" />

              {/* Next */}
              <div className="flex-1 flex justify-end">
                {nextPost && (
                  <a
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-start gap-3 text-right hover:text-[#E85D04] transition-colors"
                  >
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Next</p>
                      <p className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E85D04] leading-snug line-clamp-2">
                        {nextPost.title}
                      </p>
                    </div>
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#6B7280] group-hover:text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Recent Articles (full-width, light gray bg) ── */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F9FAFB] py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-8">
              Recent <span className="text-[#E85D04]">Articles</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <a
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block bg-white overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    {article.img ? (
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-base font-normal text-[#1A1A2E] leading-snug group-hover:text-[#E85D04] transition-colors">
                      {article.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
