import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  fetchPost,
  fetchAdjacentPosts,
  fetchRecentAndRelated,
  formatDate,
  WP_API,
} from "@/lib/blog";
import { BASE_URL } from "@/constants/metadata";
import BlogContactForm from "./BlogContactForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 },
    });
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the oneMi blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on the oneMi blog.`,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.img ? [{ url: post.img, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read ${post.title} on the oneMi blog.`,
      images: post.img ? [post.img] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, { recentPosts, relatedArticles }] = await Promise.all([
    fetchPost(slug),
    fetchRecentAndRelated(slug),
  ]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-brand-muted mb-4">Blog post not found.</p>
          <Link href="/blog" className="text-brand-orange font-semibold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { prev: prevPost, next: nextPost } = await fetchAdjacentPosts(post.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.img,
    datePublished: post.date,
    author: { "@type": "Organization", name: "oneMi" },
    publisher: {
      "@type": "Organization",
      name: "oneMi",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    url: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 2-column layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* ── Article ── */}
          <article>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-orange leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-muted mb-6">
              {post.categories.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-orange shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-orange">{post.categories.join(", ")}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                By: Admin
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {formatDate(post.date)}
              </span>
            </div>

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

            <div
              className="
                [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-brand-dark [&_h1]:mt-6 [&_h1]:mb-3
                [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-dark [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-brand-dark [&_h3]:mt-5 [&_h3]:mb-2
                [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-brand-dark [&_h4]:mt-4 [&_h4]:mb-2
                [&_p]:text-[#3D3D3D] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1
                [&_li]:text-[#3D3D3D] [&_li]:text-sm [&_li]:leading-relaxed
                [&_a]:text-brand-orange [&_a]:underline
                [&_strong]:text-brand-dark [&_strong]:font-semibold
                [&_blockquote]:border-l-4 [&_blockquote]:border-brand-orange [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-brand-muted [&_blockquote]:my-4
                [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:mb-4
                [&_th]:bg-[#F9FAFB] [&_th]:text-brand-dark [&_th]:font-semibold [&_th]:px-3 [&_th]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:text-left
                [&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-gray-200 [&_td]:text-[#3D3D3D]
                [&_img]:rounded-lg [&_img]:w-full [&_img]:my-4
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* ── Sidebar ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-white px-5 py-4 border-b-2 border-brand-orange">
                <h3 className="text-base font-bold text-brand-dark">Recent Posts</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {recentPosts.map((rp) => (
                  <li key={rp.id}>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <p className="text-sm font-medium text-brand-dark group-hover:text-brand-orange transition-colors leading-snug">
                        {rp.title}
                      </p>
                      <p className="text-xs text-brand-muted mt-0.5">{formatDate(rp.date)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <BlogContactForm />
          </aside>
        </div>

        {/* ── Prev / Next navigation ── */}
        {(prevPost || nextPost) && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-start gap-3 hover:text-brand-orange transition-colors"
                  >
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand-muted group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div>
                      <p className="text-xs text-brand-muted mb-1">Previous</p>
                      <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-orange leading-snug line-clamp-2">
                        {prevPost.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              <div className="w-px h-12 bg-gray-200 shrink-0 self-center" />

              <div className="flex-1 flex justify-end">
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-start gap-3 text-right hover:text-brand-orange transition-colors"
                  >
                    <div>
                      <p className="text-xs text-brand-muted mb-1">Next</p>
                      <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-orange leading-snug line-clamp-2">
                        {nextPost.title}
                      </p>
                    </div>
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand-muted group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F9FAFB] py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8">
              Recent <span className="text-brand-orange">Articles</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link
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
                    <p className="text-base font-normal text-brand-dark leading-snug group-hover:text-brand-orange transition-colors">
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}