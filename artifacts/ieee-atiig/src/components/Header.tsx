import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { routeMeta } from "@/data/site";
import colorLogo from "@assets/ATII_CLR_1777748066607.png";
import blackLogo from "@assets/ATII_BLK_1777748066607.png";

const NAV_ITEMS = [
  { title: "Home", href: "/", dropdown: null },
  {
    title: "About Us",
    href: "/about",
    dropdown: [
      { title: "About ATIIG", href: "/about" },
      { title: "Our Team", href: "/about#team" },
      { title: "Our Journey", href: "/about#journey" },
      { title: "Partners", href: "/about#partners" },
    ],
  },
  {
    title: "Initiatives",
    href: "/initiatives",
    dropdown: [
      { title: "All Initiatives", href: "/initiatives" },
      { title: "AT Innovation Lab", href: "/initiatives#innovation-lab" },
      { title: "Community Outreach", href: "/initiatives#outreach" },
      { title: "Inclusive Education", href: "/initiatives#education" },
      { title: "Accessible Campus", href: "/initiatives#campus" },
      { title: "Capacity Building", href: "/initiatives#capacity" },
      { title: "Humanitarian Technology", href: "/initiatives#humanitarian" },
    ],
  },
  {
    title: "Projects & Impact",
    href: "/projects",
    dropdown: [
      { title: "All Projects", href: "/projects" },
      { title: "Featured Projects", href: "/projects#featured" },
      { title: "Impact Stories", href: "/projects#impact" },
      { title: "SDG Alignment", href: "/projects#sdg" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    dropdown: [
      { title: "Guides & Toolkits", href: "/resources#guides" },
      { title: "Research & Publications", href: "/resources#research" },
      { title: "Standards & Guidelines", href: "/resources#standards" },
      { title: "Videos & Webinars", href: "/resources#videos" },
    ],
  },
  {
    title: "Get Involved",
    href: "/get-involved",
    dropdown: [
      { title: "Volunteer", href: "/get-involved#volunteer" },
      { title: "Become a Member", href: "/get-involved#member" },
      { title: "Partner With Us", href: "/get-involved#partner" },
      { title: "Sponsor Us", href: "/get-involved#sponsor" },
      { title: "Join Us", href: "/get-involved#join" },
    ],
  },
  {
    title: "News & Events",
    href: "/news-events",
    dropdown: [
      { title: "Upcoming Events", href: "/news-events#upcoming" },
      { title: "Event Calendar", href: "/news-events#calendar" },
      { title: "Latest News", href: "/news-events#news" },
      { title: "Photo Gallery", href: "/news-events#gallery" },
    ],
  },
  { title: "Contact", href: "/contact", dropdown: null },
];

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [textOnly, setTextOnly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTextOnly(document.body.classList.contains("text-only"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const currentLogo = textOnly ? blackLogo : colorLogo;
  const searchResults = Object.entries(routeMeta).filter(([path, meta]) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ["/", "/initiatives", "/projects", "/get-involved"].includes(path);
    return `${meta.title} ${meta.description} ${path}`.toLowerCase().includes(needle);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white transition-shadow duration-300",
        scrolled ? "shadow-md" : "shadow-sm border-b border-border"
      )}
      data-testid="header-main"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex-shrink-0" data-testid="link-logo-header">
          <img
            src={currentLogo}
            alt="IEEE Kerala ATIIG Logo"
            className="h-14 w-auto object-contain logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/" && location.pathname.startsWith(item.href));

                if (!item.dropdown) {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        to={item.href}
                        className={cn(
                          "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition-colors",
                          "text-navy bg-transparent hover:bg-slate-100 hover:text-orange",
                          isActive && "text-orange bg-slate-50 nav-link-active"
                        )}
                        data-testid={`nav-link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "font-semibold text-navy bg-transparent hover:bg-slate-100 hover:text-orange transition-colors",
                        isActive && "text-orange nav-link-active bg-slate-50"
                      )}
                      data-testid={`nav-dropdown-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[280px] gap-1 p-3 bg-white shadow-lg rounded-md border border-slate-100">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              to={subItem.href}
                              className="block select-none rounded-md p-3 text-sm font-medium text-navy leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-orange focus:bg-slate-100 focus:text-orange"
                              data-testid={`nav-sublink-${subItem.title.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-navy hover:text-orange hover:bg-slate-100"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            data-testid="btn-search"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            asChild
            className="hidden md:flex bg-[#FD7B09] hover:bg-[#e06b08] text-white font-bold tracking-wide shadow-sm"
            data-testid="btn-join-header"
          >
            <Link to="/get-involved">Join Us</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden text-navy hover:bg-slate-100"
                data-testid="btn-mobile-menu"
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] overflow-y-auto pt-16 bg-white"
              aria-describedby={undefined}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4">
                <div className="mb-4">
                  <img
                    src={blackLogo}
                    alt="IEEE Kerala ATIIG"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      location.pathname === item.href ||
                      (item.href !== "/" && location.pathname.startsWith(item.href));
                    return (
                      <div
                        key={item.title}
                        className="flex flex-col border-b border-slate-100 pb-2"
                      >
                        <Link
                          to={item.href}
                          className={cn(
                            "py-2 font-bold text-lg transition-colors",
                            isActive ? "text-orange" : "text-navy"
                          )}
                          onClick={() => !item.dropdown && setIsOpen(false)}
                          data-testid={`mobile-nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {item.title}
                        </Link>
                        {item.dropdown && (
                          <div className="flex flex-col pl-4 mt-1 gap-1 border-l-2 border-slate-100 ml-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                className="text-slate-600 hover:text-orange py-1 transition-colors font-medium text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-navy border-slate-200"
                    onClick={() => {
                      setIsOpen(false);
                      setSearchOpen(true);
                    }}
                    data-testid="btn-mobile-search"
                  >
                    <Search className="w-4 h-4 mr-2" /> Search
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-[#FD7B09] hover:bg-[#e06b08] text-white font-bold"
                    data-testid="btn-mobile-join"
                  >
                    <Link
                      to="/get-involved"
                      onClick={() => setIsOpen(false)}
                    >
                      Join Us
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl rounded-xl border-slate-200 bg-white p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-3 border-b border-slate-100">
            <DialogTitle className="text-2xl font-black text-navy">Search IEEE Kerala ATIIG</DialogTitle>
            <DialogDescription>
              Find initiatives, projects, resources, events, and ways to get involved.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for accessibility, workshops, projects..."
                className="h-12 pl-11 text-base"
                autoFocus
              />
            </div>
            <div className="mt-5 grid gap-2">
              {searchResults.map(([path, meta]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setSearchOpen(false)}
                  className="group rounded-lg border border-slate-100 p-4 transition-colors hover:border-orange/40 hover:bg-orange/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-black text-navy group-hover:text-orange transition-colors">
                        {meta.title}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {meta.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 group-hover:text-orange transition-colors" />
                  </div>
                </Link>
              ))}
              {searchResults.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-slate-500">
                  No matching pages found. Try “projects”, “volunteer”, “resources”, or “events”.
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
