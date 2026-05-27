import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema, faqSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";
import { useGetInvolvedCards, useGlobalStats } from "@/lib/sanity/hooks";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { NewsStateBlock } from "@/components/news/NewsStateBlock";
import { Button } from "@/components/ui/button";
import volunteerImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(5)_1777748003996.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Users, Star, Handshake, Heart, ArrowRight, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GetInvolvedPage() {
  const { toast } = useToast();
  const globalStatsQuery = useGlobalStats();
  const getInvolvedCardsQuery = useGetInvolvedCards();
  const globalStats = globalStatsQuery.data;
  const getInvolvedCards = getInvolvedCardsQuery.data ?? [];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interest Submitted!",
      description: "Thank you for reaching out. Our team will contact you shortly.",
    });
  };

  return (
    <Layout>
      <SEO
        title={routeMeta["/get-involved"].title}
        description={routeMeta["/get-involved"].description}
        path="/get-involved"
        keywords="join IEEE Kerala, IEEE volunteer Kerala, IEEE membership Kerala, IEEE partnership Kerala"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Get Involved", path: "/get-involved" },
          ]),
          faqSchema([
            {
              q: "How do I become an IEEE Kerala ATIIG volunteer?",
              a: "Visit our Get Involved page and submit the volunteer interest form. Volunteers help organize workshops, mentor students, lead research initiatives, or support humanitarian technology projects. No prior IEEE membership is required to volunteer.",
            },
            {
              q: "How much does IEEE membership cost in India?",
              a: "IEEE student membership in India costs approximately INR 2,000 per year (USD 27). Professional membership is approximately INR 11,000 per year (USD 142). Discounted rates are available for graduate students and recent graduates. Joining ATIIG itself has no additional fee for IEEE Kerala Section members.",
            },
            {
              q: "Can companies partner with IEEE Kerala ATIIG?",
              a: "Yes. Companies can sponsor workshops, host industry-academia events, mentor research projects, or fund humanitarian initiatives. Partnership inquiries are handled through the contact form on our Get Involved and Contact pages.",
            },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="bg-slate-50 pt-20 pb-24 border-b border-slate-100 text-center" data-testid="get-involved-hero">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-6">Get Involved</h1>
          <p className="text-xl text-slate-600 mb-10 font-medium">
            Together, we can build a world where technology includes everyone.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["Make Real Impact", "Learn & Grow", "Inclusive Community", "Flexible & Remote"].map((pill, i) => (
              <span key={i} className="bg-white border border-slate-200 text-navy font-bold px-5 py-2.5 rounded-full shadow-sm">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-24 bg-white" data-testid="ways-to-get-involved">
        <div className="container mx-auto px-4">
          {!getInvolvedCardsQuery.isLoading && getInvolvedCards.length === 0 && (
            <div className="mb-10">
              <NewsStateBlock
                eyebrow="CMS content missing"
                title="No get-involved cards are available."
                description="Publish `getInvolvedCard` documents in Sanity to populate this section."
              />
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getInvolvedCards.map((way, i) => {
              const cardStyles = {
                volunteer: { icon: <Users className="w-8 h-8" />, color: "text-teal", bg: "bg-teal/10" },
                member: { icon: <Star className="w-8 h-8" />, color: "text-purple", bg: "bg-purple/10" },
                partner: { icon: <Handshake className="w-8 h-8" />, color: "text-orange", bg: "bg-orange/10" },
                join: { icon: <Heart className="w-8 h-8" />, color: "text-navy", bg: "bg-navy/10" },
              } as const;
              const style = cardStyles[way.kind as keyof typeof cardStyles] ?? cardStyles.join;
              const isExternal = /^https?:\/\//.test(way.buttonHref);

              return (
              <div key={i} id={way.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow scroll-mt-32">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${style.bg} ${style.color}`}>
                  {style.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{way.title}</h3>
                <p className="text-slate-600 text-sm mb-8 flex-1">{way.description}</p>
                <Button asChild variant="outline" className={`w-full font-bold ${style.color.replace('text', 'border')} ${style.color} hover:bg-slate-100`}>
                  {isExternal ? (
                    <a href={way.buttonHref} target="_blank" rel="noreferrer">
                      {way.buttonLabel} →
                    </a>
                  ) : (
                    <Link to={way.buttonHref}>
                      {way.buttonLabel} →
                    </Link>
                  )}
                </Button>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Sponsorship & Open Calls */}
      <section id="sponsor" className="py-24 bg-slate-50 scroll-mt-32" data-testid="sponsorships">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Sponsorship Opportunities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Amplify your CSR impact by partnering with us.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Sponsorship Tiers */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Champion", price: "₹5,00,000+/year", border: "border-navy", features: "Logo on all platforms + speaking opportunities + featured in annual report + CSR impact dashboard + premium logo in annual newsletter" },
                { title: "Impact Partner", price: "₹2,50,000/year", border: "border-teal", features: "Logo on website + social media mentions + featured in annual report + newsletter feature + impact updates" },
                { title: "Innovation Partner", price: "₹1,00,000/year", border: "border-orange", features: "Logo on select events + social media mentions + newsletter feature + impact updates" },
                { title: "Community Partner", price: "₹50,000/year", border: "border-purple", features: "Logo on website + social media mentions + event acknowledgements + impact updates" }
              ].map((tier, i) => (
                <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 ${tier.border} flex flex-col`}>
                  <h3 className="text-xl font-black text-navy mb-1">{tier.title}</h3>
                  <div className="text-slate-500 font-bold text-sm mb-4 pb-4 border-b border-slate-100">{tier.price}</div>
                  <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">{tier.features}</p>
                  <Button variant="outline" className="w-full font-bold text-navy border-slate-200">Get in Touch</Button>
                </div>
              ))}
            </div>

            {/* Right: Open Calls */}
            <div className="bg-navy rounded-2xl p-8 text-white shadow-lg flex flex-col">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange animate-pulse"></span>
                Open Calls
              </h3>
              
              <div className="space-y-4 flex-1">
                {[
                  { title: "AT Innovation Hackathon 2025", deadline: "Jun 21, 2025" },
                  { title: "Accessible Education Challenge", deadline: "Jun 30, 2025" },
                  { title: "Community Tech Grants", deadline: "Jul 31, 2025" }
                ].map((call, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-orange text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">New</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 leading-tight group-hover:text-orange transition-colors">{call.title}</h4>
                    <p className="text-white/60 text-xs font-medium">Submit by: {call.deadline}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="link" className="text-orange font-bold text-sm mt-6 p-0 h-auto justify-start hover:text-white">
                View All Open Calls <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Impact */}
      <section className="py-24 bg-white" data-testid="volunteer-form">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Form */}
            <div>
              <h2 className="text-3xl font-black text-navy mb-2">Contribute Your Skills</h2>
              <p className="text-slate-600 mb-8">Fill out the form below and our team will get in touch.</p>
              
              <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" required placeholder="John Doe" className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" className="bg-slate-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interest">What would you like to do?</Label>
                  <Select required>
                    <SelectTrigger className="bg-slate-50">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">Volunteer on a project</SelectItem>
                      <SelectItem value="mentor">Mentor students</SelectItem>
                      <SelectItem value="partner">Institutional Partnership</SelectItem>
                      <SelectItem value="sponsor">Sponsorship Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills/Expertise</Label>
                    <Input id="skills" placeholder="e.g. React, Hardware, Design" className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" placeholder="e.g. 5 hrs/week" className="bg-slate-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} placeholder="Tell us more about how you want to help..." className="bg-slate-50 resize-none" />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-slate-600 font-normal">
                    I agree to Privacy Policy and Terms of Use
                  </Label>
                </div>
                
                <Button type="submit" className="w-full bg-teal hover:bg-teal/90 text-white font-bold h-12 text-base shadow-md">
                  Submit Interest
                </Button>
              </form>
            </div>
            
            {/* Impact & FAQ */}
            <div>
              <div className="mb-8 rounded-3xl overflow-hidden h-48 relative">
                <img src={volunteerImg} alt="Volunteers working on inclusive technology projects" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent flex items-end p-6">
                  <p className="text-white font-bold text-lg">"Every volunteer hour drives real change."</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
                <h3 className="text-xl font-black text-navy mb-6">Our Impact at a Glance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { val: globalStats?.livesImpacted ?? "—", label: "Lives" },
                    { val: globalStats?.projects ?? "—", label: "Projects" },
                    { val: globalStats?.volunteers ?? "—", label: "Volunteers" },
                    { val: globalStats?.partners ?? "—", label: "Partners" },
                    { val: globalStats?.states ?? "—", label: "States" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <div className="text-2xl font-black text-navy mb-1">{stat.val}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-navy mb-6">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {[
                  "How can I volunteer with IEEE AT & IIG?",
                  "Do I need to be an IEEE member to participate?",
                  "What kind of projects can I work on?",
                  "How do I become a partner or sponsor?",
                  "Can students get involved? Is remote volunteering available?"
                ].map((q, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-navy">{q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      We welcome individuals from all backgrounds. You can contribute your technical skills, help with community outreach, or support our operations. Fill out the form on this page to get started.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 relative overflow-hidden" data-testid="join-cta">
        <div className="absolute inset-0 bg-gradient-to-r from-purple to-teal opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Your Voice. Greater Impact.</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join a community of engineers, researchers, and advocates building accessible technology for every Keralite.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-bold h-16 px-12 text-lg shadow-xl shadow-navy/20 w-full sm:w-auto">
              <a href="#join">Join Us</a>
            </Button>
            <Button asChild variant="link" className="text-white hover:text-white/80 font-bold text-lg">
              <a href="#volunteer">Other Ways to Help <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
          </div>
        </div>
      </section>

      <PartnerCarousel />
    </Layout>
  );
}
