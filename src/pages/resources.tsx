import { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";
import { useResourceGuides, useResourcePublications, useResourceStandards, useResourceVideos } from "@/lib/sanity/hooks";
import { NewsStateBlock } from "@/components/news/NewsStateBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, FileText, Download, PlayCircle, BookOpen, ExternalLink, FileDown, ArrowRight } from "lucide-react";

import resourcesHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(7)_1777748003996.png";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const resourceGuidesQuery = useResourceGuides();
  const resourcePublicationsQuery = useResourcePublications();
  const resourceStandardsQuery = useResourceStandards();
  const resourceVideosQuery = useResourceVideos();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const resourceGuides = (resourceGuidesQuery.data ?? []).filter((guide) =>
    !normalizedQuery ||
    [guide.title, guide.format, guide.description, guide.buttonLabel].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
  const resourcePublications = (resourcePublicationsQuery.data ?? []).filter((publication) =>
    !normalizedQuery ||
    [publication.title, publication.type, publication.authors, publication.year, publication.buttonLabel].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
  const resourceVideos = (resourceVideosQuery.data ?? []).filter((video) =>
    !normalizedQuery ||
    [video.title, video.type, video.duration].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
  const resourceStandards = (resourceStandardsQuery.data ?? []).filter((standard) =>
    !normalizedQuery || standard.title.toLowerCase().includes(normalizedQuery),
  );

  return (
    <Layout>
      <SEO
        title={routeMeta["/resources"].title}
        description={routeMeta["/resources"].description}
        path="/resources"
        keywords="IEEE Kerala resources, engineering guides Kerala, IEEE toolkits, engineering learning materials"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "IEEE Kerala ATIIG Resources",
            url: "https://atiig.ieeekerala.org/resources",
            isPartOf: { "@id": "https://atiig.ieeekerala.org/#website" },
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-navy text-white pt-20 pb-24 overflow-hidden relative" data-testid="resources-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-navy to-purple/50 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-bold text-teal tracking-widest uppercase mb-4">Knowledge. Tools. Impact.</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Resources & Publications</h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Explore our comprehensive library of research papers, inclusive design toolkits, accessibility standards, and educational materials.
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 border-2 border-teal/30 rounded-3xl rotate-3"></div>
              <img src={resourcesHeroImg} alt="Resources Library" className="rounded-3xl shadow-2xl relative z-10 w-full h-[350px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-20 z-30 shadow-sm" data-testid="resources-search">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search resources, publications, or topics..."
                aria-label="Search resources, publications, or topics"
                className="pl-12 h-14 bg-white border-slate-200 text-lg shadow-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setSearchQuery("")} className="h-14 px-8 bg-orange hover:bg-orange/90 text-white font-bold text-base shrink-0">
              {searchQuery ? "Clear" : "Search"}
            </Button>
          </div>
          
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="resources-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 lg:col-start-1 xl:col-span-9">
              
              {/* Guides & Toolkits */}
              <div id="guides" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><BookOpen className="mr-3 text-orange w-8 h-8" /> Guides & Toolkits</h2>
                  <Button variant="link" className="text-navy font-bold hover:text-orange">View all guides →</Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {resourceGuides.length === 0 && (
                    <div className="sm:col-span-2">
                      <NewsStateBlock
                        eyebrow="No guide content"
                        title="No guides or toolkits matched this view."
                        description="Publish `resourceGuide` documents in Sanity, or clear the search filter."
                      />
                    </div>
                  )}
                  {resourceGuides.map((guide, i) => {
                    const guideStyles = {
                      purple: { color: "bg-purple", border: "border-t-purple" },
                      teal: { color: "bg-teal", border: "border-t-teal" },
                      orange: { color: "bg-orange", border: "border-t-orange" },
                      navy: { color: "bg-navy", border: "border-t-navy" },
                    } as const;
                    const style = guideStyles[guide.theme as keyof typeof guideStyles] ?? guideStyles.navy;
                    const isExternal = /^https?:\/\//.test(guide.href);

                    return (
                    <div key={i} className={`bg-slate-50 rounded-xl p-6 border border-slate-100 border-t-4 ${style.border} flex flex-col group hover:shadow-md transition-all`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`${style.color} text-white text-xs font-bold px-2 py-1 rounded shadow-sm`}>{guide.format}</span>
                      </div>
                      <h3 className="font-bold text-navy text-xl mb-3 group-hover:text-orange transition-colors">{guide.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1">{guide.description}</p>
                      <Button asChild variant="outline" className="w-full justify-between group-hover:border-navy transition-colors">
                        {isExternal ? (
                          <a href={guide.href} target="_blank" rel="noreferrer">
                            {guide.buttonLabel} <FileDown className="w-4 h-4 text-slate-400" />
                          </a>
                        ) : (
                          <Link to={guide.href}>
                            {guide.buttonLabel} <FileDown className="w-4 h-4 text-slate-400" />
                          </Link>
                        )}
                      </Button>
                    </div>
                  )})}
                </div>
              </div>

              {/* Research & Publications */}
              <div id="research" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><FileText className="mr-3 text-teal w-8 h-8" /> Research & Publications</h2>
                  <Button variant="link" className="text-navy font-bold hover:text-orange">View all →</Button>
                </div>
                
                <div className="space-y-4">
                  {resourcePublications.length === 0 && (
                    <NewsStateBlock
                      eyebrow="No publication content"
                      title="No publications matched this view."
                      description="Publish `resourcePublication` documents in Sanity, or clear the search filter."
                    />
                  )}
                  {resourcePublications.map((pub, i) => {
                    const publicationStyles = {
                      navy: "bg-navy",
                      purple: "bg-purple",
                      teal: "bg-teal",
                      orange: "bg-orange",
                    } as const;
                    const badgeClass = publicationStyles[pub.theme as keyof typeof publicationStyles] ?? publicationStyles.navy;
                    const isExternal = /^https?:\/\//.test(pub.href);

                    return (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 sm:items-center bg-white border border-slate-200 p-5 rounded-xl hover:border-teal hover:shadow-sm transition-all group">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`${badgeClass} text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full`}>{pub.type}</span>
                          <span className="text-slate-400 text-sm font-medium">{pub.year}</span>
                        </div>
                        <h3 className="font-bold text-lg text-navy mb-1 group-hover:text-teal transition-colors">{pub.title}</h3>
                        <p className="text-slate-500 text-sm">{pub.authors}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5">
                        <Button asChild size="sm" variant="secondary" className="font-bold text-navy bg-slate-100 hover:bg-slate-200">
                          {isExternal ? (
                            <a href={pub.href} target="_blank" rel="noreferrer">
                              {pub.buttonLabel}
                            </a>
                          ) : (
                            <Link to={pub.href}>
                              {pub.buttonLabel}
                            </Link>
                          )}
                        </Button>
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              {/* Videos & Webinars */}
              <div id="videos" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><PlayCircle className="mr-3 text-purple w-8 h-8" /> Videos & Webinars</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {resourceVideos.length === 0 && (
                    <div className="sm:col-span-2">
                      <NewsStateBlock
                        eyebrow="No video content"
                        title="No videos or webinars matched this view."
                        description="Publish `resourceVideo` documents in Sanity, or clear the search filter."
                      />
                    </div>
                  )}
                  {resourceVideos.map((vid, i) => {
                    const isExternal = /^https?:\/\//.test(vid.href);
                    const CardTag = isExternal ? "a" : Link;
                    const cardProps = isExternal
                      ? { href: vid.href, target: "_blank", rel: "noreferrer" }
                      : { to: vid.href };

                    return (
                    <CardTag key={i} {...cardProps} className="group cursor-pointer block">
                      <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden mb-3">
                        {vid.thumbnail?.asset?.url ? (
                          <img
                            src={vid.thumbnail.asset.url}
                            alt={vid.thumbnail.alt ?? vid.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors z-10"></div>
                        <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all z-20" />
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded z-20">{vid.duration}</div>
                        <div className="absolute top-3 left-3 bg-purple text-white text-xs font-bold px-2 py-1 rounded z-20">{vid.type}</div>
                      </div>
                      <h3 className="font-bold text-navy text-lg leading-snug group-hover:text-orange transition-colors">{vid.title}</h3>
                    </CardTag>
                  )})}
                </div>
              </div>

              {/* Standards */}
              <div id="standards" className="scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><FileText className="mr-3 text-navy w-8 h-8" /> Standards & Guidelines</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {resourceStandards.length === 0 && (
                    <div className="sm:col-span-2">
                      <NewsStateBlock
                        eyebrow="No standards content"
                        title="No standards or guidelines matched this view."
                        description="Publish `resourceStandard` documents in Sanity, or clear the search filter."
                      />
                    </div>
                  )}
                  {resourceStandards.map((std, i) => {
                    const isExternal = /^https?:\/\//.test(std.href);
                    const CardTag = isExternal ? "a" : Link;
                    const cardProps = isExternal
                      ? { href: std.href, target: "_blank", rel: "noreferrer" }
                      : { to: std.href };

                    return (
                    <CardTag key={i} {...cardProps} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-navy transition-colors cursor-pointer group">
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-navy shrink-0 mt-0.5" />
                      <span className="font-bold text-slate-700 text-sm leading-snug group-hover:text-navy">{std.title}</span>
                    </CardTag>
                  )})}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-56 space-y-8">
                
                {/* Quick Links */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-black text-navy text-xl mb-4 border-b border-slate-200 pb-3">Resource Categories</h3>
                  <ul className="space-y-1">
                    {[
                      { label: "All Resources", href: "#" },
                      { label: "Research & Publications", href: "#research" },
                      { label: "Standards & Guidelines", href: "#standards" },
                      { label: "Videos & Webinars", href: "#videos" },
                      { label: "Guides & Toolkits", href: "#guides" },
                      { label: "Events & Trainings", href: "/news-events" }
                    ].map((link, i) => (
                      <li key={i}>
                        <a href={link.href} className={`block py-2 text-sm font-medium ${i === 0 ? "text-orange font-bold" : "text-slate-600 hover:text-navy hover:translate-x-1 transition-all"}`}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <Link to="/contact" className="text-teal font-bold text-sm flex items-center hover:underline">
                      Suggest a Resource <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
