import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Page Not Found (404) | IEEE Kerala ATIIG"
        description="The page you are looking for does not exist. Return to the IEEE Kerala ATIIG home page or explore our initiatives."
        path="/404"
        noindex
      />
      <section className="min-h-[70vh] flex items-center justify-center py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[120px] md:text-[180px] font-black leading-none text-navy/10 select-none mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-navy mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-bold">
              <Link to="/"><Home className="mr-2 w-4 h-4" /> Go Home</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-navy text-navy font-bold hover:bg-navy/5">
              <Link to="/contact"><ArrowLeft className="mr-2 w-4 h-4" /> Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
