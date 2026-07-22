import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { StatCounter } from "@/components/StatCounter";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Target, Eye, List, Heart, Lightbulb, Shield, Handshake, Leaf, Star } from "lucide-react";

import {
  getCanonicalUrl,
  routeMeta,
  GLOBAL_STATS,
  SITE_URL,
} from "@/data/site";

import HeroVisual from "@/components/HeroVisual";

interface Leader {
  name: string;
  role: string;
  image: string;
  website?: string;
}

const professionalExecom: Leader[] = [
  { name: "Robin Tommy", role: "Senior Advisor", image: "/leadership/robin_tommy.webp" },
  {
    name: "Robin Francis",
    role: "Chairperson",
    image: "/leadership/robin_francis.webp",
    website: "https://robinfrancis.in/",
  },
  { name: "Vaishakh Suresh", role: "Vice Chairperson", image: "/leadership/vaishakh_suresh.webp" },
  { name: "Anna Ann Mathew", role: "Secretary", image: "/leadership/anna_ann_mathew.webp" },
  { name: "Lakshmy K J", role: "Treasurer", image: "/leadership/lakshmy_k_j.webp" },
  { name: "Reshmi Ravindranathan", role: "Assistive Tech Lead", image: "/leadership/reshmi_ravindranathan.webp" },
  { name: "Aswathy S Krishna", role: "Inclusion Lead", image: "/leadership/aswathy_s_krishna.webp" },
];

const leadershipTeam: Leader[] = [
  { name: "Vishnu Gopal", role: "Student Activity Chair", image: "/leadership/vishnu_gopal.webp" },
  { name: "Nivin P Louis", role: "Student Representative", image: "/leadership/nivin_p_louis.webp" },
  {
    name: "Shayen Thomas",
    role: "Technical Coordinator",
    image: "/leadership/shayen_thomas.webp",
    website: "https://www.shayenthomas.in/",
  },
  { name: "Chinmayi B S", role: "Travancore Hub SR", image: "/leadership/chinmayi_b_s.webp" },
  { name: "Afreen M H", role: "Kochi Hub SR", image: "/leadership/afreen_m_h.webp" },
  { name: "Dyuthi Korambeth", role: "Malabar Hub SR", image: "/leadership/dyuthi_korambeth.webp" },
  { name: "Gourisankar OP", role: "Assistive Tech Coordinator", image: "/leadership/gourisankar_op.webp" },
  { name: "Roshni K", role: "Inclusive Innovation Coordinator", image: "/leadership/roshni_k.webp" },
  { name: "Alan T F", role: "Video Editor", image: "/leadership/alan_t_f.webp" },
  { name: "Anayya Binoy", role: "Design Head", image: "/leadership/anayya_binoy.webp" },
];


