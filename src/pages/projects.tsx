import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { StatCounter } from "@/components/StatCounter";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity, BookOpen, Accessibility as WheelchairIcon, Briefcase, Users, FlaskConical } from "lucide-react";
import { 
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from "recharts";

import KeralaMap from "@/components/KeralaMap.jsx";
import projectsHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(8)_1777748003996.png";
import sparshImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(4)_1777748003997.png";
import { testimonialItems } from "@/data/testimonials";

const lineData = [
  { year: "2020", impact: 2.1 },
  { year: "2021", impact: 5.8 },
  { year: "2022", impact: 9.6 },
  { year: "2023", impact: 16.8 },
  { year: "2024", impact: 20.5 },
];

const focusPieData = [
  { name: "Assistive Devices", value: 33, color: "#023A74" },
  { name: "Inclusive Education", value: 25, color: "#642396" },
  { name: "Accessibility Tools", value: 20, color: "#01A0A0" },
  { name: "Livelihood & Skills", value: 12, color: "#FD7B09" },
  { name: "Community Inclusion", value: 10, color: "#475569" },
];

const regionPieData = [
  { name: "South India", value: 42, color: "#01A0A0" },
  { name: "North India", value: 28, color: "#FD7B09" },
  { name: "East India", value: 17, color: "#023A74" },
  { name: "West India", value: 13, color: "#642396" },
];

const beneficiaryBarData = [
  { name: "PwDs", value: 40 },
  { name: "Students", value: 25 },
  { name: "Seniors", value: 12 },
  { name: "Caregivers", value: 8 },
  { name: "Others", value: 7 },
];

export default function ProjectsPage() {
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
              <div className="text-4xl font-black text-orange mb-1">58+</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-teal mb-1">25K+</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Lives</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple mb-1">18</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">States Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange mb-1">120+</div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Partners</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-4xl font-black text-teal mb-1">1.2K+</div>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Assistive Devices", count: "16+", icon: <Activity className="w-6 h-6 text-navy" /> },
                { title: "Inclusive Education", count: "14+", icon: <BookOpen className="w-6 h-6 text-purple" /> },
                { title: "Accessibility Tools", count: "12+", icon: <WheelchairIcon className="w-6 h-6 text-teal" /> },
                { title: "Livelihood & Skills", count: "9+", icon: <Briefcase className="w-6 h-6 text-orange" /> },
                { title: "Community Inclusion", count: "7+", icon: <Users className="w-6 h-6 text-navy" /> },
                { title: "Research & Innovation", count: "8+", icon: <FlaskConical className="w-6 h-6 text-teal" /> }
              ].map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-1">{cat.title}</h3>
                  <div className="text-slate-500 font-medium text-sm">{cat.count} Projects</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured" className="py-24 bg-white" data-testid="projects-featured">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Featured Project</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <img src={sparshImg} alt="Sparsh Prosthetic Hand" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]" />
                <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 rounded-2xl shadow-lg border-4 border-white hidden md:block">
                  <div className="text-3xl font-black text-orange mb-1">₹35K</div>
                  <div className="text-sm font-bold uppercase tracking-wider">Avg. Cost Saved</div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-black text-navy mb-6">Sparsh — Affordable Myoelectric Prosthetic Hand</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Sparsh is an indigenously designed, lightweight and affordable myoelectric prosthetic hand that restores grip, confidence and independence for upper-limb amputees in developing regions.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Low Cost", "Lightweight", "Multi-grip", "User-centric"].map(tag => (
                    <span key={tag} className="bg-teal/10 text-teal font-bold px-3 py-1 rounded-md text-sm">{tag}</span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8 border-y border-slate-100 py-6">
                  <div>
                    <div className="text-2xl font-black text-navy">1,200+</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-navy">18</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">States</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-navy">45+</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">Partner Orgs</div>
                  </div>
                </div>
                
                <div className="mb-10 space-y-4">
                  <h3 className="font-bold text-navy text-lg mb-4">Project Outcomes:</h3>
                  {[
                    "Enhanced daily living independence",
                    "Improved self-confidence and social inclusion",
                    "Enables education and employment opportunities",
                    "Low-cost, maintenance-light and repair ecosystem"
                  ].map((outcome, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-orange shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="bg-navy hover:bg-navy/90 text-white font-bold h-14 px-8 text-base w-full sm:w-auto">
                  View Project Details <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="py-24 bg-slate-50" data-testid="projects-data">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Impact in Numbers</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Data-driven insights demonstrating the scale of our interventions.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-8 text-center">Lives Impacted Over the Years</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="impact" stroke="#01A0A0" strokeWidth={4} dot={{r: 6, fill: '#01A0A0', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-8 text-center">Impact by Beneficiary Group (%)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={beneficiaryBarData} layout="vertical" margin={{top: 0, right: 30, left: 20, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#023A74', fontWeight: 600, fontSize: 13}} width={80} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" fill="#642396" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-lg font-bold text-navy mb-8 text-center">Impact by Focus Area</h3>
              <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={focusPieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value">
                      {focusPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {focusPieData.slice(0, 3).map((entry, index) => (
                  <div key={index} className="flex items-center text-sm font-bold text-slate-700">
                    <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: entry.color}}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-lg font-bold text-navy mb-8 text-center">Beneficiaries by Region</h3>
              <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={regionPieData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                      {regionPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {regionPieData.map((entry, index) => (
                  <div key={index} className="flex items-center text-sm font-bold text-slate-700">
                    <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: entry.color}}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories of Change */}
      <section id="impact" className="py-24 bg-slate-50" data-testid="projects-stories">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 tracking-tight">Stories of Change</h2>
            <p className="text-lg text-slate-600 leading-relaxed">Hear from those whose lives have been transformed by inclusive innovation.</p>
          </div>

          <div className="flex justify-center">
            <TestimonialsCard 
              items={testimonialItems} 
              width={800} 
              className="w-full max-w-4xl"
              autoPlay={true}
              showCounter={false}
            />
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
