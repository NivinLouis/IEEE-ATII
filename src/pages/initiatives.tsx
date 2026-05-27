import { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema, faqSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";
import { useGlobalStats, useInitiativeCards } from "@/lib/sanity/hooks";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Lightbulb, Users, BookOpen, Building, Globe } from "lucide-react";

import HeroVisual from "@/components/HeroVisual";

const allInitiatives = [
  {
    id: "innovation-lab",
    title: "AT Innovation Lab", theme: "innovation", status: "Ongoing",
    description: "Our innovation lab develops and prototypes assistive devices and solutions using emerging technologies and user-centered design.",
    statOneValue: "18",
    statOneLabel: "Projects",
    statTwoValue: "4.3K+",
    statTwoLabel: "Lives Impacted",
    statThreeValue: "12",
    statThreeLabel: "Partners",
  },
  {
    id: "outreach",
    title: "Community Outreach", theme: "community", status: "Ongoing",
    description: "We collaborate with communities to identify needs, create awareness, and deliver inclusive solutions where they are needed most.",
    statOneValue: "65+",
    statOneLabel: "Events",
    statTwoValue: "8.7K+",
    statTwoLabel: "People Reached",
    statThreeValue: "20+",
    statThreeLabel: "Volunteers",
  },
  {
    id: "education",
    title: "Inclusive Education", theme: "education", status: "Ongoing",
    description: "Promoting inclusive learning environments through accessible resources, teacher training, and inclusive learning tools.",
    statOneValue: "35+",
    statOneLabel: "Institutions",
    statTwoValue: "6.1K+",
    statTwoLabel: "Students",
    statThreeValue: "80+",
    statThreeLabel: "Sessions",
  },
  {
    id: "campus",
    title: "Accessible Campus Program", theme: "campus", status: "Completed",
    description: "Making campuses universally inclusive through audits, retrofitting, awareness campaigns and inclusive infrastructure advocacy.",
    statOneValue: "15+",
    statOneLabel: "Campuses",
    statTwoValue: "2.8K+",
    statTwoLabel: "Users",
    statThreeValue: "10+",
    statThreeLabel: "Audits",
  },
  {
    id: "capacity",
    title: "Capacity Building", theme: "education", status: "Upcoming",
    description: "Workshops, mentoring and hands-on training to build skills in assistive technology, design thinking, and inclusive innovation.",
    statOneValue: "40+",
    statOneLabel: "Workshops",
    statTwoValue: "3.9K+",
    statTwoLabel: "Participants",
    statThreeValue: "25+",
    statThreeLabel: "Mentors",
  },
  {
    id: "humanitarian",
    title: "Humanitarian Technology", theme: "innovation", status: "In Planning",
    description: "Designing low-cost, scalable assistive solutions for disaster response and refugee and underserved settings.",
    statOneValue: "10+",
    statOneLabel: "Deployments",
    statTwoValue: "1.6K+",
    statTwoLabel: "Impacted",
    statThreeValue: "8+",
    statThreeLabel: "Partners",
  }
];

const statusBadge: Record<string, string> = {
  Ongoing: "bg-green-100 text-green-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-600",
  "In Planning": "bg-amber-100 text-amber-800",
};

