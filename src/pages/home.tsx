import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import SEO, {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";
import CardFlip from "@/components/CardFlip";
import { StatCounter } from "@/components/StatCounter";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FlaskConical, 
  HeartHandshake, 
  Users, 
  BookOpen, 
  Globe 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import { routeMeta } from "@/data/site";


const testimonialItems = [
  {
    id: 1,
    title: "Ananya, Student Beneficiary",
    description: "The learning tools introduced by IEEE Kerala changed the way I study and participate. I feel included, confident and capable.",
    image: "from-teal via-teal to-navy",
  },
  {
    id: 2,
    title: "Priya Rajan, Parent & Community Member",
    description: "With the assistive communication device developed by the team, my son can now express himself freely for the first time.",
    image: "from-purple via-purple to-navy",
  },
  {
    id: 3,
    title: "Mohammed Arif, Volunteer Engineer",
    description: "Volunteering with IEEE ATIIG opened my eyes to inclusive design. The experience has transformed how I approach engineering problems.",
    image: "from-orange via-orange to-purple",
  },
];

const lineData = [
  { year: "2020", impact: 2.1 },
  { year: "2021", impact: 5.8 },
  { year: "2022", impact: 9.6 },
  { year: "2023", impact: 16.8 },
  { year: "2024", impact: 20.5 },
  { year: "2025", impact: 25.0 },
];

const pieData = [
  { name: "Research", value: 30, color: "#023A74" },
  { name: "Assistive Solutions", value: 25, color: "#642396" },
  { name: "Community", value: 20, color: "#FD7B09" },
  { name: "Inclusive Education", value: 15, color: "#01A0A0" },
  { name: "Humanitarian", value: 10, color: "#475569" },
];

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title={routeMeta["/"].title}
        description={routeMeta["/"].description}
        path="/"
        keywords="IEEE Kerala, ATIIG, IEEE Kerala Section, engineering Kerala, technical workshops, IEEE membership Kerala, humanitarian technology Kerala"
        schemas={[
          organizationSchema(),
          websiteSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema([
            {
              q: "What is IEEE Kerala ATIIG?",
              a: "IEEE Kerala ATIIG (Assistive Technology & Inclusive Innovation Group) is the official affinity group of the IEEE Kerala Section. It connects engineers, students, researchers, volunteers, and community partners through assistive technology, inclusive education, accessibility programs, and humanitarian engineering projects across Kerala, India.",
            },
            {
              q: "Who can join IEEE Kerala ATIIG?",
              a: "Any IEEE member based in Kerala can join ATIIG, including students, young professionals, academic researchers, and senior industry engineers. Non-members interested in technology and humanitarian impact can attend public events and apply for IEEE membership through our Get Involved page.",
            },
            {
              q: "What initiatives does IEEE Kerala ATIIG run?",
              a: "ATIIG runs initiatives across four focus areas: industry-academia partnerships, applied research projects, technical skill-building workshops, and humanitarian technology projects (energy access, water quality, disaster response, and inclusive education).",
            },
            {
              q: "How is ATIIG different from other IEEE student branches?",
              a: "ATIIG is a section-level affinity group, not a campus chapter — it spans all IEEE student branches and professional members in Kerala. It focuses on real-world industry impact and humanitarian technology rather than purely academic activities.",
            },
            {
              q: "Where is IEEE Kerala ATIIG based?",
              a: "IEEE Kerala ATIIG operates throughout the state of Kerala, India, with the IEEE Kerala Section headquarters in Thiruvananthapuram. Workshops and events are held at partner colleges and venues across Kerala.",
            },
          ]),
        ]}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32" data-testid="home-hero">
        <div className="absolute top-10 left-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black text-navy leading-[1.05] mb-6 max-w-5xl px-2">
                Building an Inclusive Tomorrow for All
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl px-4">
                We design and deploy affordable, accessible, and impactful assistive technologies, fostering an inclusive ecosystem where innovation empowers every individual to thrive without barriers.
              </p>
              
              <div className="flex flex-col min-[480px]:flex-row gap-4 justify-center w-full min-[480px]:w-auto px-4">
                <Button asChild size="lg" className="w-full min-[480px]:w-auto bg-navy hover:bg-navy/90 text-white font-bold h-14 px-10 text-lg shadow-lg shadow-navy/20">
                  <Link to="/initiatives">Explore Initiatives</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full min-[480px]:w-auto border-2 border-navy text-navy hover:bg-navy/5 font-bold h-14 px-10 text-lg bg-transparent">
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 w-full max-w-xl px-4"
            >
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100/80 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Our Creed
                </div>
                <p className="italic text-navy font-semibold text-base sm:text-lg leading-relaxed text-center">
                  "Innovation with empathy. Technology with purpose. Inclusion at every step."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-100 relative z-20" data-testid="home-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <StatCounter 
              value="45+" 
              label="Volunteers" 
              color="purple" 
              icon={<Users className="w-6 h-6" />}
              className="border-r border-b md:border-b-0"
            />
            <StatCounter 
              value="800+" 
              label="Lives Impacted" 
              color="purple" 
              icon={<HeartHandshake className="w-6 h-6" />}
              className="md:border-r border-b md:border-b-0"
            />
            <StatCounter 
              value="10+" 
              label="Partners & Collaborators" 
              color="purple" 
              icon={<Globe className="w-6 h-6" />}
              className="border-r"
            />
            <StatCounter 
              value="3K+" 
              label="Devices Delivered" 
              color="purple" 
              icon={<FlaskConical className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-slate-50/50" data-testid="home-focus-areas">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 tracking-tight">Our Focus Areas</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto mb-8 rounded-full" />
            <p className="text-lg text-slate-600 leading-relaxed">Driving systemic change through strategic interventions across multiple domains.</p>
          </div>

          <div className="flex justify-center mb-10">
            <p className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-widest" aria-hidden="true">
              <span className="flex h-2 w-2 rounded-full bg-orange animate-pulse" />
              Hover or tap a card to explore details
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <FlaskConical className="w-7 h-7" />,
                title: "Research & Innovation",
                subtitle: "Developing cutting-edge accessible solutions.",
                description: "We design, prototype, and test affordable assistive technology with universities, hospitals, and community partners across Kerala.",
                features: ["Applied AT prototypes", "Open hardware projects", "Cross-college research", "Publications & patents"],
                color: "purple" as const,
                ctaHref: "/initiatives",
              },
              {
                icon: <HeartHandshake className="w-7 h-7" />,
                title: "Assistive Solutions",
                subtitle: "Creating affordable tools for daily living.",
                description: "Low-cost, durable assistive devices co-designed with end-users to maximise independence and dignity.",
                features: ["Mobility aids", "Communication devices", "Daily-living tools", "User co-design clinics"],
                color: "teal" as const,
                ctaHref: "/projects",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Community Impact",
                subtitle: "Empowering grassroots through awareness.",
                description: "We bring assistive tech and disability awareness directly to villages, schools, and self-help groups across Kerala.",
                features: ["Awareness camps", "SHG partnerships", "Volunteer drives", "Local-language outreach"],
                color: "purple" as const,
                ctaHref: "/get-involved",
              },
              {
                icon: <BookOpen className="w-7 h-7" />,
                title: "Inclusive Education",
                subtitle: "Ensuring learning is accessible to everyone.",
                description: "Audits, teacher training, and assistive learning kits that make classrooms work for every learner.",
                features: ["Accessibility audits", "Teacher training", "Adaptive learning kits", "Scholarship referrals"],
                color: "purple" as const,
                ctaHref: "/initiatives",
              },
              {
                icon: <Globe className="w-7 h-7" />,
                title: "Humanitarian Tech",
                subtitle: "Tech for disaster and underserved areas.",
                description: "Resilient solutions for floods, energy access, and underserved geographies — built fast, deployed in the field.",
                features: ["Disaster-response kits", "Off-grid energy", "Water-quality sensing", "Field deployments"],
                color: "teal" as const,
                ctaHref: "/projects",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Capacity Building",
                subtitle: "Training the next generation of innovators.",
                description: "Workshops, mentorship, and hands-on bootcamps that equip students and professionals to lead inclusive innovation.",
                features: ["Hands-on workshops", "Mentor matching", "Industry guest series", "Skill certificates"],
                color: "purple" as const,
                ctaHref: "/resources",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <CardFlip
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  features={item.features}
                  color={item.color}
                  ctaHref={item.ctaHref}
                  ctaLabel="Explore"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="link" className="text-orange font-bold text-lg group" asChild>
              <Link to="/about">View All Focus Areas <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact at a Glance */}
      <section className="py-24 bg-slate-50" data-testid="home-impact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-12 text-center">Impact at a Glance</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-purple mb-2">25K+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Lives Impacted</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-purple mb-2">100+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-purple mb-2">50+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Partners</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-purple mb-2">120+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Volunteers</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-6 text-center">Lives Impacted Over Time (in thousands)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="impact" stroke="#FD7B09" strokeWidth={4} dot={{r: 6, fill: '#FD7B09', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-6 text-center">Impact by Focus Area</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pieData.slice(0, 4).map((entry, index) => (
                  <div key={index} className="flex items-center text-xs font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-full mr-1.5" style={{backgroundColor: entry.color}}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-white" data-testid="home-events">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-navy">Upcoming Events</h2>
            <Button variant="link" className="text-orange font-bold hidden md:flex group" asChild>
              <Link to="/news-events">View All Events <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: "May 15", title: "AT Innovation Hackathon 2025", loc: "UL Cyberpark, Kozhikode" },
              { date: "May 28", title: "Webinar: Inclusive Tech for All", loc: "Online (Zoom)" },
              { date: "Jun 10", title: "Community Accessibility Audit Drive", loc: "Kochi, Kerala" }
            ].map((evt, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-orange transition-colors flex flex-col group">
                <div className="text-orange font-black text-xl mb-3">{evt.date}</div>
                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-orange transition-colors">{evt.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-1 flex items-start gap-2">
                  <span className="mt-0.5">•</span> {evt.loc}
                </p>
                <Link to="/news-events" className="text-navy font-bold text-sm hover:underline">Learn More →</Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full border-2 border-navy text-navy font-bold" asChild>
              <Link to="/news-events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stories of Change */}
      <section className="py-24 bg-slate-50" data-testid="home-stories">
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
          
          <div className="mt-12 text-center">
            <Button variant="link" className="text-navy font-bold text-lg group" asChild>
              <Link to="/projects#impact">Read More Impact Stories <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Be Part of Change CTA */}
      <section className="py-24 bg-white relative overflow-hidden" data-testid="home-cta">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 tracking-tight">Be a Part of the Change</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto mb-12 rounded-full" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-6xl mx-auto">
              {[
                { text: "Volunteer your time", icon: <Users className="w-6 h-6 text-teal" /> },
                { text: "Mentor innovators", icon: <FlaskConical className="w-6 h-6 text-teal" /> },
                { text: "Sponsor a cause", icon: <HeartHandshake className="w-6 h-6 text-teal" /> },
                { text: "Support our mission", icon: <Globe className="w-6 h-6 text-teal" /> }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-8 text-navy font-bold flex flex-col items-center gap-4 hover:border-orange/20 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="p-4 bg-white rounded-xl shadow-sm group-hover:bg-slate-50 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-slate-600 group-hover:text-navy text-center">{item.text}</span>
                </div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-black h-16 px-12 text-lg shadow-xl shadow-navy/20 rounded-xl group transition-all duration-300">
              <Link to="/get-involved" className="flex items-center">
                Join Us Today <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <PartnerCarousel />
    </Layout>
  );
}
