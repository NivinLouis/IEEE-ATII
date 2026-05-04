import { Layout } from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { routeMeta } from "@/data/site";

export default function PrivacyPage() {
  return (
    <Layout>
      <SEO
        title={routeMeta["/privacy"].title}
        description={routeMeta["/privacy"].description}
        path="/privacy"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-black text-navy mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-10 text-sm">Last updated: May 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Information We Collect</h2>
              <p>
                IEEE Kerala ATIIG collects information you voluntarily provide when you contact us, subscribe to our newsletter, register for events, or apply to volunteer. This may include your name, email address, phone number, organisation, and relevant interests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">How We Use Your Information</h2>
              <p>
                Information you provide is used solely to communicate with you about our programs, events, and initiatives; to process volunteer or membership applications; and to improve our services. We do not sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Cookies</h2>
              <p>
                Our website uses strictly necessary cookies to ensure core functionality. We do not use tracking or advertising cookies. You may configure your browser to refuse cookies; however, some site features may not function correctly without them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Third-Party Links</h2>
              <p>
                This site may contain links to external websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their policies independently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Contact</h2>
              <p>
                For any privacy-related queries, please contact us at{" "}
                <a href="mailto:atiig@ieeekerala.org" className="text-teal hover:underline font-medium">
                  atiig@ieeekerala.org
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