const themeStyles = {
  innovation: {
    border: "border-l-navy",
    bg: "bg-navy/10",
    text: "text-navy",
    statBg: "bg-navy/5",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  education: {
    border: "border-l-purple",
    bg: "bg-purple/10",
    text: "text-purple",
    statBg: "bg-purple/5",
    icon: <BookOpen className="w-6 h-6" />,
  },
  community: {
    border: "border-l-teal",
    bg: "bg-teal/10",
    text: "text-teal",
    statBg: "bg-teal/5",
    icon: <Users className="w-6 h-6" />,
  },
  campus: {
    border: "border-l-orange",
    bg: "bg-orange/10",
    text: "text-orange",
    statBg: "bg-orange/5",
    icon: <Building className="w-6 h-6" />,
  },
} as const;

export default function InitiativesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const globalStatsQuery = useGlobalStats();
  const initiativeCardsQuery = useInitiativeCards();
  const globalStats = globalStatsQuery.data;
  const initiatives = initiativeCardsQuery.data?.length
    ? initiativeCardsQuery.data
    : allInitiatives;

  const filtered = activeTab === "All"
    ? initiatives
    : initiatives.filter((i) => i.status === activeTab);

  return (
    <Layout>
      <SEO
        title={routeMeta["/initiatives"].title}
        description={routeMeta["/initiatives"].description}
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
            url: "https://atiig.ieeekerala.org/initiatives",
            isPartOf: { "@id": "https://atiig.ieeekerala.org/#website" },
            about: { "@id": "https://atiig.ieeekerala.org/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "IEEE Kerala ATIIG Programs",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: initiatives.length,
            itemListElement: initiatives.map((init, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: init.title,
              url: `https://atiig.ieeekerala.org/initiatives#${init.id}`,
              item: {
                "@type": "Service",
                name: init.title,
                serviceType: init.title,
                description: init.description,
                provider: { "@id": "https://atiig.ieeekerala.org/#organization" },
                areaServed: { "@type": "AdministrativeArea", name: "Kerala, India" },
                url: `https://atiig.ieeekerala.org/initiatives#${init.id}`,
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
                  <span className="text-3xl font-black text-teal">{globalStats?.beneficiaries ?? "25K+"}</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Beneficiaries</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-purple">{globalStats?.volunteers ?? "120+"}</span>
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
              const style = themeStyles[init.theme as keyof typeof themeStyles] ?? themeStyles.innovation;
              const stats = [
                { value: init.statOneValue, label: init.statOneLabel },
                { value: init.statTwoValue, label: init.statTwoLabel },
                { value: init.statThreeValue, label: init.statThreeLabel },
              ];

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
                        {style.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-navy">{init.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusBadge[init.status] ?? "bg-slate-100 text-slate-600"}`}>{init.status}</span>
                  </div>
                  
                  <p className="text-slate-600 mb-8 flex-1 text-lg leading-relaxed">{init.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, j) => {
                      return (
                        <div key={j} className={`p-4 rounded-xl text-center ${style.statBg}`}>
                          <div className={`font-black text-xl mb-1 ${style.text}`}>{stat.value}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase leading-tight">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-32 bg-white relative overflow-hidden" data-testid="initiatives-journey">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 tracking-tight">Our Program Approach</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto mb-8 rounded-full" />
            <p className="text-xl text-slate-600 leading-relaxed">
              We follow a rigorous, user-centered methodology to move from identifying a problem to delivering sustainable social impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto relative">
            {/* The Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200 z-0" />
            
            {[
              { num: "01", title: "Discover", desc: "Identify real-world needs through community engagement and rigorous research.", color: "bg-navy", hColor: "group-hover:text-navy", icon: <Search className="w-5 h-5" /> },
              { num: "02", title: "Design", desc: "Co-create solutions with users, experts and stakeholders using inclusive principles.", color: "bg-teal", hColor: "group-hover:text-teal", icon: <Lightbulb className="w-5 h-5" /> },
              { num: "03", title: "Develop", desc: "Build and prototype iteratively, ensuring accessibility is baked into the core.", color: "bg-purple", hColor: "group-hover:text-purple", icon: <Building className="w-5 h-5" /> },
              { num: "04", title: "Deploy", desc: "Implement solutions directly in communities, institutions, and the field.", color: "bg-orange", hColor: "group-hover:text-orange", icon: <Globe className="w-5 h-5" /> },
              { num: "05", title: "Impact", desc: "Measure results, gather feedback, and scale for long-term sustainable change.", color: "bg-navy", hColor: "group-hover:text-navy", icon: <Users className="w-5 h-5" /> }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative z-10 flex flex-col items-center group text-center"
              >
                {/* Connector for Mobile */}
                {i < 4 && <div className="md:hidden absolute bottom-[-2rem] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />}

                <div className="relative mb-8">
                  {/* Outer Pulse Effect */}
                  <div className={`absolute inset-0 rounded-full ${step.color} opacity-20 scale-125 blur-md group-hover:scale-150 transition-transform duration-500`} />
                  
                  {/* Main Circle */}
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full ${step.color} text-white flex items-center justify-center text-2xl font-black shadow-xl border-4 border-white relative z-10 transition-transform duration-500 group-hover:-translate-y-2`}>
                    {step.num}
                  </div>

                  {/* Icon Small Badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-navy z-20 border border-slate-100 group-hover:bg-slate-50 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className={`text-lg lg:text-xl font-black text-black mb-4 ${step.hColor} transition-colors`}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm lg:text-base leading-relaxed px-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnerCarousel />
    </Layout>
  );
}
