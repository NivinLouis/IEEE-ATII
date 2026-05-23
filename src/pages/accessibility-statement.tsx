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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black text-navy mb-4">Accessibility Statement</h1>
            <p className="text-slate-500 mb-10 text-sm">Last updated: May 2026</p>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Our Commitment</h2>
              <p>
                IEEE Kerala ATIIG is committed to making this website usable for as many people as possible, including people who use assistive technologies, keyboard navigation, or visual adjustment tools. We aim to design and maintain the site with accessibility in mind and to improve it as we learn from users.
              </p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Floating Accessibility Menu</h2>
              <p className="mb-4">
                A floating accessibility menu is available on every page. It saves your preferences in the browser so your chosen settings stay in place when you return.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Font size controls to increase text size</li>
                <li>Line height controls for more readable spacing</li>
                <li>Text alignment controls for left, center, right, or justified layout</li>
                <li>Reading aid mode that dims surrounding content and highlights the reading band</li>
                <li>Grayscale mode for a simpler visual presentation</li>
                <li>Dyslexia-friendly font toggle</li>
                <li>Big cursor mode for easier pointer visibility</li>
                <li>Stop animations toggle to reduce motion</li>
              </ul>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Built-in Accessibility Support</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Semantic page structure and heading hierarchy</li>
                <li>Keyboard-accessible navigation and controls</li>
                <li>Visible focus states on interactive elements</li>
                <li>Text alternatives for informative imagery where applicable</li>
                <li>Brand-colour choices with contrast kept in mind</li>
              </ul>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Known Limitations</h2>
              <p>
                Some third-party or embedded content may not fully support every accessibility preference yet. We review those areas as part of ongoing improvements and update them when practical.
              </p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Feedback</h2>
              <p>
                If you run into a barrier or have a suggestion, please contact us at{" "}
                <a href="mailto:atiig@ieeekerala.org" className="text-teal hover:underline font-medium">
                  atiig@ieeekerala.org
                </a>{" "}
                or call{" "}
                <a href="tel:+9179945426300" className="text-teal hover:underline font-medium">
                  +91 79945 426 300
                </a>. We review accessibility feedback and use it to improve the site.
              </p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-navy mb-3">Standards</h2>
              <p>
                This site is designed with WCAG 2.1 Level AA in mind and is checked with a mix of manual review and automated testing.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
