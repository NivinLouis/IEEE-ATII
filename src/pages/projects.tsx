import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta, GLOBAL_STATS } from "@/data/site";
import { useHomePage, useProjectsPage, useProjectsStoriesSection } from "@/lib/sanity/hooks";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { NewsStateBlock } from "@/components/news/NewsStateBlock";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity, BookOpen, Accessibility as WheelchairIcon, Briefcase, Users, FlaskConical } from "lucide-react";
import { 
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from "recharts";

import KeralaMap from "@/components/KeralaMap.jsx";
import sparshImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(4)_1777748003997.png";

export default function ProjectsPage() {
  const homePageQuery = useHomePage();
  const projectsPageQuery = useProjectsPage();
  const projectsStoriesSectionQuery = useProjectsStoriesSection();
  const projectCategories = projectsPageQuery.data?.projectCategories ?? [];
  const featuredProject = projectsPageQuery.data?.featuredProject;
  const storiesOfChangeItems = (projectsStoriesSectionQuery.data?.items ?? []).map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    image: item.gradient,
  }));
  const impactTrendData = homePageQuery.data?.statistics?.impactTrend ?? [];
  const focusPieData = (homePageQuery.data?.statistics?.impactDistribution ?? []).map((item) => ({
    ...item,
    color:
      item.name === "Research"
        ? "#023A74"
        : item.name === "Assistive Solutions"
          ? "#642396"
          : item.name === "Community"
            ? "#01A0A0"
            : item.name === "Inclusive Education"
              ? "#FD7B09"
              : "#475569",
  }));

  return (
    <Layout>
      <SEO
        title={routeMeta["/projects"].title}
        description={routeMeta["/projects"].description}
        path="/projects"
        keywords="IEEE Kerala projects, IEEE Kerala impact, engineering projects Kerala, IEEE humanitarian technology"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects & Impact", path: "/projects" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "IEEE Kerala ATIIG Projects & Impact",
            url: "https://atiig.ieeekerala.org/projects",
            isPartOf: { "@id": "https://atiig.ieeekerala.org/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "IEEE Kerala ATIIG Impact Metrics",
            description: "Aggregate impact figures for IEEE Kerala ATIIG programs: 100+ projects delivered, 25,000+ lives impacted, 50+ partners, 65+ events conducted, 18+ active assistive-technology prototypes.",
            url: "https://atiig.ieeekerala.org/projects",
            creator: { "@id": "https://atiig.ieeekerala.org/#organization" },
            spatialCoverage: { "@type": "AdministrativeArea", name: "Kerala, India" },
            temporalCoverage: "2018/..",
            keywords: ["assistive technology", "inclusive innovation", "Kerala", "IEEE", "humanitarian engineering", "SDG"],
            license: "https://creativecommons.org/licenses/by/4.0/",
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-navy text-white pt-20 pb-24 overflow-hidden relative" data-testid="projects-hero">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Projects That Create Inclusive Impact</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              From low-cost prosthetics to digital accessibility tools, our projects translate empathy into engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 max-w-5xl mx-auto bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-center">
              <div className="text-4xl font-black text-orange mb-1">{GLOBAL_STATS.projects}</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-teal mb-1">{GLOBAL_STATS.livesImpacted}</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Lives</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange mb-1">{GLOBAL_STATS.states}</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">States Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-teal mb-1">{GLOBAL_STATS.devicesDistributed}</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Devices Distributed</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-4xl font-black text-orange mb-1">{GLOBAL_STATS.volunteers}</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Categories */}
      <section className="py-24 bg-slate-50" data-testid="projects-categories">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="max-w-6xl mx-auto">
              <KeralaMap />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-navy mb-8">Project Categories</h2>
            {projectCategories.length === 0 && (
              <div className="mb-8">
                <NewsStateBlock
                  eyebrow="CMS content missing"
                  title="No project categories are available."
                  description="Publish `projectsPage.projectCategories` content in Sanity to populate this section."
                />
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectCategories.map((cat, i) => {
                const categoryIcons = {
                  assistiveDevices: <Activity className="w-6 h-6 text-navy" />,
                  inclusiveEducation: <BookOpen className="w-6 h-6 text-purple" />,
                  accessibilityTools: <WheelchairIcon className="w-6 h-6 text-teal" />,
                  livelihoodSkills: <Briefcase className="w-6 h-6 text-orange" />,
                  communityInclusion: <Users className="w-6 h-6 text-navy" />,
                  researchInnovation: <FlaskConical className="w-6 h-6 text-teal" />,
                } as const;

                return (
                <motion.div 
                  key={`${cat.kind}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors">
                    {categoryIcons[cat.kind as keyof typeof categoryIcons] ?? categoryIcons.assistiveDevices}
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-1">{cat.title}</h3>
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project — hidden for now */}

      {/* Impact in Numbers — hidden for now */}

      {/* Stories of Change */}
      <section id="impact" className="py-24 bg-slate-50" data-testid="projects-stories">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 tracking-tight">Stories of Change</h2>
            <p className="text-lg text-slate-600 leading-relaxed">Hear from those whose lives have been transformed by inclusive innovation.</p>
          </div>

          <div className="flex justify-center">
            {storiesOfChangeItems.length === 0 ? (
              <div className="w-full max-w-4xl">
                <NewsStateBlock
                  eyebrow="CMS content missing"
                  title="No stories of change are available."
                  description="Publish `projectsStoriesSection.items` in Sanity to populate this carousel."
                />
              </div>
            ) : (
              <TestimonialsCard 
                items={storiesOfChangeItems} 
                width={800} 
                className="w-full max-w-4xl"
                autoPlay={true}
                showCounter={false}
              />
            )}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section id="sdg" className="py-24 bg-white relative overflow-hidden" data-testid="projects-sdg">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 tracking-tight">Aligned with UN Sustainable Development Goals</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto mb-8 rounded-full" />
            <p className="text-lg text-slate-600 leading-relaxed">
              Our projects directly support global goals for health, education, inclusion, innovation, and partnerships.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { num: "3", title: "Good Health" },
              { num: "4", title: "Quality Education" },
              { num: "8", title: "Economic Growth" },
              { num: "9", title: "Innovation" },
              { num: "10", title: "Reduced Inequalities" },
              { num: "11", title: "Sustainable Cities" },
              { num: "17", title: "Partnerships" }
            ].map((sdg, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-8 text-navy font-bold flex flex-col items-center gap-4 hover:border-orange/20 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="p-4 bg-white rounded-xl shadow-sm group-hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="block text-xs font-black tracking-[0.25em] text-slate-500 text-center leading-none">SDG</span>
                  <span className="block text-4xl font-black leading-none mt-1 text-navy text-center">{sdg.num}</span>
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-slate-600 group-hover:text-navy text-center min-h-[2.5rem] flex items-center justify-center">
                  {sdg.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerCarousel />

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden" data-testid="projects-cta">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 tracking-tight">Be a Part of Inclusive Impact</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto mb-12 rounded-full" />

            <div className="max-w-3xl mx-auto mb-12 text-slate-600 text-lg leading-relaxed">
              Partner with us to build accessible solutions, or join our community to help deliver inclusive impact across Kerala.
            </div>

            <div className="flex flex-col min-[480px]:flex-row gap-3 justify-center w-full min-[480px]:w-auto px-4">
              <Button asChild size="lg" className="w-full min-[480px]:w-auto bg-navy hover:bg-navy/90 text-white font-black h-12 px-8 text-base shadow-lg shadow-navy/15 rounded-lg group transition-all duration-300">
                <Link to="/get-involved#partner" className="flex items-center justify-center">
                  Partner With Us
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full min-[480px]:w-auto bg-orange hover:bg-orange/90 text-white font-black h-12 px-8 text-base shadow-lg rounded-lg group transition-all duration-300">
                <Link to="/get-involved" className="flex items-center justify-center">
                  Join Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
