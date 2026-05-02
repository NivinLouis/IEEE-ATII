import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import colorLogo from "@assets/ATII_CLR_1777748066607.png";

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
      { title: "Donate", href: "/get-involved#donate" },
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
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white transition-shadow duration-300",
        scrolled ? "shadow-md" : "shadow-sm border-b border-border"
      )}
      data-testid="header-main"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0" data-testid="link-logo-header">
          <img src={colorLogo} alt="IEEE Kerala ATIIG Logo" className="h-14 w-auto object-contain logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  location === item.href ||
                  (item.href !== "/" && location.startsWith(item.href));

                if (!item.dropdown) {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        href={item.href}
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
                              href={subItem.href}
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
            data-testid="btn-search"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            asChild
            className="hidden md:flex bg-[#FD7B09] hover:bg-[#e06b08] text-white font-bold tracking-wide shadow-sm"
            data-testid="btn-donate-header"
          >
            <Link href="/get-involved#donate">Donate</Link>
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
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      location === item.href ||
                      (item.href !== "/" && location.startsWith(item.href));
                    return (
                      <div
                        key={item.title}
                        className="flex flex-col border-b border-slate-100 pb-2"
                      >
                        <Link
                          href={item.href}
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
                                href={subItem.href}
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
                    data-testid="btn-mobile-search"
                  >
                    <Search className="w-4 h-4 mr-2" /> Search
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-[#FD7B09] hover:bg-[#e06b08] text-white font-bold"
                    data-testid="btn-mobile-donate"
                  >
                    <Link
                      href="/get-involved#donate"
                      onClick={() => setIsOpen(false)}
                    >
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
