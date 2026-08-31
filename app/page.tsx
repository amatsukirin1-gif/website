import { Calendar, Handshake, Heart, Lightbulb, Mail, MapPin, Phone, Target } from "lucide-react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ContactForm } from "./components/ContactForm";
import { NewsletterForm } from "./components/NewsletterForm";
import { PartnershipModalProvider } from "./components/PartnershipModalProvider";
import { PartnershipModal } from "./components/PartnershipModal";
import { PartnershipCtaButton } from "./components/PartnershipCtaButton";
import { FadeIn } from "./components/Section";

export default function Home() {
  return (
    <ThemeProvider>
      <PartnershipModalProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />

          <main id="main-content">
            <Hero />

            {/* Who We Are */}
            <section id="who-we-are" aria-labelledby="who-we-are-heading" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="text-center max-w-4xl mx-auto">
                  <h2 id="who-we-are-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">
                    Who We Are
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed px-2 sm:px-0 text-pretty">
                    The Community Foundation is a <span className="font-semibold text-gray-900 dark:text-white">501(c)(3) nonprofit</span> founded in 2015 with a mission to create
                    sustainable, community-driven solutions. With over <span className="font-semibold text-gray-900 dark:text-white">50 partner organizations</span> across{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">12 countries</span>, we&apos;ve impacted more than{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">100,000 lives</span> through education programs, healthcare initiatives, and
                    economic development projects. Our team of 45 dedicated professionals and 200+ volunteers work tirelessly to bridge gaps and build
                    stronger, more resilient communities.
                  </p>
                </FadeIn>
              </div>
            </section>

            {/* Vision | Mission | Philosophy */}
            <section id="vision" aria-labelledby="vision-heading" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <h2 id="vision-heading" className="sr-only">Our Vision, Mission and Philosophy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <FadeIn delay={0.05} className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                      <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      By 2030, we envision a world where every community has access to quality education, healthcare, and economic opportunities. We aim to
                      create a global network of 500 partner organizations serving 1 million people across 25 countries.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.12} className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We deliver sustainable community development programs through three core pillars: Education (school building, scholarships), Healthcare
                      (mobile clinics, health education), and Economic Empowerment (microfinance, skills training).
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.19} className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                      <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Philosophy</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We practice &ldquo;Community-Led Development&rdquo; — local communities identify their needs, design solutions, and lead implementation. Our role is
                      to provide resources, expertise, and connections while respecting local wisdom and culture.
                    </p>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Partnership CTA */}
            <section aria-labelledby="partner-heading" className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="container mx-auto px-4 sm:px-6 text-center">
                <FadeIn>
                  <Handshake className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" aria-hidden="true" />
                  <h2 id="partner-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">Partner With Us</h2>
                  <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100 px-4 text-pretty">
                    Whether you&apos;re a corporation looking for CSR opportunities, a foundation seeking collaboration, or an individual wanting to make a
                    difference, we have partnership programs tailored to your goals. Join our 50+ partners including Fortune 500 companies, international NGOs,
                    and local community organizations.
                  </p>
                  <PartnershipCtaButton variant="white" className="w-full sm:w-auto text-sm sm:text-base">
                    Start a Partnership
                  </PartnershipCtaButton>
                </FadeIn>
              </div>
            </section>

            {/* Latest Updates */}
            <section id="updates" aria-labelledby="updates-heading" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="text-center mb-10 sm:mb-12">
                  <h2 id="updates-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Latest Updates</h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4">Stay informed about our latest news and announcements</p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <FadeIn delay={0.05} className="group bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      <time dateTime="2026-08-01" className="text-xs sm:text-sm font-medium">August 2026</time>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">New School Opens in Rural Kenya</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      Our latest education initiative has opened doors for 500 students in Kitui County with modern classrooms and computer lab.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.12} className="group bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      <time dateTime="2026-07-15" className="text-xs sm:text-sm font-medium">July 2026</time>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">$2M Healthcare Partnership Announced</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      Major healthcare corporation partners with us to fund mobile clinics across 5 underserved regions in Southeast Asia.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.19} className="group bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      <time dateTime="2026-06-10" className="text-xs sm:text-sm font-medium">June 2026</time>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Volunteer Program Expands to Europe</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      Our successful volunteer program now includes opportunities in Germany, France, and Spain with 100+ new positions available.
                    </p>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <section aria-labelledby="newsletter-heading" className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="max-w-3xl mx-auto text-center">
                  <h2 id="newsletter-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Stay Updated</h2>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8 text-blue-100 text-pretty">
                    Subscribe to our newsletter for the latest updates, partnership opportunities, and community impact stories.
                  </p>
                  <NewsletterForm />
                </FadeIn>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" aria-labelledby="contact-heading" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
              <div className="container mx-auto px-4 sm:px-6">
                <FadeIn className="text-center mb-10 sm:mb-12">
                  <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Contact Us</h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4">Get in touch with our team</p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                  <FadeIn delay={0.05} className="text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" aria-hidden="true">
                      <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a href="mailto:info@communityfoundation.org" className="hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">info@communityfoundation.org</a>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                      <a href="mailto:partnerships@communityfoundation.org" className="hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">partnerships@communityfoundation.org</a>
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.12} className="text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" aria-hidden="true">
                      <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a href="tel:+14155550123" className="hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">+1 (415) 555-0123</a>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">Mon–Fri 9AM–6PM PST</p>
                  </FadeIn>

                  <FadeIn delay={0.19} className="text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" aria-hidden="true">
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Location</h3>
                    <address className="not-italic text-gray-600 dark:text-gray-300">
                      500 Market Street, Suite 800<br />San Francisco, CA 94105
                    </address>
                    <a href="https://maps.google.com/?q=500+Market+Street+San+Francisco+CA+94105" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">View on map →</a>
                  </FadeIn>
                </div>

                <FadeIn delay={0.1} className="max-w-2xl mx-auto mt-10 sm:mt-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                  <ContactForm />
                </FadeIn>
              </div>
            </section>
          </main>

          <footer className="py-8 bg-gray-900 text-gray-400 text-center border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6">
              <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 text-sm">
                <a href="#who-we-are" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Who We Are</a>
                <a href="#vision" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Vision</a>
                <a href="#updates" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Updates</a>
                <a href="#contact" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Contact</a>
                <a href="mailto:info@communityfoundation.org" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Email Us</a>
              </nav>
              <p className="text-sm">&copy; 2026 Community Foundation. All rights reserved. 501(c)(3) nonprofit. EIN: 12-3456789</p>
              <p className="text-xs mt-2 text-gray-500">
                <a href="/privacy" className="hover:text-gray-300 underline-offset-4 hover:underline">Privacy Policy</a> · <a href="/terms" className="hover:text-gray-300 underline-offset-4 hover:underline">Terms</a>
              </p>
            </div>
          </footer>

          <PartnershipModal />
        </div>
      </PartnershipModalProvider>
    </ThemeProvider>
  );
}
