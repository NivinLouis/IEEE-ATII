import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";

export default function AccessibilityStatementPage() {
  return (
    <Layout>
      <SEO
        title={routeMeta["/accessibility"].title}
        description={routeMeta["/accessibility"].description}
        path="/accessibility"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Accessibility", path: "/accessibility" },
          ]),
        ]}
      />
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-black text-navy mb-4">Accessibility Statement</h1>
          <p className="text-slate-500 mb-10 text-sm">Last updated: May 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Our Commitment</h2>
              <p>
                IEEE Kerala ATIIG is committed to ensuring this website is accessible to everyone, including people with disabilities. We actively work to meet and exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Accessibility Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keyboard-navigable interface — all interactive elements are reachable via keyboard</li>
                <li>Screen reader compatibility — semantic HTML and ARIA labels throughout</li>
                <li>Font size controls — increase or decrease text size via the toolbar</li>
                <li>High Contrast mode — toggle for improved readability</li>
                <li>Text-only mode — removes decorative imagery for a cleaner reading experience</li>
                <li>Skip to content link — bypass navigation for screen reader users</li>
                <li>Sufficient colour contrast — all text meets WCAG 2.1 AA contrast ratios</li>
                <li>Focus indicators — clearly visible focus outlines on all interactive elements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Known Limitations</h2>
              <p>
                We are continuously improving this site. Some third-party embedded content (such as map iframes) may not yet fully meet our accessibility standards. We are working with our partners to address these gaps.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of this site. If you encounter barriers or have suggestions, please contact us at{" "}
                <a href="mailto:atiig@ieeekerala.org" className="text-teal hover:underline font-medium">
                  atiig@ieeekerala.org
                </a>{" "}
                or call{" "}
                <a href="tel:+9179945426300" className="text-teal hover:underline font-medium">
                  +91 79945 426 300
                </a>. We aim to respond to accessibility feedback within 5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Standards</h2>
              <p>
                This site is designed to conform to WCAG 2.1 Level AA. It is tested regularly using automated tools and manual review with assistive technologies including screen readers.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
