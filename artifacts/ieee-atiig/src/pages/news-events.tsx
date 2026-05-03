import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight } from "lucide-react";
import { useListNews, useListEvents } from "@workspace/api-client-react";

import newsHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(3)_1777748003995.png";
import newsVariantImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_22_PM_(7)_1777748003997.png";
import heroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(1)_1777748003994.png";
import teamImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(1)_1777748003996.png";

const FALLBACK_IMAGES: Record<string, string> = {
  "news-hero": newsHeroImg,
  "news-variant": newsVariantImg,
  hero: heroImg,
  team: teamImg,
};

const FALLBACK_ROTATION = [newsHeroImg, teamImg, heroImg, newsVariantImg];

function resolveImage(url: string, index: number): string {
  if (FALLBACK_IMAGES[url]) return FALLBACK_IMAGES[url];
  if (/^https?:\/\//i.test(url) || url.startsWith("/")) return url;
  return FALLBACK_ROTATION[index % FALLBACK_ROTATION.length];
}

const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatNewsDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatEventDateBadge(value: string | Date): { month: string; day: string } {
  const d = typeof value === "string" ? new Date(value) : value;
  return { month: MONTH_ABBR[d.getMonth()] ?? "", day: String(d.getDate()) };
}

export default function NewsEventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 4, 15));
  const [activeCategory, setActiveCategory] = useState("All Events");

  const eventsQuery = useListEvents();
  const newsQuery = useListNews();

  const events = eventsQuery.data ?? [];
  const news = newsQuery.data ?? [];

  const filteredEvents = useMemo(
    () =>
      activeCategory === "All Events"
        ? events
        : events.filter((e: any) => e.category === activeCategory),
    [events, activeCategory],
  );

  const featuredEvent = useMemo(
    () => events.find((e: any) => e.featured) ?? events[0],
    [events],
  );

  const calendarModifiers = useMemo(() => {
    const eventDates: Date[] = [];
    const workshopDates: Date[] = [];
    for (const e of events) {
      const d = new Date(e.startsAt);
      if (e.category === "Workshops") workshopDates.push(d);
      else eventDates.push(d);
    }
    return { event: eventDates, workshop: workshopDates };
  }, [events]);

  return (
    <Layout>
      <SEO
        title="News & Events | IEEE Kerala ATIIG"
        description="Latest news, upcoming workshops, technical events, and conferences from IEEE Kerala ATIIG. Browse the calendar, filter by category, and join the next event."
        path="/news-events"
        keywords="IEEE Kerala events, IEEE Kerala news, engineering events Kerala, IEEE workshops Kerala 2026"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "News & Events", path: "/news-events" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "IEEE Kerala ATIIG News & Events",
            url: "https://ieee-atiig.replit.app/news-events",
            isPartOf: { "@id": "https://ieee-atiig.replit.app/#website" },
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-slate-50 pt-20 pb-24 border-b border-slate-100" data-testid="news-hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                <Link to="/" className="hover:text-navy transition-colors">Home</Link>
                <span>/</span>
                <span className="text-navy">News & Events</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-6">News & Events</h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Stay updated with our latest initiatives, upcoming workshops, hackathons, and stories of impact from across Kerala.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-bold h-14 px-8 text-base">
                  <a href="#upcoming">Explore Events</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-navy text-navy hover:bg-navy/5 font-bold h-14 px-8 text-base">
                  <a href="#newsletter">Subscribe to Updates</a>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src={newsHeroImg} alt="Hackathon Event" className="rounded-2xl shadow-md h-48 w-full object-cover" />
              <img src={newsVariantImg} alt="Workshop" className="rounded-2xl shadow-md h-48 w-full object-cover translate-y-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="upcoming" className="py-24 bg-white" data-testid="events-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Upcoming Events List */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-black text-navy mb-6 flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-orange" /> Upcoming Events
              </h2>
              
              <div className="space-y-4" data-testid="events-list">
                {eventsQuery.isLoading && (
                  <div className="text-center py-10 text-slate-400 font-medium">Loading events…</div>
                )}
                {!eventsQuery.isLoading && filteredEvents.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-slate-400 font-medium">No events in this category.</p>
                    <button onClick={() => setActiveCategory("All Events")} className="mt-2 text-navy font-bold hover:underline text-sm">Show all events</button>
                  </div>
                )}
                {filteredEvents.map((evt: any) => {
                  const badge = formatEventDateBadge(evt.startsAt);
                  return (
                    <div key={evt.id} className={`p-5 rounded-xl border transition-all ${evt.featured ? 'border-orange bg-orange/5 shadow-sm' : 'border-slate-200 hover:border-navy bg-white'}`}>
                      <div className="flex gap-4">
                        <div className="w-16 flex-shrink-0 text-center">
                          <div className={`text-xs font-black uppercase ${evt.featured ? 'text-orange' : 'text-slate-500'}`}>{badge.month}</div>
                          <div className={`text-2xl font-black ${evt.featured ? 'text-orange' : 'text-navy'}`}>{badge.day}</div>
                        </div>
                        <div>
                          <h3 className="font-bold text-navy mb-2 leading-tight">{evt.title}</h3>
                          <div className="text-xs text-slate-500 space-y-1 mb-4">
                            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {evt.location}</div>
                            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {evt.time}</div>
                          </div>
                          <Button size="sm" variant={evt.featured ? "default" : "outline"} className={evt.featured ? "bg-orange hover:bg-orange/90 text-white font-bold" : "font-bold text-navy"}>
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Event Calendar */}
            <div id="calendar" className="lg:col-span-4 flex flex-col items-center scroll-mt-24">
              <h2 className="text-2xl font-black text-navy mb-6">Event Calendar</h2>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm inline-block w-full max-w-sm">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md mx-auto"
                  modifiers={calendarModifiers}
                  modifiersStyles={{
                    event: { fontWeight: 'bold', backgroundColor: '#fff3e0', color: '#FD7B09' },
                    workshop: { fontWeight: 'bold', backgroundColor: '#e0f2fe', color: '#023A74' }
                  }}
                />
              </div>
              <div className="flex gap-4 mt-6 text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange"></span> Event/Webinar</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-navy"></span> Workshop</div>
              </div>
            </div>
            
            {/* Featured Event */}
            {featuredEvent && (
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-black text-navy mb-6">Featured Event</h2>
                <div className="bg-navy text-white rounded-2xl p-8 shadow-lg h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal/20 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <span className="bg-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded w-fit mb-6">Featured</span>
                    
                    <h3 className="text-3xl font-black mb-4 leading-tight">{featuredEvent.title}</h3>
                    
                    <div className="space-y-3 mb-8 text-slate-300 font-medium">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-teal" /> {new Date(featuredEvent.startsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • {featuredEvent.time}
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal shrink-0 mt-0.5" /> 
                        <span>{featuredEvent.location}</span>
                      </div>
                    </div>
                    
                    {featuredEvent.description && (
                      <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
                        {featuredEvent.description}
                      </p>
                    )}
                    
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white font-bold h-14 text-base mt-auto">
                      Register Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 bg-slate-50 border-y border-slate-100" data-testid="news-categories">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-slate-500 font-bold self-center mr-2">Browse by:</span>
            {["All Events", "Webinars", "Workshops", "Hackathons", "Community", "Conferences"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${activeCategory === cat ? "bg-navy text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-24 bg-white scroll-mt-24" data-testid="latest-news">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-navy">Latest News & Announcements</h2>
          </div>

          {newsQuery.isLoading && (
            <div className="text-center py-10 text-slate-400 font-medium">Loading news…</div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="news-list">
            {news.map((item: any, i: number) => (
              <div key={item.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={resolveImage(item.imageUrl, i)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-4 left-4 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded ${item.badgeColor}`}>
                    {item.badge}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-slate-500 mb-3">{formatNewsDate(item.publishedAt)}</div>
                  <h3 className="font-bold text-navy text-lg mb-3 leading-snug group-hover:text-teal transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">{item.description}</p>
                  <Link to="/news-events" className="text-navy font-bold text-sm inline-flex items-center group-hover:text-orange transition-colors mt-auto">
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-24 bg-navy text-white overflow-hidden scroll-mt-24" data-testid="photo-gallery">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Event Photo Gallery</h2>
          <p className="text-slate-300 text-lg">Moments of inclusion and innovation from across our programs.</p>
        </div>
        
        <div className="flex w-full overflow-x-auto pb-8 hide-scrollbar gap-4 px-4 snap-x">
          {[newsHeroImg, teamImg, heroImg, newsVariantImg, newsHeroImg].map((img, i) => (
            <div key={i} className="relative shrink-0 w-[280px] md:w-[400px] aspect-video rounded-xl overflow-hidden snap-center group cursor-pointer">
              <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold bg-orange px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">View Image</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="newsletter">
        <NewsletterStrip variant="teal" />
      </div>
    </Layout>
  );
}
