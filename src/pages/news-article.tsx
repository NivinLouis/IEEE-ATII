import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { NewsStateBlock } from "@/components/news/NewsStateBlock";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/data/site";
import { useNewsArticle, useNewsArticles } from "@/lib/sanity/hooks";
import {
  formatNewsDate,
  getNewsBadgeStyles,
  getPrimaryCategoryLabel,
  getSanityImageProps,
} from "@/lib/sanity/presentation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="mt-12 text-3xl font-black tracking-tight text-navy">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="mt-10 text-2xl font-black tracking-tight text-navy">{children}</h3>
    ),
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="mt-6 text-lg leading-8 text-slate-700">{children}</p>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="mt-8 border-l-4 border-orange pl-6 text-xl italic leading-8 text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-slate-700">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value?: { href?: string };
    }) => (
      <a
        className="font-semibold text-teal underline decoration-teal/40 underline-offset-4"
        href={value?.href ?? "#"}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; alt?: string; caption?: string } }) => (
      <figure className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
        {value?.asset?.url ? (
          <img
            src={value.asset.url}
            alt={value.alt ?? ""}
            className="w-full object-cover"
          />
        ) : null}
        {value?.caption ? (
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
};

export default function NewsArticlePage() {
  const { slug = "" } = useParams();
  const articleQuery = useNewsArticle(slug);
  const latestNewsQuery = useNewsArticles();
  const article = articleQuery.data;
  const latestArticles = (latestNewsQuery.data ?? []).filter((item) => item.slug !== slug).slice(0, 3);
  const image = getSanityImageProps(article?.coverImage);
  const pageTitle = article?.seoTitle ?? (article ? `${article.title} | IEEE Kerala ATIIG` : "News Article | IEEE Kerala ATIIG");
  const pageDescription = article?.seoDescription ?? article?.excerpt ?? "Latest updates from IEEE Kerala ATIIG.";

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={`/news/${slug}`}
        image={image?.src}
        type="article"
        noindex={!article}
        schemas={
          article
            ? [
                breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "News & Events", path: "/news-events" },
                  { name: article.title, path: `/news/${article.slug}` },
                ]),
                {
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  headline: article.title,
                  datePublished: article.publishedAt,
                  description: article.excerpt,
                  url: `${SITE_URL}/news/${article.slug}`,
                  image: image?.src ? [image.src] : undefined,
                },
              ]
            : undefined
        }
      />

      <section className="border-b border-slate-100 bg-slate-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Link to="/news-events" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" />
              Back to News & Events
            </Link>
          </div>
        </div>
      </section>

      {articleQuery.isLoading ? (
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-slate-400">Loading article…</div>
          </div>
        </section>
      ) : !article ? (
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <NewsStateBlock
                eyebrow="Article unavailable"
                title="This news article is not published or could not be found."
                description="Use the News & Events page to return to the current newsroom list, or check whether the Sanity dataset contains a published article for this slug."
                ctaLabel="Go to News & Events"
                ctaHref="/news-events"
              />
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
                <article>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white ${getNewsBadgeStyles(article.categories)}`}>
                      {getPrimaryCategoryLabel(article.categories)}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                      {formatNewsDate(article.publishedAt)}
                    </span>
                  </div>

                  <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-navy md:text-6xl">
                    {article.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">
                    {article.excerpt}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {article.categories.map((category) => (
                      <span
                        key={category._id}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>

                  {image ? (
                    <figure className="mt-12 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(2,58,116,0.08)]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="max-h-[540px] w-full object-cover"
                        style={image.placeholder ? { backgroundImage: `url(${image.placeholder})`, backgroundSize: "cover" } : undefined}
                      />
                      {image.caption ? (
                        <figcaption className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
                          {image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}

                  <div className="prose prose-slate mt-12 max-w-none">
                    <PortableText value={article.body as any} components={portableTextComponents} />
                  </div>
                </article>

                <aside className="lg:pt-24">
                  <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">
                      More from ATIIG
                    </div>
                    <h2 className="mt-4 text-2xl font-black text-navy">Latest published stories</h2>
                    <div className="mt-6 space-y-5">
                      {latestArticles.length > 0 ? (
                        latestArticles.map((item) => (
                          <Link
                            key={item._id}
                            to={`/news/${item.slug}`}
                            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-navy"
                          >
                            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                              {formatNewsDate(item.publishedAt)}
                            </div>
                            <h3 className="mt-3 text-lg font-black leading-snug text-navy">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                            <span className="mt-4 inline-flex items-center text-sm font-bold text-orange">
                              Read article <ArrowRight className="ml-1 h-4 w-4" />
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm leading-6 text-slate-500">
                          Publish more news articles in Sanity to populate this rail.
                        </p>
                      )}
                    </div>

                    <Button asChild className="mt-8 w-full bg-navy text-white hover:bg-navy/90">
                      <Link to="/news-events">Open newsroom</Link>
                    </Button>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
