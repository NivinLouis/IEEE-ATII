import { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema, faqSchema } from "@/components/SEO";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Lightbulb, Users, BookOpen, Building, GraduationCap, Globe } from "lucide-react";

import HeroVisual from "@/components/HeroVisual";

const allInitiatives = [
  {
    id: "innovation-lab",
    title: "AT Innovation Lab", theme: "navy", status: "Ongoing",
    icon: <Lightbulb className="w-6 h-6" />,
    desc: "Our innovation lab develops and prototypes assistive devices and solutions using emerging technologies and user-centered design.",
    stats: ["18 Projects", "4.3K+ Lives Impacted", "12 Partners"]
  },
  {
    id: "outreach",
    title: "Community Outreach", theme: "teal", status: "Ongoing",
    icon: <Users className="w-6 h-6" />,
    desc: "We collaborate with communities to identify needs, create awareness, and deliver inclusive solutions where they are needed most.",
    stats: ["65+ Events", "8.7K+ People Reached", "20+ Volunteers"]
  },
  {
    id: "education",
    title: "Inclusive Education", theme: "purple", status: "Ongoing",
    icon: <BookOpen className="w-6 h-6" />,
    desc: "Promoting inclusive learning environments through accessible resources, teacher training, and inclusive learning tools.",
    stats: ["35+ Institutions", "6.1K+ Students", "80+ Sessions"]
  },
  {
    id: "campus",
    title: "Accessible Campus Program", theme: "orange", status: "Completed",
    icon: <Building className="w-6 h-6" />,
    desc: "Making campuses universally inclusive through audits, retrofitting, awareness campaigns and inclusive infrastructure advocacy.",
    stats: ["15+ Campuses", "2.8K+ Users", "10+ Audits"]
  },
  {
    id: "capacity",
    title: "Capacity Building", theme: "teal", status: "Upcoming",
    icon: <GraduationCap className="w-6 h-6" />,
    desc: "Workshops, mentoring and hands-on training to build skills in assistive technology, design thinking, and inclusive innovation.",
    stats: ["40+ Workshops", "3.9K+ Participants", "25+ Mentors"]
  },
  {
    id: "humanitarian",
    title: "Humanitarian Technology", theme: "navy", status: "In Planning",
    icon: <Globe className="w-6 h-6" />,
    desc: "Designing low-cost, scalable assistive solutions for disaster response and refugee and underserved settings.",
    stats: ["10+ Deployments", "1.6K+ Impacted", "8+ Partners"]
  }
];

const statusBadge: Record<string, string> = {
  Ongoing: "bg-green-100 text-green-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-600",
  "In Planning": "bg-amber-100 text-amber-800",
};

