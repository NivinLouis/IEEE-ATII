import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { StatCounter } from "@/components/StatCounter";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { NewsletterStrip } from "@/components/NewsletterStrip";
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

import heroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(1)_1777748003994.png";
import teamImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(1)_1777748003996.png";

const stories = [
  {
    quote: "The learning tools introduced by IEEE Kerala changed the way I study and participate. I feel included, confident and capable.",
    author: "Ananya",
    role: "Student Beneficiary",
    img: teamImg,
  },
  {
    quote: "With the assistive communication device developed by the team, my son can now express himself freely for the first time.",
    author: "Priya Rajan",
    role: "Parent & Community Member",
    img: teamImg,
  },
  {
    quote: "Volunteering with IEEE ATIIG opened my eyes to inclusive design. The experience has transformed how I approach engineering problems.",
    author: "Mohammed Arif",
    role: "Volunteer Engineer",
    img: teamImg,
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
  const [storyIndex, setStoryIndex] = useState(0);

  const prevStory = useCallback(() => {
    setStoryIndex((i) => (i - 1 + stories.length) % stories.length);
  }, []);

  const nextStory = useCallback(() => {
    setStoryIndex((i) => (i + 1) % stories.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStory, 6000);
    return () => clearInterval(interval);
  }, [nextStory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 lg:pt-32 lg:pb-32" data-testid="home-hero">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-40 h-40 bg-purple/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="text-teal font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                Innovation with Empathy. Technology with Purpose.
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy leading-tight mb-6">
                Building an Inclusive Tomorrow for All
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We design and deploy affordable, accessible, and impactful assistive technologies, fostering an inclusive ecosystem where innovation empowers every individual to thrive without barriers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-bold h-14 px-8 text-base">
                  <Link to="/initiatives">Explore Initiatives</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-navy text-navy hover:bg-navy/5 font-bold h-14 px-8 text-base">
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src={heroImg} alt="Assistive technology in use" className="rounded-2xl shadow-lg w-full h-52 object-cover col-span-2" />
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col justify-center">
                  <div className="text-3xl font-black text-navy">25K+</div>
                  <div className="text-sm font-bold text-slate-500 mt-1">Lives Impacted</div>
                  <div className="text-xs text-teal mt-1.5 font-semibold">Across Kerala</div>
                </div>
                <img src={teamImg} alt="ATIIG team collaboration" className="rounded-2xl shadow-lg w-full h-36 object-cover translate-y-2" />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xs border-l-4 border-l-orange border-t-4 border-t-teal">
                <p className="italic text-navy font-medium leading-snug">
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
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            <StatCounter value="100+" label="Projects Delivered" color="navy" />
            <StatCounter value="25K+" label="Lives Impacted" color="orange" />
            <StatCounter value="50+" label="Partners & Collaborators" color="purple" />
            <StatCounter value="65+" label="Events Conducted" color="teal" />
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-slate-50" data-testid="home-focus-areas">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Our Focus Areas</h2>
            <p className="text-lg text-slate-600">Driving systemic change through strategic interventions across multiple domains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <FlaskConical className="w-8 h-8" />, title: "Research & Innovation", desc: "Developing cutting-edge accessible solutions.", color: "text-navy", bg: "bg-navy/10" },
              { icon: <HeartHandshake className="w-8 h-8" />, title: "Assistive Solutions", desc: "Creating affordable tools for daily living.", color: "text-teal", bg: "bg-teal/10" },
              { icon: <Users className="w-8 h-8" />, title: "Community Impact", desc: "Empowering grassroots through awareness.", color: "text-orange", bg: "bg-orange/10" },
              { icon: <BookOpen className="w-8 h-8" />, title: "Inclusive Education", desc: "Ensuring learning is accessible to everyone.", color: "text-purple", bg: "bg-purple/10" },
              { icon: <Globe className="w-8 h-8" />, title: "Humanitarian Tech", desc: "Deploying tech for disaster and underserved areas.", color: "text-teal", bg: "bg-teal/10" },
              { icon: <Users className="w-8 h-8" />, title: "Capacity Building", desc: "Training the next generation of innovators.", color: "text-navy", bg: "bg-navy/10" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow card-hover"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
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

      {/* Our Initiatives */}
      <section className="py-24 bg-white" data-testid="home-initiatives">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Our Initiatives</h2>
              <p className="text-lg text-slate-600">Action-oriented programs designed to break down barriers and build a more inclusive society.</p>
            </div>
            <Button asChild className="bg-navy hover:bg-navy/90 text-white font-bold px-6 shrink-0">
              <Link to="/initiatives">All Initiatives</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AT Innovation Lab", theme: "navy",
                desc: "Developing and prototyping assistive devices using emerging tech.",
                stats: ["18 Projects", "4.3K+ Impacted", "12 Partners"]
              },
              {
                title: "Community Outreach", theme: "teal",
                desc: "Collaborating with communities to deliver inclusive solutions.",
                stats: ["65+ Events", "8.7K+ Reached", "20+ Volunteers"]
              },
              {
                title: "Inclusive Education", theme: "purple",
                desc: "Promoting inclusive learning environments and tools.",
                stats: ["35+ Institutions", "6.1K+ Benefited", "80+ Sessions"]
              },
              {
                title: "Accessible Campus", theme: "orange",
                desc: "Making campuses universally inclusive through audits.",
                stats: ["15+ Campuses", "2.8K+ Users", "10+ Audits"]
              },
              {
                title: "Capacity Building", theme: "teal",
                desc: "Mentoring and hands-on training to build skills in AT.",
                stats: ["40+ Workshops", "3.9K+ Participants", "25+ Mentors"]
              },
              {
                title: "Humanitarian Tech", theme: "navy",
                desc: "Designing solutions for disaster response and remote settings.",
                stats: ["10+ Deployments", "1.6K+ Impacted", "8+ Partners"]
              }
            ].map((init, i) => {
              const borderColors = {
                navy: "border-l-navy",
                teal: "border-l-teal",
                purple: "border-l-purple",
                orange: "border-l-orange"
              };
              const bgColors = {
                navy: "bg-navy/5",
                teal: "bg-teal/5",
                purple: "bg-purple/5",
                orange: "bg-orange/5"
              };
              const textColors = {
                navy: "text-navy",
                teal: "text-teal",
                purple: "text-purple",
                orange: "text-orange"
              };

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 ${borderColors[init.theme as keyof typeof borderColors]} p-6 flex flex-col h-full card-hover`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-navy">{init.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-slate-600 mb-6 flex-1 text-sm">{init.desc}</p>
                  
                  <div className={`grid grid-cols-3 gap-2 mb-6 p-3 rounded-lg ${bgColors[init.theme as keyof typeof bgColors]}`}>
                    {init.stats.map((stat, j) => {
                      const [val, label] = stat.split(" ");
                      return (
                        <div key={j} className="text-center">
                          <div className={`font-bold text-sm ${textColors[init.theme as keyof typeof textColors]}`}>{val}</div>
                          <div className="text-[10px] text-slate-500 font-medium uppercase truncate">{label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <Link to={`/initiatives#${init.title.toLowerCase().replace(/\s+/g, '-')}`} className={`font-bold text-sm inline-flex items-center group ${textColors[init.theme as keyof typeof textColors]}`}>
                    Explore Initiative <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
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
                <div className="text-3xl font-black text-orange mb-2">25K+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Lives Impacted</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-purple mb-2">100+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-teal mb-2">50+</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Partners</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-navy mb-2">120+</div>
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
      <section className="py-24 bg-slate-50" data-testid="home-stories" aria-label="Stories of Change carousel">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
            <div className="grid md:grid-cols-5 h-full">
              <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                {stories.map((s, i) => (
                  <img
                    key={i}
                    src={s.img}
                    alt={`${s.author} — ${s.role}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === storyIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </div>
              <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                <h2 className="text-sm font-bold tracking-widest text-teal uppercase mb-6">Stories of Change</h2>
                <div className="relative min-h-[140px]">
                  {stories.map((s, i) => (
                    <div
                      key={i}
                      className={`transition-all duration-500 ${i === storyIndex ? "opacity-100 translate-y-0" : "opacity-0 absolute inset-0 translate-y-2 pointer-events-none"}`}
                      aria-hidden={i !== storyIndex}
                    >
                      <blockquote className="text-xl md:text-2xl font-medium text-navy leading-relaxed mb-8 italic">
                        "{s.quote}"
                      </blockquote>
                      <div className="font-bold text-lg text-slate-800">— {s.author}, <span className="font-medium text-slate-500">{s.role}</span></div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevStory}
                      aria-label="Previous story"
                      className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-navy text-slate-400 hover:text-navy transition-colors"
                    >
                      ‹
                    </button>
                    <div className="flex gap-2" role="tablist" aria-label="Story slides">
                      {stories.map((_, i) => (
                        <button
                          key={i}
                          role="tab"
                          aria-selected={i === storyIndex}
                          aria-label={`Story ${i + 1} of ${stories.length}`}
                          onClick={() => setStoryIndex(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${i === storyIndex ? "w-8 bg-orange" : "w-2 bg-slate-200 hover:bg-slate-300"}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextStory}
                      aria-label="Next story"
                      className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-navy text-slate-400 hover:text-navy transition-colors"
                    >
                      ›
                    </button>
                  </div>
                  <Button variant="link" className="text-navy font-bold" asChild>
                    <Link to="/projects#impact">Read More Stories <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Be Part of Change CTA */}
      <section className="py-24 relative overflow-hidden" data-testid="home-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-teal" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Be a Part of the Change</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 max-w-4xl mx-auto">
            {["Volunteer your time", "Mentor innovators", "Sponsor a cause", "Support our mission"].map((text, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange" />
                {text}
              </div>
            ))}
          </div>
          
          <Button asChild size="lg" className="bg-orange hover:bg-orange/90 text-white font-bold h-16 px-10 text-lg shadow-xl shadow-orange/20">
            <Link to="/get-involved">Join Us Today <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <PartnerCarousel />
      <NewsletterStrip />
    </Layout>
  );
}
