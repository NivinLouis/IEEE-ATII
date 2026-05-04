import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import whiteLogo from "@assets/ATII_WHITE_1777748066607.png";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8" data-testid="footer-main">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="inline-block" data-testid="link-footer-logo">
              <img src={whiteLogo} alt="IEEE Kerala ATIIG Logo" className="h-16 w-auto object-contain logo-img" />
            </Link>
            <p className="text-slate-300 font-medium tracking-wide">
              "Innovation with Empathy.<br/>Technology with Purpose."
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:text-white text-white p-2.5 rounded-full transition-colors" aria-label="LinkedIn" data-testid="social-linkedin">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:text-white text-white p-2.5 rounded-full transition-colors" aria-label="Facebook" data-testid="social-facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:text-white text-white p-2.5 rounded-full transition-colors" aria-label="Instagram" data-testid="social-instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-orange hover:text-white text-white p-2.5 rounded-full transition-colors" aria-label="YouTube" data-testid="social-youtube">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-orange mr-3 inline-block"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-300 hover:text-orange transition-colors">About Us</Link></li>
              <li><Link to="/about#team" className="text-slate-300 hover:text-orange transition-colors">Our Team</Link></li>
              <li><Link to="/initiatives" className="text-slate-300 hover:text-orange transition-colors">Initiatives</Link></li>
              <li><Link to="/resources" className="text-slate-300 hover:text-orange transition-colors">Resources</Link></li>
              <li><Link to="/news-events" className="text-slate-300 hover:text-orange transition-colors">News & Events</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-teal mr-3 inline-block"></span>
              Get Involved
            </h3>
            <ul className="space-y-3">
              <li><Link to="/get-involved#volunteer" className="text-slate-300 hover:text-teal transition-colors">Volunteer</Link></li>
              <li><Link to="/get-involved#partner" className="text-slate-300 hover:text-teal transition-colors">Partner With Us</Link></li>
              <li><Link to="/get-involved" className="text-slate-300 hover:text-teal transition-colors font-semibold">Join Us</Link></li>
              <li><Link to="/get-involved#sponsor" className="text-slate-300 hover:text-teal transition-colors">Sponsor</Link></li>
              <li><Link to="/get-involved#member" className="text-slate-300 hover:text-teal transition-colors">IEEE Membership</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-purple mr-3 inline-block"></span>
              Resources & Contact
            </h3>
            <ul className="space-y-3 mb-6 border-b border-white/10 pb-6">
              <li><Link to="/resources" className="text-slate-300 hover:text-purple transition-colors">Assistive Tech Libraries</Link></li>
              <li><Link to="/resources#research" className="text-slate-300 hover:text-purple transition-colors">Research</Link></li>
              <li><Link to="/resources#standards" className="text-slate-300 hover:text-purple transition-colors">Guidelines</Link></li>
              <li><Link to="/resources#guides" className="text-slate-300 hover:text-purple transition-colors">Downloads & Guides</Link></li>
              <li><Link to="/contact#faq" className="text-slate-300 hover:text-purple transition-colors">FAQs</Link></li>
            </ul>
            <address className="not-italic text-sm text-slate-300 space-y-2">
              <p className="hover:text-white transition-colors"><a href="mailto:atiig@ieeekerala.org">atiig@ieeekerala.org</a></p>
              <p className="hover:text-white transition-colors"><a href="tel:+9179945426300">+91 79945 426 300</a></p>
              <p>Thiruvananthapuram, Kerala, India</p>
            </address>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} IEEE Kerala ATIIG. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
