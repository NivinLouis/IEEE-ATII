import { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, FileText, Download, PlayCircle, Filter, BookOpen, ExternalLink, FileDown, ArrowRight } from "lucide-react";

import resourcesHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(7)_1777748003996.png";

const topicSections: Record<string, string[]> = {
  guides:    ["All Topics", "Assistive Technology", "Inclusive Design", "Education"],
  research:  ["All Topics", "Research", "Assistive Technology"],
  videos:    ["All Topics", "Assistive Technology", "Inclusive Design", "Education"],
  standards: ["All Topics", "Policy & Standards"],
};

export default function ResourcesPage() {
  const [activeTopic, setActiveTopic] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const showSection = (key: string) => topicSections[key].includes(activeTopic);

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
          
          <div className="flex overflow-x-auto pb-2 mt-6 gap-2 hide-scrollbar items-center">
            <span className="text-sm font-bold text-slate-400 uppercase mr-2">Filter:</span>
            {["All Topics", "Assistive Technology", "Inclusive Design", "Research", "Policy & Standards", "Education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTopic(tab)}
                className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                  activeTopic === tab
                    ? "bg-navy text-white" 
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
            <Button variant="ghost" onClick={() => setActiveTopic("All Topics")} className="text-navy font-bold ml-auto shrink-0"><Filter className="w-4 h-4 mr-2" /> Reset</Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="resources-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 lg:col-start-1 xl:col-span-9">
              
              {/* Guides & Toolkits */}
              {showSection("guides") && <div id="guides" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><BookOpen className="mr-3 text-orange w-8 h-8" /> Guides & Toolkits</h2>
                  <Button variant="link" className="text-navy font-bold hover:text-orange">View all guides →</Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Inclusive Design Quick Start Guide", format: "PDF", down: "2.4K", desc: "A practical guide for developers and designers to build accessible digital products from day one.", color: "bg-purple", border: "border-t-purple" },
                    { title: "Assistive Technology Toolkit", format: "PDF", down: "1.8K", desc: "Comprehensive toolkit for educators to integrate AT in mainstream classrooms effectively.", color: "bg-teal", border: "border-t-teal" },
                    { title: "Accessibility in Education Guide", format: "PDF", down: "1.6K", desc: "Frameworks and best practices for higher education institutions to become universally accessible.", color: "bg-orange", border: "border-t-orange" },
                    { title: "Community Outreach Playbook", format: "DOCX", down: "1.2K", desc: "Templates and strategies for conducting successful accessibility awareness drives.", color: "bg-navy", border: "border-t-navy" }
                  ].map((guide, i) => (
                    <div key={i} className={`bg-slate-50 rounded-xl p-6 border border-slate-100 border-t-4 ${guide.border} flex flex-col group hover:shadow-md transition-all`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`${guide.color} text-white text-xs font-bold px-2 py-1 rounded shadow-sm`}>{guide.format}</span>
                        <div className="flex items-center text-slate-400 text-sm font-medium"><Download className="w-3.5 h-3.5 mr-1" /> {guide.down}</div>
                      </div>
                      <h3 className="font-bold text-navy text-xl mb-3 group-hover:text-orange transition-colors">{guide.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1">{guide.desc}</p>
                      <Button variant="outline" className="w-full justify-between group-hover:border-navy transition-colors">
                        Download <FileDown className="w-4 h-4 text-slate-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Research & Publications */}
              {showSection("research") && <div id="research" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><FileText className="mr-3 text-teal w-8 h-8" /> Research & Publications</h2>
                  <Button variant="link" className="text-navy font-bold hover:text-orange">View all →</Button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { type: "Research Paper", badge: "bg-navy", title: "AI-based Assistive Communication for Speech Impaired Users", authors: "Dr. S. Prakash, Ms. Anjali Menon", year: "2024", views: "1.2K" },
                    { type: "Case Study", badge: "bg-purple", title: "Implementing Low-Cost AAC Devices in Rural Schools", authors: "Mr. Amal Raj, IEEE Kerala", year: "2024", views: "850" },
                    { type: "White Paper", badge: "bg-teal", title: "The Future of Inclusive Workplaces with Assistive Tech", authors: "ATIIG Research Committee", year: "2023", views: "3.4K" },
                    { type: "Technical Report", badge: "bg-orange", title: "Accessibility Audit of Public Websites in Kerala", authors: "Ms. Fathima R., Accessibility Team", year: "2023", views: "2.1K" }
                  ].map((pub, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 sm:items-center bg-white border border-slate-200 p-5 rounded-xl hover:border-teal hover:shadow-sm transition-all group">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`${pub.badge} text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full`}>{pub.type}</span>
                          <span className="text-slate-400 text-sm font-medium">{pub.year}</span>
                        </div>
                        <h3 className="font-bold text-lg text-navy mb-1 group-hover:text-teal transition-colors">{pub.title}</h3>
                        <p className="text-slate-500 text-sm">{pub.authors}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5">
                        <div className="text-xs font-bold text-slate-400">{pub.views} Views</div>
                        <Button size="sm" variant="secondary" className="font-bold text-navy bg-slate-100 hover:bg-slate-200">
                          Read PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Videos & Webinars */}
              {showSection("videos") && <div id="videos" className="mb-20 scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><PlayCircle className="mr-3 text-purple w-8 h-8" /> Videos & Webinars</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Designing for Everyone: An Inclusive Approach", duration: "48:12", type: "Webinar" },
                    { title: "Hands-on: Building Low-Cost Assistive Devices", duration: "1:12:34", type: "Workshop" },
                    { title: "AI & Accessibility: Opportunities and Ethical Considerations", duration: "36:20", type: "Webinar" },
                    { title: "AT Innovation Hackathon 2024 Highlights", duration: "05:49", type: "Event" }
                  ].map((vid, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors z-10"></div>
                        <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all z-20" />
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded z-20">{vid.duration}</div>
                        <div className="absolute top-3 left-3 bg-purple text-white text-xs font-bold px-2 py-1 rounded z-20">{vid.type}</div>
                      </div>
                      <h3 className="font-bold text-navy text-lg leading-snug group-hover:text-orange transition-colors">{vid.title}</h3>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Standards */}
              {showSection("standards") && <div id="standards" className="scroll-mt-32">
                <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-3xl font-black text-navy flex items-center"><FileText className="mr-3 text-navy w-8 h-8" /> Standards & Guidelines</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "ISO 21001:2018 — Educational organizations management systems",
                    "W3C WCAG 2.2 — Web Content Accessibility Guidelines",
                    "IEEE 3017-2018 — Recommended Practice for Accessibility",
                    "Rights of Persons with Disabilities (RPwD) Act, 2016"
                  ].map((std, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-navy transition-colors cursor-pointer group">
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-navy shrink-0 mt-0.5" />
                      <span className="font-bold text-slate-700 text-sm leading-snug group-hover:text-navy">{std}</span>
                    </div>
                  ))}
                </div>
              </div>}

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-40 space-y-8">
                
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

                {/* Checklist Widget */}
                <div className="bg-navy rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="font-black text-xl mb-2">Accessibility Checklist</h3>
                  <p className="text-slate-300 text-sm mb-6">Quick reference for WCAG principles</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded">
                      <span>Content Perceivable</span>
                      <span className="text-green-400 font-bold">Complete</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded border border-orange/50">
                      <span>Content Operable</span>
                      <span className="text-orange font-bold">In Progress</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded">
                      <span>Content Understandable</span>
                      <span className="text-green-400 font-bold">Complete</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded">
                      <span className="text-slate-300">Content Robust</span>
                      <span className="text-slate-400 font-bold">To Do</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-navy font-bold">
                    Download Full Checklist (PDF)
                  </Button>
                </div>

                {/* Featured Pub */}
                <div className="bg-gradient-to-br from-purple to-navy rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <span className="bg-orange text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Featured</span>
                  <h3 className="font-bold text-lg leading-snug mb-2">Inclusive Innovation: A Framework for Impact</h3>
                  <p className="text-white/70 text-xs mb-6">White paper detailing our systemic approach to accessible design.</p>
                  <a href="#research" className="font-bold text-sm inline-flex items-center hover:underline">
                    Read Now <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
