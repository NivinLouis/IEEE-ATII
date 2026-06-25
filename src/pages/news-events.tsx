import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema, eventSchema } from "@/components/SEO";
import { NewsStateBlock } from "@/components/news/NewsStateBlock";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Mic2, Sparkles, Trophy } from "lucide-react";
import { routeMeta, SITE_URL } from "@/data/site";
import { useEvents, useNewsArticles, usePhotoGalleryItems } from "@/lib/sanity/hooks";
import {
  formatNewsDate,
  getCategoryTagStyles,
  getNewsBadgeStyles,
  getPrimaryEventCategoryLabel,
  getPrimaryCategoryLabel,
  getSanityImageProps,
} from "@/lib/sanity/presentation";
import { sanityConfigured } from "@/lib/sanity/client";

import newsHeroImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(3)_1777748003995.png";
import newsVariantImg from "@assets/ChatGPT_Image_May_2,_2026,_09_48_22_PM_(7)_1777748003997.png";

const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEventDateBadge(value: string | Date): { month: string; day: string } {
  const d = typeof value === "string" ? new Date(value) : value;
  return { month: MONTH_ABBR[d.getMonth()] ?? "", day: String(d.getDate()) };
}

export default function NewsEventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeCategory, setActiveCategory] = useState("All Events");

  const eventsQuery = useEvents();
  const newsQuery = useNewsArticles();
  const galleryQuery = usePhotoGalleryItems();

  const events = eventsQuery.data ?? [];
  const news = newsQuery.data ?? [];
  const galleryItems = useMemo(
    () =>
      (galleryQuery.data ?? [])
        .map((item) => {
          const image = getSanityImageProps(item.image);
          if (!image?.src) return null;

          return {
            id: item._id,
            img: image.src,
            alt: image.alt || item.caption,
            caption: item.caption,
            tag: getPrimaryEventCategoryLabel(item.categories),
            tagClass: getCategoryTagStyles(item.categories) ?? "bg-orange",
          };
        })
        .filter(Boolean) as {
        id: string;
        img: string;
        alt: string;
        caption: string;
        tag: string;
        tagClass: string;
      }[],
    [galleryQuery.data],
  );

  const eventCategories = useMemo(() => {
    const categories = new Set<string>();
    for (const event of events) {
      if (Array.isArray(event.categories)) {
        for (const category of event.categories) {
          if (category?.title) categories.add(category.title);
        }
      }
    }

    return ["All Events", ...Array.from(categories)];
  }, [events]);

  const filteredEvents = useMemo(
    () =>
      activeCategory === "All Events"
        ? events
        : events.filter((e) =>
            Array.isArray(e.categories)
              ? e.categories.some((category) => category?.title === activeCategory)
              : false,
          ),
    [events, activeCategory],
  );

  const featuredEvent = useMemo(
    () => events.find((e) => e.featured) ?? events[0],
    [events],
  );

  const calendarModifiers = useMemo(() => {
    const eventDates: Date[] = [];
    const workshopDates: Date[] = [];
    for (const e of events) {
      const d = new Date(e.startsAt);
      const primaryCategory = Array.isArray(e.categories)
        ? getPrimaryEventCategoryLabel(e.categories)
        : "Events";
      if (primaryCategory === "Workshops") workshopDates.push(d);
      else eventDates.push(d);
    }
    return { event: eventDates, workshop: workshopDates };
  }, [events]);

  return (
    <Layout>
      <SEO
        title={routeMeta["/news-events"].title}
        description={routeMeta["/news-events"].description}
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
            url: `${SITE_URL}/news-events`,
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
          eventSchema(
            events.slice(0, 6).map((event) => ({
              name: event.title,
              startDate: event.startsAt,
              locationName: event.location,
              description: event.description ?? event.title,
              url: event.registrationUrl?.startsWith("http")
                ? event.registrationUrl
                : `${SITE_URL}${event.registrationUrl ?? "/news-events"}`,
            })),
          ),
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
                    <p className="text-slate-400 font-medium">{events.length === 0 ? "No events are published." : "No events in this category."}</p>
                    {events.length > 0 ? (
                      <button onClick={() => setActiveCategory("All Events")} className="mt-2 text-navy font-bold hover:underline text-sm">Show all events</button>
                    ) : null}
                  </div>
                )}
                {filteredEvents.map((evt) => {
                  const badge = formatEventDateBadge(evt.startsAt);
                  return (
                    <div key={evt._id} className={`p-5 rounded-xl border transition-all ${evt.featured ? 'border-orange bg-orange/5 shadow-sm' : 'border-slate-200 hover:border-navy bg-white'}`}>
                      <div className="flex gap-4">
                        <div className="w-16 flex-shrink-0 text-center">
                          <div className={`text-xs font-black uppercase ${evt.featured ? 'text-orange' : 'text-slate-500'}`}>{badge.month}</div>
                          <div className={`text-2xl font-black ${evt.featured ? 'text-orange' : 'text-navy'}`}>{badge.day}</div>
                        </div>
                        <div>
                          <h3 className="font-bold text-navy mb-2 leading-tight">{evt.title}</h3>
                          <div className="text-xs text-slate-500 space-y-1 mb-4">
                            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {evt.location}</div>
                            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {evt.displayTime}</div>
                          </div>
                          <Button asChild size="sm" variant={evt.featured ? "default" : "outline"} className={evt.featured ? "bg-orange hover:bg-orange/90 text-white font-bold" : "font-bold text-navy"}>
                            <a href={evt.registrationUrl ?? "/get-involved#join"}>{"registrationLabel" in evt && evt.registrationLabel ? evt.registrationLabel : "Register"}</a>
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
                <div className="bg-navy text-white rounded-2xl shadow-lg h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange/30 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal/20 rounded-full blur-2xl"></div>

                  {/* Cover image */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={newsHeroImg} alt={featuredEvent.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    <span className="absolute top-4 left-4 bg-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">Featured</span>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-xs font-bold text-white/90">
                      <Trophy className="w-4 h-4 text-orange" />
                      <span>Prizes worth ₹3,00,000</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col flex-1 p-7">
                    <h3 className="text-2xl font-black mb-4 leading-tight">{featuredEvent.title}</h3>

                    <div className="space-y-2.5 mb-5 text-slate-300 font-medium text-sm">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-4 h-4 text-teal shrink-0" />
                        <span>{new Date(featuredEvent.startsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • {featuredEvent.displayTime}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>{featuredEvent.location}</span>
                      </div>
                    </div>

                    {featuredEvent.description && (
                      <p className="text-slate-400 text-sm mb-5 leading-relaxed line-clamp-3">
                        {featuredEvent.description}
                      </p>
                    )}

                    {/* Agenda highlights */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-teal mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> What to Expect
                      </div>
                      <ul className="space-y-1.5 text-sm text-slate-200">
                        <li className="flex items-start gap-2"><span className="text-orange mt-1">•</span> 36-hour build sprint with hardware kits</li>
                        <li className="flex items-start gap-2"><span className="text-orange mt-1">•</span> Mentorship from industry &amp; persons with disabilities</li>
                        <li className="flex items-start gap-2"><span className="text-orange mt-1">•</span> Demo day with investor &amp; NGO panel</li>
                      </ul>
                    </div>

                    {/* Speakers */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-teal mb-3">
                        <Mic2 className="w-3.5 h-3.5" /> Featured Mentors
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "Dr. Anitha R.", color: "bg-orange/20 text-orange border-orange/40" },
                          { name: "Pranav K.", color: "bg-teal/20 text-teal border-teal/40" },
                          { name: "Meera S.", color: "bg-purple/20 text-purple border-purple/40" },
                          { name: "+ 8 more", color: "bg-white/10 text-white/70 border-white/20" },
                        ].map((s) => (
                          <span key={s.name} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${s.color}`}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full bg-orange hover:bg-orange/90 text-white font-bold h-12 text-base mt-auto">
                      <a href={featuredEvent.registrationUrl ?? "/get-involved#join"}>
                        Register Now <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
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
            {eventCategories.map((cat) => (
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

          {newsQuery.isLoading ? (
            <div className="text-center py-10 text-slate-400 font-medium">Loading news…</div>
          ) : !sanityConfigured ? (
            <NewsStateBlock
              eyebrow="Sanity setup pending"
              title="News CMS is not configured in this frontend yet."
              description="Add the Sanity project environment variables for this app, then publish your first article from the Studio to populate this section."
            />
          ) : news.length === 0 ? (
            <NewsStateBlock
              eyebrow="No published articles"
              title="The newsroom is ready, but there are no published news articles yet."
              description="Create categories and publish your first rich-text article in Sanity Studio. Published items will appear here in descending order by published date."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="news-list">
              {news.map((item) => {
                const image = getSanityImageProps(item.coverImage);

                return (
                  <article
                    key={item._id}
                    className={`rounded-2xl overflow-hidden border flex flex-col group transition-all ${
                      item.featured
                        ? "bg-orange/5 border-orange shadow-sm hover:shadow-md"
                        : "bg-slate-50 border-slate-100 hover:shadow-lg"
                    }`}
                  >
                    <div className="h-48 overflow-hidden relative bg-slate-200">
                      {image?.src ? (
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={image.placeholder ? { backgroundImage: `url(${image.placeholder})`, backgroundSize: "cover" } : undefined}
                        />
                      ) : (
                        <div className="flex h-full items-end bg-[linear-gradient(135deg,rgba(2,58,116,0.92),rgba(2,58,116,0.68),rgba(11,184,173,0.72))] p-5">
                          <span className="max-w-[10rem] text-sm font-bold leading-5 text-white/85">
                            Visual pending in Sanity
                          </span>
                        </div>
                      )}
                      <div className={`absolute top-4 left-4 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded ${getNewsBadgeStyles(item.categories)}`}>
                        {getPrimaryCategoryLabel(item.categories)}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs font-bold text-slate-500 mb-3">{formatNewsDate(item.publishedAt)}</div>
                      <h3 className="font-bold text-navy text-lg mb-3 leading-snug group-hover:text-teal transition-colors">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">{item.excerpt}</p>
                      <Link to={`/news/${item.slug}`} className="text-navy font-bold text-sm inline-flex items-center group-hover:text-orange transition-colors mt-auto">
                        Read Article <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-24 bg-navy text-white overflow-hidden scroll-mt-24" data-testid="photo-gallery">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Event Photo Gallery</h2>
          <p className="text-slate-300 text-lg">Moments of inclusion and innovation from across our programs.</p>
        </div>
        
        <div className="flex w-full overflow-x-auto pb-8 hide-scrollbar gap-4 px-4 snap-x">
          {galleryItems.length === 0 ? (
            <div className="w-full">
              <NewsStateBlock
                eyebrow="No gallery items"
                title="No photo gallery items are available."
                description="Publish `photoGalleryItem` documents with images in Sanity to populate this gallery."
              />
            </div>
          ) : (
            galleryItems.map((item) => (
              <div key={item.id} className="relative shrink-0 w-[280px] md:w-[400px] aspect-video rounded-xl overflow-hidden snap-center group cursor-pointer">
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest text-white px-2.5 py-1 rounded ${item.tagClass}`}>{item.tag}</span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-bold text-sm leading-tight drop-shadow">{item.caption}</p>
                </div>
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold bg-orange px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">View Image</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div id="newsletter">
        <NewsletterStrip variant="teal" />
      </div>
    </Layout>
  );
}
