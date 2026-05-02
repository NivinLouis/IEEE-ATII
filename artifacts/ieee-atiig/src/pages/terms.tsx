import { Layout } from "@/components/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-black text-navy mb-4">Terms of Use</h1>
          <p className="text-slate-500 mb-10 text-sm">Last updated: May 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree, please discontinue use of this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Use of Content</h2>
              <p>
                All content on this site — including text, images, logos, and publications — is the property of IEEE Kerala ATIIG or its licensors. You may share or reproduce content for non-commercial, educational purposes with proper attribution. Commercial use without prior written permission is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">User Conduct</h2>
              <p>
                You agree not to misuse this website, attempt to gain unauthorised access to any part of the site, transmit harmful or unlawful content, or interfere with the site's operation. We reserve the right to suspend access for violations of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Disclaimers</h2>
              <p>
                This website and its content are provided "as is" without warranties of any kind. IEEE Kerala ATIIG makes no representations regarding the accuracy or completeness of information and shall not be liable for any damages arising from use of this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Changes to Terms</h2>
              <p>
                We may update these Terms of Use periodically. Continued use of this site after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Contact</h2>
              <p>
                Questions regarding these terms may be directed to{" "}
                <a href="mailto:hello@ieeekerala.org" className="text-teal hover:underline font-medium">
                  hello@ieeekerala.org
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