export default function InitiativesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? allInitiatives
    : allInitiatives.filter((i) => i.status === activeTab);

  return (
    <Layout>
      <SEO
        title="Initiatives | IEEE Kerala ATIIG Programs & Projects"
        description="Explore IEEE Kerala ATIIG's initiatives spanning industry-academia partnerships, applied research, technical workshops, and humanitarian technology projects. Filter by status and join an active program."
        path="/initiatives"
        keywords="IEEE Kerala initiatives, IEEE Kerala workshops, IEEE Kerala research, IEEE Kerala humanitarian projects"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Initiatives", path: "/initiatives" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "IEEE Kerala ATIIG Initiatives",
            url: "https://ieee-atiig.replit.app/initiatives",
            isPartOf: { "@id": "https://ieee-atiig.replit.app/#website" },
            about: { "@id": "https://ieee-atiig.replit.app/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "IEEE Kerala ATIIG Programs",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: allInitiatives.length,
            itemListElement: allInitiatives.map((init, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: init.title,
              url: `https://ieee-atiig.replit.app/initiatives#${init.id}`,
              item: {
                "@type": "Service",
                name: init.title,
                serviceType: init.title,
                description: init.desc,
                provider: { "@id": "https://ieee-atiig.replit.app/#organization" },
                areaServed: { "@type": "AdministrativeArea", name: "Kerala, India" },
                url: `https://ieee-atiig.replit.app/initiatives#${init.id}`,
              },
            })),
          },
          faqSchema([
            {
              q: "What programs does IEEE Kerala ATIIG run?",
              a: "ATIIG runs six programs: AT Innovation Lab (assistive-device prototyping), Community Outreach, Inclusive Education, Accessible Campus Program (audits + retrofits), Capacity Building (workshops + mentoring), and Humanitarian Technology (disaster + underserved-community deployments).",
            },
            {
              q: "How can I propose a new initiative or partner on an existing one?",
              a: "Visit the Get Involved page (/get-involved) and choose Partner With Us or Volunteer. Each program lead reviews proposals and replies within two weeks.",
            },
            {
              q: "Are the prototypes from the AT Innovation Lab open source?",
              a: "Most reference designs and learning resources are released under permissive licenses on the Resources page. Some partner-funded prototypes are restricted by partnership agreements.",
            },
            {
              q: "Which districts of Kerala does ATIIG serve?",
              a: "Programs run across all 14 districts of Kerala with anchor sites in Thiruvananthapuram, Ernakulam, Kozhikode, and Kollam.",
            },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="bg-slate-50 pt-16 pb-20 border-b border-slate-100" data-testid="initiatives-hero">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                <Link to="/" className="hover:text-navy transition-colors">Home</Link>
                <span>/</span>
                <span className="text-navy">Initiatives</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-6">Our Initiatives</h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Strategic programs and action-oriented interventions designed to build a more inclusive society through technology, education, and community engagement.
              </p>
              <div className="flex gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-orange">6</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Core Programs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-teal">25K+</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Beneficiaries</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-purple">120+</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Volunteers</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative w-full pb-12">
              <HeroVisual variant="initiatives" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-20 z-30 shadow-sm" data-testid="initiatives-filters">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
            {["All", "Ongoing", "Upcoming", "Completed", "In Planning"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? "bg-navy text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search initiatives..."
                aria-label="Search initiatives"
                className="pl-9 bg-slate-50 border-slate-200"
              />
            </div>
            <Button variant="outline" className="border-slate-200 text-navy font-bold shrink-0">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-24 bg-slate-50" data-testid="initiatives-grid">
        <div className="container mx-auto px-4">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg font-medium">No initiatives match this filter.</p>
              <button onClick={() => setActiveTab("All")} className="mt-4 text-navy font-bold hover:underline">Show all initiatives</button>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((init, i) => {
              const themeStyles = {
                navy: { border: "border-l-navy", bg: "bg-navy/10", text: "text-navy", statBg: "bg-navy/5" },
                teal: { border: "border-l-teal", bg: "bg-teal/10", text: "text-teal", statBg: "bg-teal/5" },
                purple: { border: "border-l-purple", bg: "bg-purple/10", text: "text-purple", statBg: "bg-purple/5" },
                orange: { border: "border-l-orange", bg: "bg-orange/10", text: "text-orange", statBg: "bg-orange/5" }
              };
              const style = themeStyles[init.theme as keyof typeof themeStyles];

              return (
                <motion.div 
                  key={init.id} id={init.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-2xl shadow-sm border border-slate-100 border-l-8 ${style.border} p-8 flex flex-col hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${style.bg} ${style.text}`}>
                        {init.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-navy">{init.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusBadge[init.status] ?? "bg-slate-100 text-slate-600"}`}>{init.status}</span>
                  </div>
                  
                  <p className="text-slate-600 mb-8 flex-1 text-lg leading-relaxed">{init.desc}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {init.stats.map((stat, j) => {
                      const [val, ...labelParts] = stat.split(" ");
                      const label = labelParts.join(" ");
                      return (
                        <div key={j} className={`p-4 rounded-xl text-center ${style.statBg}`}>
                          <div className={`font-black text-xl mb-1 ${style.text}`}>{val}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase leading-tight">{label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <Link to={`/projects`} className={`font-bold text-lg inline-flex items-center group ${style.text}`}>
                    Explore Projects <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Initiative — only shown when viewing all */}
      {activeTab === "All" && <section className="py-24 bg-white" data-testid="initiatives-featured">
        <div className="container mx-auto px-4">
          <div className="bg-navy rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative min-h-[400px] bg-gradient-to-br from-[#023A74] via-[#642396] to-[#01A0A0] overflow-hidden">
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange/30 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
              <div className="relative h-full flex flex-col items-center justify-center text-white px-8 py-12">
                <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm ring-2 ring-white/30 flex items-center justify-center mb-6">
                  <Lightbulb className="w-12 h-12 text-orange" />
                </div>
                <div className="text-5xl md:text-6xl font-black tracking-tight">18+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-white/80 mt-2">Active Prototypes</div>
                <div className="mt-8 grid grid-cols-3 gap-4 text-center max-w-sm">
                  <div className="bg-white/10 rounded-lg py-3 px-2 ring-1 ring-white/15">
                    <div className="text-xl font-black text-orange">4.3K+</div>
                    <div className="text-[10px] font-semibold text-white/70 mt-1 uppercase tracking-wider">Lives</div>
                  </div>
                  <div className="bg-white/10 rounded-lg py-3 px-2 ring-1 ring-white/15">
                    <div className="text-xl font-black text-teal">12</div>
                    <div className="text-[10px] font-semibold text-white/70 mt-1 uppercase tracking-wider">Partners</div>
                  </div>
                  <div className="bg-white/10 rounded-lg py-3 px-2 ring-1 ring-white/15">
                    <div className="text-xl font-black text-white">8</div>
                    <div className="text-[10px] font-semibold text-white/70 mt-1 uppercase tracking-wider">Patents</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white">
              <span className="text-orange font-bold tracking-widest uppercase mb-4 text-sm">Featured Initiative</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">AT Innovation Lab</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                The AT Innovation Lab serves as a central hub where engineers, designers, and persons with disabilities co-create solutions. From low-cost prosthetics to communication devices, we're building the future of inclusive hardware.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <div className="text-3xl font-black text-teal mb-1">18</div>
                  <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Prototypes Built</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-purple mb-1">5</div>
                  <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Patents Filed</div>
                </div>
              </div>
              
              <div>
                <Button asChild className="bg-orange hover:bg-orange/90 text-white font-bold h-14 px-8 text-base">
                  <Link to="/projects#featured">View Lab Projects <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* Our Program Journey */}
      <section className="py-24 bg-slate-50" data-testid="initiatives-journey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Our Program Approach</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">How we move from identifying a problem to delivering sustainable impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-slate-200 z-0"></div>
            
            {[
              { num: "01", title: "Discover", desc: "Identify real-world needs through community engagement and research", color: "bg-navy" },
              { num: "02", title: "Design", desc: "Co-create solutions with users, experts and stakeholders", color: "bg-teal" },
              { num: "03", title: "Develop", desc: "Build and prototype using accessible and inclusive design principles", color: "bg-purple" },
              { num: "04", title: "Deploy", desc: "Implement solutions in communities and institutions", color: "bg-orange" },
              { num: "05", title: "Impact", desc: "Measure impact, learn and continuously improve for sustainable change", color: "bg-navy" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full ${step.color} text-white flex items-center justify-center text-2xl font-black mb-6 shadow-lg border-4 border-slate-50`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerCarousel />
    </Layout>
  );
}
