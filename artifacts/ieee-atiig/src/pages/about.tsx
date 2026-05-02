import { Layout } from "@/components/Layout";
import { StatCounter } from "@/components/StatCounter";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, List, Heart, Lightbulb, Shield, Handshake, Leaf, Star, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import aboutHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(6)_1777748003996.png";
import aboutVariantImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(2)_1777748003996.png";

export default function AboutPage() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-slate-50 pt-16 pb-20 border-b border-slate-100" data-testid="about-hero">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                <Link to="/" className="hover:text-navy transition-colors">Home</Link>
                <span>/</span>
                <span className="text-navy">About Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">About IEEE Kerala ATIIG</h1>
              <h2 className="text-xl md:text-2xl font-bold text-teal mb-6">Technology for All. Innovation for Inclusion.</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The IEEE Kerala Assistive Technology & Inclusive Innovation Group (ATIIG) is dedicated to harnessing the power of technology to create a more equitable world. We bring together researchers, engineers, volunteers, and communities to design solutions that break down barriers for people with disabilities.
              </p>
            </div>
            
            <div className="flex-1 relative w-full">
              <div className="grid grid-cols-2 gap-4">
                <img src={aboutHeroImg} alt="Assistive Tech" className="rounded-2xl shadow-md h-48 w-full object-cover" />
                <img src={aboutVariantImg} alt="Community" className="rounded-2xl shadow-md h-48 w-full object-cover translate-y-8" />
              </div>
              <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-white p-5 rounded-xl shadow-xl border-l-4 border-purple max-w-[280px]">
                <p className="italic text-navy font-bold text-sm">
                  "Technology should remove barriers, not create them. — IEEE Kerala ATIIG"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100 relative z-10" data-testid="about-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            <StatCounter value="100+" label="Projects" color="navy" />
            <StatCounter value="25K+" label="Lives" color="orange" />
            <StatCounter value="50+" label="Partners" color="purple" />
            <StatCounter value="65+" label="Events" color="teal" />
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-white" data-testid="about-mission">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To design and develop affordable, accessible, and impactful assistive technologies while fostering an inclusive innovation ecosystem through collaboration, research, and community engagement.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                A world where technology removes barriers and opens equal opportunities for everyone, enabling a future that is inclusive, equitable, and empowered.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mb-6">
                <List className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Core Values</h3>
              <ul className="text-slate-600 leading-relaxed text-left space-y-2 w-full pl-4 border-l-2 border-orange/30">
                <li>Inclusion in everything we do</li>
                <li>Empathy that drives innovation</li>
                <li>Ethics and integrity always</li>
                <li>Collaboration for greater impact</li>
                <li>Sustainability for lasting change</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section id="journey" className="py-24 bg-navy text-white overflow-hidden relative" data-testid="about-journey">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Our Journey</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">From a small vision to a statewide movement for inclusion.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
              {[
                { year: "2016", title: "Foundation", desc: "ATIIG was formed with a vision to create inclusive technology solutions" },
                { year: "2018", title: "First Innovations", desc: "Launched early prototypes focused on accessibility in education and mobility" },
                { year: "2020", title: "Growing Impact", desc: "Expanded projects across Kerala and reached thousands of beneficiaries" },
                { year: "2022", title: "Collaborations", desc: "Built strong partnerships with academia, industry, and non-profits" },
                { year: "2024", title: "Scaling Inclusion", desc: "Accelerating inclusive innovation through new labs and programs" },
                { year: "2025+", title: "Future Forward", desc: "Continuing our journey towards an inclusive and accessible world" }
              ].map((item, i) => (
                <div key={i} className={`relative flex md:block flex-col md:text-center ${i % 2 === 0 ? "md:-mt-24 md:pb-12" : "md:mt-24 md:pt-12"}`}>
                  <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-orange rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"></div>
                  
                  {/* Mobile timeline dot */}
                  <div className="md:hidden w-4 h-4 bg-orange rounded-full absolute -left-2 top-2 z-10"></div>
                  {/* Mobile timeline line */}
                  <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-white/20 ml-[0.35rem]"></div>
                  
                  <div className="pl-6 md:pl-0">
                    <div className="text-teal font-black text-2xl mb-1">{item.year}</div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="team" className="py-24 bg-slate-50" data-testid="about-leadership">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Our Leadership</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The dedicated minds driving our mission forward.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dr. S. Prakash", role: "Chair, IEEE Kerala Section", initials: "SP" },
              { name: "Dr. Neethu G.", role: "Vice Chair, IEEE Kerala Section", initials: "NG" },
              { name: "Mr. Amal Raj", role: "Secretary, IEEE Kerala ATIIG", initials: "AR" },
              { name: "Ms. Anjali Menon", role: "Treasurer, IEEE Kerala ATIIG", initials: "AM" },
              { name: "Mr. Jithin K. & Mr. Abhin K.", role: "Program Leads, IEEE Kerala ATIIG", initials: "JA" },
              { name: "Ms. Fathima R.", role: "Outreach Lead, IEEE Kerala ATIIG", initials: "FR" },
            ].map((person, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                  {person.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy group-hover:text-orange transition-colors">{person.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{person.role}</p>
                  <a href="https://www.linkedin.com/company/ieee-kerala-section/" target="_blank" rel="noopener noreferrer" className="inline-flex text-slate-400 hover:text-navy transition-colors" aria-label="IEEE Kerala LinkedIn">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="py-24 bg-white" data-testid="about-drives-us">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">What Drives Us</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "People First", color: "text-teal" },
              { icon: <Lightbulb className="w-6 h-6" />, title: "Inclusive Design", color: "text-purple" },
              { icon: <Shield className="w-6 h-6" />, title: "Integrity & Quality", color: "text-orange" },
              { icon: <Handshake className="w-6 h-6" />, title: "Collaboration", color: "text-navy" },
              { icon: <Leaf className="w-6 h-6" />, title: "Sustainability", color: "text-teal" },
              { icon: <Star className="w-6 h-6" />, title: "Impact", color: "text-orange" },
            ].map((value, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-full border border-slate-100 shadow-sm">
                <div className={`${value.color}`}>{value.icon}</div>
                <span className="font-bold text-navy text-lg">{value.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="partners" className="scroll-mt-24"><PartnerCarousel /></div>

      {/* CTA block */}
      <section className="py-20 bg-navy text-center" data-testid="about-cta">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Be Part of the Change</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-orange hover:bg-orange/90 text-white font-bold px-8 h-14 text-base">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold px-8 h-14 text-base">
              <Link to="/initiatives">Explore Initiatives</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
