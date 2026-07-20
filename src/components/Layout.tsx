import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { AccessibilityMenu } from "./accessibility-menu";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, hideHeader = false, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      {!hideHeader && <Header />}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {children}
      </main>
      <AccessibilityMenu />
      {!hideFooter && <Footer />}
    </div>
  );
}