function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function LeadershipCard({ leader, accent }: { leader: Leader; accent: "orange" | "teal" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const nameClasses = accent === "orange" ? "text-orange" : "text-teal";
  const cardContent = (
    <div className="relative aspect-[4/4.9] overflow-hidden bg-navy">
      {!imageFailed ? (
        <img
          src={leader.image}
          alt={leader.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy via-purple to-teal text-3xl font-black text-white">
          {getInitials(leader.name)}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy via-navy/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className={`text-[0.96rem] font-black uppercase leading-[0.95] tracking-[0.02em] ${nameClasses}`}>
          {leader.name}
        </h3>
        <p className="mt-1 text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.08em] text-white/95">
          {leader.role}
        </p>
      </div>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative mx-auto w-full max-w-[220px] overflow-hidden bg-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 14%)",
      }}
    >
      {leader.website ? (
        <a
          href={leader.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${leader.name} — personal website`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        >
          {cardContent}
        </a>
      ) : cardContent}
    </motion.article>
  );
}

function LeadershipGroup({
  title,
  leaders,
  accent,
}: {
  title: string;
  leaders: Leader[];
  accent: "orange" | "teal";
}) {
  const chipClasses =
    accent === "orange"
      ? "border-orange/20 bg-orange/10 text-orange"
      : "border-teal/20 bg-teal/10 text-teal";

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-black text-navy md:text-3xl">{title}</h3>
        </div>
        <div className={`inline-flex h-fit rounded-full border px-4 py-2 text-sm font-bold ${chipClasses}`}>
          {leaders.length} Members
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-5 gap-y-12">
        {leaders.map((leader) => (
          <LeadershipCard key={leader.name} leader={leader} accent={accent} />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title={routeMeta["/about"].title}
        description={routeMeta["/about"].description}
        path="/about"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${getCanonicalUrl("/about")}#webpage`,
            name: "About IEEE ATII / ATIIG Kerala",
            url: getCanonicalUrl("/about"),
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
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
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">About IEEE ATII / ATIIG Kerala</h1>
              <h2 className="text-xl md:text-2xl font-bold text-teal mb-6">Technology for All. Innovation for Inclusion.</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The IEEE Kerala Assistive Technology &amp; Inclusive Innovation Group—also known as IEEE ATII and IEEE ATIIG—is dedicated to harnessing the power of technology to create a more equitable world. We bring together researchers, engineers, volunteers, and communities to design solutions that break down barriers for people with disabilities.
              </p>
            </div>

            <div className="flex-1 relative w-full pb-12">
              <HeroVisual
                variant="about"
                quote="Technology should remove barriers, not create them."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100 relative z-10" data-testid="about-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            <StatCounter value={GLOBAL_STATS.projects} label="Projects" color="navy" />
            <StatCounter value={GLOBAL_STATS.livesImpacted} label="Lives" color="orange" />
            <StatCounter value={GLOBAL_STATS.partners} label="Partners" color="purple" />
            <StatCounter value={GLOBAL_STATS.events} label="Events" color="teal" />
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

          {(() => {
            const milestones = [
              {
                year: "Mar 31, 2026",
                title: "Foundation",
                desc: "ATIIG was founded as the official Assistive Technology & Inclusive Innovation Group of the IEEE Kerala Section, with a vision to design, prototype, and deploy affordable assistive technologies across Kerala.",
              },
              {
                year: "Jun 15, 2026",
                title: "Execom Formation",
                desc: "The Executive Committee was constituted with representatives from industry, academia, and the disability sector to steer strategy, outreach, and program execution across the state.",
              },
              {
                year: "Jul 25, 2026",
                title: "IncluCode",
                desc: "INCLUCODE — the first-of-its-kind accessibility software — was launched, marking ATIIG's first major open-source contribution to inclusive technology for persons with disabilities.",
              },
            ];
            return (
              <div className="relative max-w-6xl mx-auto">
                {/* Desktop horizontal timeline */}
                <div className="hidden md:block">
                  <div className="relative pt-2 pb-2">
                    <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="grid grid-cols-3 gap-8">
                      {milestones.map((item, i) => (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                          className="relative flex flex-col items-center text-center"
                        >
                          <div className="text-teal font-black text-xl mb-3">{item.year}</div>
                          <div className="relative z-10 w-5 h-5 rounded-full bg-orange ring-4 ring-navy shadow-[0_0_0_2px_rgba(253,123,9,0.35)]" />
                          <div className="mt-5 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6 border border-white/10 w-full min-h-[180px]">
                            <h4 className="font-bold text-lg mb-3 leading-snug">{item.title}</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile vertical timeline */}
                <ol className="md:hidden relative space-y-6 pl-6">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/20" />
                  {milestones.map((item, i) => (
                    <motion.li
                      key={item.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute -left-[1.4rem] top-1.5 w-4 h-4 bg-orange rounded-full ring-4 ring-navy" />
                      <div className="text-teal font-black text-lg">{item.year}</div>
                      <h4 className="font-bold text-base mt-1 mb-1.5">{item.title}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Leadership */}
      <section
        id="team"
        className="py-24 bg-[radial-gradient(circle_at_top,_rgba(1,160,160,0.08),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef5ff_100%)]"
        data-testid="about-leadership"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Our Leadership</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The people shaping ATIIG&apos;s direction across strategy, programs, student engagement, and inclusive innovation across Kerala.
            </p>
          </div>

          <div className="space-y-10" data-testid="team-list">
            <LeadershipGroup
              title="Professional Execom"
              leaders={professionalExecom}
              accent="orange"
            />
            <LeadershipGroup
              title="Leadership Team"
              leaders={leadershipTeam}
              accent="teal"
            />
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
