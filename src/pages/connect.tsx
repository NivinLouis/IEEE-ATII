import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta, SITE_URL } from "@/data/site";
import { FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin } from "react-icons/fa";
import { ArrowUpRight, Share2, QrCode, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import colorLogo from "@assets/ATII_CLR_1777748066607.png";
import blackLogo from "@assets/ATII_BLK_1777748066607.png";

// Reusable data structure for links
const CONNECT_LINKS = [
  {
    id: "instagram",
    label: "Follow us on Instagram",
    supportingText: "Updates, events and community highlights",
    url: "https://www.instagram.com/ieeeatii?utm_source=connect_page",
    icon: FaInstagram,
    colorClasses: {
      iconBg: "bg-[#E1306C]/10 dark:bg-[#E1306C]/25 text-[#E1306C] dark:text-[#FF6496]",
      hoverBorder: "hover:border-[#E1306C]/30 focus-visible:ring-[#E1306C]",
    },
  },
  {
    id: "whatsapp-channel",
    label: "Join our WhatsApp Channel",
    supportingText: "Receive official updates and announcements",
    url: "https://www.whatsapp.com/channel/0029Vb7a6TNBKfhxgIH1Oi3P?utm_source=connect_page",
    icon: FaWhatsapp,
    colorClasses: {
      iconBg: "bg-[#25D366]/10 dark:bg-[#25D366]/20 text-[#25D366] dark:text-[#4ade80]",
      hoverBorder: "hover:border-[#25D366]/30 focus-visible:ring-[#25D366]",
    },
  },
  {
    id: "whatsapp-community",
    label: "Join the IEEE ATII Community",
    supportingText: "Connect with members, volunteers and participants",
    url: "https://chat.whatsapp.com/ETz8TLchShU95RHFCgWCq0?mode=hqctswi&utm_source=connect_page",
    icon: FaWhatsapp,
    colorClasses: {
      iconBg: "bg-[#25D366]/10 dark:bg-[#25D366]/20 text-[#25D366] dark:text-[#4ade80]",
      hoverBorder: "hover:border-[#25D366]/30 focus-visible:ring-[#25D366]",
    },
  },
  {
    id: "youtube",
    label: "Subscribe on YouTube",
    supportingText: "Watch sessions, talks and event recordings",
    url: "https://www.youtube.com/@ieeeatii?utm_source=connect_page",
    icon: FaYoutube,
    colorClasses: {
      iconBg: "bg-[#FF0000]/10 dark:bg-[#FF0000]/20 text-[#FF0000] dark:text-[#ff4d4d]",
      hoverBorder: "hover:border-[#FF0000]/30 focus-visible:ring-[#FF0000]",
    },
  },
  {
    id: "linkedin",
    label: "Follow us on LinkedIn",
    supportingText: "Professional updates, opportunities and initiatives",
    url: "https://www.linkedin.com/company/ieee-assistive-technology-inclusive-innovation-group/?utm_source=connect_page",
    icon: FaLinkedin,
    colorClasses: {
      iconBg: "bg-[#0077B5]/10 dark:bg-[#0077B5]/20 text-[#0077B5] dark:text-[#38bdf8]",
      hoverBorder: "hover:border-[#0077B5]/30 focus-visible:ring-[#0077B5]",
    },
  },
];

export default function ConnectPage() {
  const [textOnly, setTextOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTextOnly(document.body.classList.contains("text-only"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const currentLogo = textOnly ? blackLogo : colorLogo;
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}/connect`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Connect page URL copied to clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please copy the URL from the browser address bar.",
          variant: "destructive",
        });
      });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Connect with IEEE ATII",
      text: "Access the official social media, WhatsApp community, announcements and professional channels of IEEE ATII.",
      url: shareUrl,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismissed the share sheet — do nothing
        if ((err as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const downloadQRCode = async () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}`;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "ieee_atii_connect_qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast({
        title: "QR Code downloaded!",
        description: "You can now share this QR code.",
      });
    } catch (err) {
      toast({
        title: "Failed to download",
        description: "Please right click the QR image inside the modal to save.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <SEO
        title={routeMeta["/connect"].title}
        description={routeMeta["/connect"].description}
        path="/connect"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Connect with IEEE ATII", path: "/connect" },
          ]),
        ]}
      />

      <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950/20 min-h-[calc(100vh-5rem)] flex flex-col justify-center animate-in fade-in duration-500">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Header Card */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 select-none">
              <img
                src={currentLogo}
                alt="IEEE Kerala ATIIG Logo"
                className="h-14 sm:h-16 w-auto object-contain logo-img"
              />
            </div>
            


            <h1 className="text-xl sm:text-2xl font-black text-navy dark:text-white leading-tight tracking-tight mb-3">
              IEEE Assistive Technology and Inclusive Innovation Group
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Connect with IEEE ATII, join our community and follow our work in assistive technology, accessibility and inclusive innovation.
            </p>
          </div>

          {/* Links Collection */}
          <div className="flex flex-col gap-4">
            {CONNECT_LINKS.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-platform={link.id}
                  className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-2xs hover:bg-slate-50/30 dark:hover:bg-slate-900/70 hover:shadow-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 active:scale-[0.98] ${link.colorClasses.hoverBorder}`}
                  aria-label={`${link.label} - opens in a new tab`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none ${link.colorClasses.iconBg}`}
                    >
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    </div>
                    
                    <div className="flex flex-col text-left min-w-0">
                      <h2 className="font-extrabold text-sm sm:text-base text-navy dark:text-white leading-snug truncate">
                        {link.label}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-medium leading-normal truncate sm:whitespace-normal">
                        {link.supportingText}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 shrink-0">
                    <ArrowUpRight
                      className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 dark:text-slate-500 transition-all duration-300 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              );
            })}
          </div>

          {/* ── Mobile: compact pill badges ── */}
          <div className="flex sm:hidden justify-center gap-2 mt-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-navy/5 hover:bg-navy/10 dark:bg-white/8 dark:hover:bg-white/12 text-navy dark:text-white border border-navy/15 dark:border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 active:scale-95 cursor-pointer"
              aria-label="Share this links page"
            >
              <Share2 className="h-3 w-3" aria-hidden="true" />
              Share Page
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-navy/5 hover:bg-navy/10 dark:bg-white/8 dark:hover:bg-white/12 text-navy dark:text-white border border-navy/15 dark:border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 active:scale-95 cursor-pointer"
                  aria-label="View QR code for this page"
                >
                  <QrCode className="h-3 w-3" aria-hidden="true" />
                  QR Code
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm rounded-2xl border-slate-200 bg-white dark:bg-slate-900 p-6 text-center">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black text-navy dark:text-white">QR Code</DialogTitle>
                  <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Scan to access official links of IEEE Kerala ATIIG.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 select-none">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareUrl)}`}
                    alt="IEEE Kerala ATIIG Connect QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <Button
                  onClick={downloadQRCode}
                  className="w-full bg-[#FD7B09] hover:bg-[#e06b08] text-white font-black h-11 rounded-xl shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" /> Download QR Image
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* ── Desktop: full-width outline buttons ── */}
          <div className="hidden sm:grid grid-cols-2 gap-3 mt-6">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-navy dark:text-white font-bold h-11 rounded-xl shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Share2 className="h-4 w-4 mr-2" aria-hidden="true" /> Share Page
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-navy dark:text-white font-bold h-11 rounded-xl shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <QrCode className="h-4 w-4 mr-2" aria-hidden="true" /> QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm rounded-2xl border-slate-200 bg-white dark:bg-slate-900 p-6 text-center">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black text-navy dark:text-white">QR Code</DialogTitle>
                  <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Scan to access official links of IEEE Kerala ATIIG.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 select-none">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareUrl)}`}
                    alt="IEEE Kerala ATIIG Connect QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <Button
                  onClick={downloadQRCode}
                  className="w-full bg-[#FD7B09] hover:bg-[#e06b08] text-white font-black h-11 rounded-xl shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" /> Download QR Image
                </Button>
              </DialogContent>
            </Dialog>
          </div>


        </div>
      </section>
    </Layout>
  );
}
