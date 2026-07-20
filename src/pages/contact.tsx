import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema, faqSchema } from "@/components/SEO";
import { routeMeta, SITE_URL } from "@/data/site";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Activity, Users, Calendar, Heart, Lightbulb, Globe, MessageCircle } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

import contactHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(2)_1777748003995.png";

type ContactSubject = "general" | "partner" | "volunteer" | "sponsor" | "media" | "other";

const CONTACT_FAQS = [
  { q: "How quickly do you respond to inquiries?", a: "We aim to respond to all general inquiries within 24-48 business hours." },
  { q: "Can I visit the Innovation Lab?", a: "Yes, visits to the AT Innovation Lab can be arranged by appointment. Please use the contact form to schedule." },
  { q: "How do CSR partnerships work?", a: "We offer structured CSR engagement models with detailed impact reporting. Select 'Sponsorship' in the contact form for a brochure." },
  { q: "Who should I contact for media inquiries?", a: "Please select 'Media / Press' in the contact form subject line, and our communications team will prioritize your request." },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [subject, setSubject] = useState<ContactSubject | "">("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) {
      toast({
        title: "Please select a subject",
        variant: "destructive",
      });
      return;
    }
    if (!agreed) {
      toast({
        title: "Please accept the privacy policy and terms",
        variant: "destructive",
      });
      return;
    }
    
    setIsPending(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/ieeeatii@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Contact Message: ${subject} - ${name.trim()}`,
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim() || "Not provided",
          subject,
          message: message.trim(),
        })
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
          className: "bg-green-50 border-green-200 text-green-800",
        });
        setName("");
        setEmail("");
        setOrganization("");
        setSubject("");
        setMessage("");
        setAgreed(false);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err: any) {
      toast({
        title: "Could not send your message",
        description: err.message || "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Layout>
      <SEO
        title={routeMeta["/contact"].title}
        description={routeMeta["/contact"].description}
        path="/contact"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#webpage`,
            name: "Contact IEEE Kerala ATIIG",
            url: `${SITE_URL}/contact`,
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
          faqSchema(CONTACT_FAQS),
        ]}
      />
      {/* Hero */}
      <section className="bg-slate-50 pt-20 pb-24 border-b border-slate-100" data-testid="contact-hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                <Link to="/" className="hover:text-navy transition-colors">Home</Link>
                <span>/</span>
                <span className="text-navy">Contact</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-6">Contact & Partner With Us</h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                Whether you have a question, want to volunteer, or are looking to partner on an inclusive project, we'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-orange hover:bg-orange/90 text-white font-bold h-14 px-8 text-base shadow-md">
                  <a href="#form">Send us a Message</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-navy text-navy hover:bg-navy/5 font-bold h-14 px-8 text-base">
                  <a href="#partnerships">Explore Partnerships →</a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img src={contactHeroImg} alt="Illustration of a team collaborating on inclusive technology" className="rounded-2xl shadow-xl w-full h-[400px] object-cover" />
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-6 rounded-2xl shadow-xl max-w-[280px] border-l-4 border-teal">
                <p className="italic text-navy font-bold leading-snug">
                  "Stronger together for an inclusive, innovative future."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section id="form" className="py-24 bg-white" data-testid="contact-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-black text-navy mb-8">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:ieeeatii@gmail.com" className="text-slate-600 hover:text-navy font-medium text-lg">ieeeatii@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                    <FaLinkedin className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/company/ieee-assistive-technology-inclusive-innovation-group"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-teal font-medium text-lg break-words"
                    >
                      Visit our LinkedIn page
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center shrink-0">
                    <FaInstagram className="w-5 h-5 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Instagram</h3>
                    <a
                      href="https://www.instagram.com/ieeeatii/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-purple font-medium text-lg break-words"
                    >
                      @ieeeatii
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WhatsApp Channel</h3>
                    <a
                      href="https://whatsapp.com/channel/0029Vb7a6TNBKfhxgIH1Oi3P"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-orange font-medium text-lg break-words"
                    >
                      Follow our WhatsApp channel
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Form */}
            <div className="lg:col-span-7 bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-black text-navy mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-bold">Full Name *</Label>
                    <Input id="name" required placeholder="Jane Doe" className="bg-white h-12" value={name} onChange={(e) => setName(e.target.value)} data-testid="input-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-bold">Email Address *</Label>
                    <Input id="email" type="email" required placeholder="jane@example.com" className="bg-white h-12" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-email" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org" className="text-slate-700 font-bold">Organization / Institution</Label>
                  <Input id="org" placeholder="Your company or university" className="bg-white h-12" value={organization} onChange={(e) => setOrganization(e.target.value)} data-testid="input-organization" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-700 font-bold">Subject *</Label>
                  <Select required value={subject} onValueChange={(v) => setSubject(v as ContactSubject)}>
                    <SelectTrigger className="bg-white h-12" data-testid="select-subject">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="partner">Partnership</SelectItem>
                      <SelectItem value="volunteer">Volunteering</SelectItem>
                      <SelectItem value="sponsor">Sponsorship</SelectItem>
                      <SelectItem value="media">Media / Press</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700 font-bold">Message *</Label>
                  <Textarea id="message" required rows={5} placeholder="How can we help you?" className="bg-white resize-none" value={message} onChange={(e) => setMessage(e.target.value)} data-testid="input-message" />
                </div>
                
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox id="terms" required className="mt-1" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} data-testid="checkbox-terms" />
                  <Label htmlFor="terms" className="text-sm text-slate-600 font-normal leading-relaxed">
                    I agree to the <Link to="/privacy" className="text-navy font-medium underline hover:text-orange">privacy policy</Link> and <Link to="/terms" className="text-navy font-medium underline hover:text-orange">terms of use</Link>. We will never spam you or share your details.
                  </Label>
                </div>
                
                <Button type="submit" disabled={isPending} className="w-full bg-orange hover:bg-orange/90 text-white font-bold h-14 text-base mt-4 shadow-md" data-testid="button-submit-contact">
                  {isPending ? "Sending..." : (<>Send Message <ArrowRight className="ml-2 w-5 h-5" /></>)}
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partnerships" className="py-24 bg-white" data-testid="partner-purpose">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Partner With Purpose</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Collaborate with us to accelerate inclusive innovation across multiple domains.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Activity className="text-navy w-6 h-6" />, title: "Joint Projects", desc: "Collaborate on research and development of assistive tools." },
              { icon: <Users className="text-teal w-6 h-6" />, title: "Internships & Volunteering", desc: "Engage your team in skilled volunteering initiatives." },
              { icon: <Calendar className="text-purple w-6 h-6" />, title: "Events & Workshops", desc: "Co-host accessibility awareness and training events." },
              { icon: <Heart className="text-orange w-6 h-6" />, title: "Donations & Sponsorships", desc: "Fund impactful projects through CSR contributions." },
              { icon: <Lightbulb className="text-navy w-6 h-6" />, title: "Innovation Challenges", desc: "Sponsor hackathons for inclusive hardware and software." },
              { icon: <Globe className="text-teal w-6 h-6" />, title: "Outreach & Awareness", desc: "Partner to scale accessibility audits and advocacy." }
            ].map((pt, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md hover:border-teal transition-all group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {pt.icon}
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{pt.title}</h3>
                <p className="text-slate-600 text-sm">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Social */}
      <section id="faq" className="py-24 bg-slate-50 scroll-mt-24" data-testid="contact-faq">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black text-navy mb-8">Need Help? FAQ</h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                {CONTACT_FAQS.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-orange">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-navy text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple/30 rounded-full blur-2xl"></div>
                <h3 className="text-2xl font-black mb-6 relative z-10">Stay Connected</h3>
                <p className="text-slate-300 mb-8 relative z-10">Follow our journey and join the conversation on social media.</p>
                
                <div className="flex gap-4 relative z-10">
                  <a href="https://www.linkedin.com/company/ieee-assistive-technology-inclusive-innovation-group" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:-translate-y-1 p-4 rounded-xl transition-all" aria-label="LinkedIn">
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/ieeeatii/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:-translate-y-1 p-4 rounded-xl transition-all" aria-label="Instagram">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="https://whatsapp.com/channel/0029Vb7a6TNBKfhxgIH1Oi3P" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:-translate-y-1 p-4 rounded-xl transition-all" aria-label="WhatsApp Channel">
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="py-20 relative overflow-hidden" data-testid="contact-cta">
        <div className="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-95"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Let's Build an Inclusive Tomorrow, Together</h2>
          <Button asChild size="lg" className="bg-white text-navy hover:bg-slate-100 font-black px-10 h-14 text-base shadow-xl">
            <a href="#form">Start a Partnership <ArrowRight className="ml-2 w-5 h-5 text-orange" /></a>
          </Button>
        </div>
      </section>

      <PartnerCarousel />
      <NewsletterStrip />
    </Layout>
  );
}
