import { Calendar, CheckCircle2, FileText, Mail, MapPin, Phone, Shield, Target, Users, Lightbulb } from "lucide-react";
import { ThemeProvider } from "./components/ThemeProvider";
import { CompanyHeader } from "./components/CompanyHeader";
import { CompanyHero } from "./components/CompanyHero";
import { InlineApplySection } from "./components/InlineApplySection";
import { ApplyProvider } from "./components/ApplyProvider";
import { ApplyModal } from "./components/ApplyModal";
import { FadeIn } from "./components/Section";
import { JobCard } from "./components/JobCard";

export default function Home() {
  return (
    <ThemeProvider>
      <ApplyProvider>
        <div className="min-h-screen bg-background text-foreground">
          <CompanyHeader />

          <main id="main-content">
            <CompanyHero />

            {/* About */}
            <section id="about" aria-labelledby="about-heading" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="max-w-3xl mx-auto text-center">
                  <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-balance">About Our Company</h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
                    We’re a product-driven team of 200+ people building reliable software for thousands of customers. Founded in 2015, we value
                    clear communication, ownership, and continuous learning. Our IT team keeps everyone productive — from onboarding to security.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                    {[
                      { icon: Users, title: "People First", desc: "Flexible work, mentorship, and growth paths." },
                      { icon: Target, title: "Impact", desc: "Your work ships to real users every week." },
                      { icon: Shield, title: "Trust", desc: "Security and privacy by default." },
                    ].map((f) => (
                      <div key={f.title} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <f.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                        <h3 className="font-semibold mt-2">{f.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* Jobs */}
            <section id="jobs" aria-labelledby="jobs-heading" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="text-center max-w-2xl mx-auto">
                  <h2 id="jobs-heading" className="text-3xl sm:text-4xl font-bold">Open Positions</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-3">Find your next role. All listings support the new one-click Apply — no email app needed.</p>
                </FadeIn>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <FadeIn delay={0.05}><JobCard title="IT Support" location="San Francisco / Remote" type="On-site • Remote" featured /></FadeIn>
                  <FadeIn delay={0.12}><JobCard title="Frontend Developer" location="Remote • EU" type="Remote" /></FadeIn>
                  <FadeIn delay={0.18}><JobCard title="UI/UX Designer" location="New York • Hybrid" type="Hybrid" /></FadeIn>
                </div>
                <FadeIn className="text-center mt-6">
                  <a href="#apply" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4">Don’t see your role? Apply anyway — we review every applicant →</a>
                </FadeIn>
              </div>
            </section>

            {/* Requirements */}
            <section id="requirements" aria-labelledby="requirements-heading" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <FadeIn>
                    <h2 id="requirements-heading" className="text-3xl font-bold">Requirements — IT Support</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">What you’ll need to succeed. If you meet 70% of these, we still want to hear from you.</p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "1–3 years in helpdesk / IT support or equivalent practical experience",
                        "Windows & macOS troubleshooting, M365 / Google Workspace admin",
                        "Basic networking: DNS, DHCP, VPN, Wi-Fi diagnostics",
                        "Customer-first mindset — clear, patient communication",
                        "Bonus: JAMF, Intune, Active Directory, or scripting (PowerShell/Bash)",
                      ].map((r) => (
                        <li key={r} className="flex gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"><FileText className="w-3.5 h-3.5" /> Resume / CV</span>
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"><FileText className="w-3.5 h-3.5" /> Cover letter optional</span>
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Portfolio / certs if any</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-amber-500" /> What to include in your application</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Use this template — our form generates it for you automatically:</p>
                    <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 font-mono text-xs leading-relaxed">
                      <p><span className="text-gray-500">To:</span> recruitment@company.com</p>
                      <p><span className="text-gray-500">Subject:</span> Job Application - IT Support</p>
                      <hr className="my-3 border-gray-200 dark:border-gray-700" />
                      <p>Dear Recruitment Team,</p>
                      <br />
                      <p>I would like to apply for the IT Support position.</p>
                      <br />
                      <p>Name:<br />Phone:<br />Email:</p>
                      <br />
                      <p>I have attached my resume and other requirements.</p>
                      <br />
                      <p>Thank you.</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">The Quick Apply form below fills this in from your Name/Phone/Email and attaches your files — no manual email needed.</p>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Apply Now — Browser-based solution */}
            <section id="apply" aria-labelledby="apply-heading" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 scroll-mt-20 border-t border-gray-100 dark:border-gray-800">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="max-w-3xl mx-auto text-center">
                  <h2 id="apply-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">Apply Now — Works for Everyone</h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 text-pretty">
                    The old <span className="font-mono text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-1.5 py-0.5 rounded">mailto:recruitment@company.com</span> needs a configured mail app and fails for many applicants.
                    Our new flow works 100% in the browser.
                  </p>
                  <div className="mt-6 inline-flex flex-wrap justify-center gap-2 text-xs">
                    <span className="px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">✕ Old: Gmail/Outlook/Mail app required</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">✓ New: Browser · Phone · Any device</span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1} className="mt-8 max-w-5xl mx-auto">
                  <InlineApplySection />
                </FadeIn>

                <FadeIn className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Having trouble? Email directly: <a href="mailto:recruitment@company.com?subject=Job%20Application%20-%20IT%20Support" className="font-mono font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4">recruitment@company.com</a> — or use the webmail buttons above.</p>
                </FadeIn>
              </div>
            </section>

            {/* Trust / Updates */}
            <section aria-labelledby="updates-heading" className="py-12 sm:py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <h3 className="font-semibold mt-2">Fast response</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">We review within 1–2 business days. You’ll get a confirmation and next steps.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <Shield className="w-5 h-5 text-green-600" aria-hidden="true" />
                    <h3 className="font-semibold mt-2">Privacy respected</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Your data is only used for hiring. Stored securely, never shared.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <Users className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                    <h3 className="font-semibold mt-2">Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Questions? Contact <a href="mailto:recruitment@company.com" className="text-blue-600 dark:text-blue-400 hover:underline">recruitment@company.com</a></p>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* Contact compact */}
            <section className="py-10 bg-gray-900 text-gray-300">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6 justify-between text-sm">
                  <div className="flex gap-6">
                    <a href="mailto:recruitment@company.com" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Mail className="w-4 h-4" /> recruitment@company.com</a>
                    <a href="tel:+14155550123" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Phone className="w-4 h-4" /> +1 (415) 555-0123</a>
                  </div>
                  <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> 500 Market St, SF, CA 94105</span>
                </div>
              </div>
            </section>
          </main>

          <footer className="py-6 bg-gray-900 text-gray-500 text-center border-t border-gray-800 text-sm">
            <div className="container mx-auto px-4 sm:px-6">
              <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-3 text-xs">
                <a href="#about" className="hover:text-gray-300">About</a>
                <a href="#jobs" className="hover:text-gray-300">Jobs</a>
                <a href="#requirements" className="hover:text-gray-300">Requirements</a>
                <a href="#apply" className="hover:text-gray-300">Apply Now</a>
              </nav>
              <p>© 2026 Company. All rights reserved.</p>
            </div>
          </footer>

          <ApplyModal />
        </div>
      </ApplyProvider>
    </ThemeProvider>
  );
}
