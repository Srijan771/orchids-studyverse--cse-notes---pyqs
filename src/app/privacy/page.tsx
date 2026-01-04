import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { AdSense } from "@/components/AdSense"

export const metadata = {
  title: "Privacy Policy - StudyVerse",
  description: "Privacy Policy for StudyVerse. Learn how we collect, use, and protect your personal information when you use our educational platform.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-zinc-300 leading-relaxed">
                Welcome to StudyVerse. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using StudyVerse, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this policy, please do not access the site.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                StudyVerse is an educational platform that provides free notes and affordable previous year question solutions for BTech Computer Science and Engineering students. We understand the importance of maintaining the privacy of our users, especially students who trust us with their information. This policy outlines our practices regarding data collection and usage in a transparent manner.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="text-zinc-300 leading-relaxed">
                We collect information that you provide directly to us when you use our platform. This includes information you provide when creating an account, making a purchase, submitting a support request, or leaving a review. The types of personal information we may collect include your name, email address, phone number, and payment information when you purchase PYQ solutions.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We also automatically collect certain information when you visit our website. This includes your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We use this information to analyze trends, administer the site, track user movements around the site, and gather demographic information about our user base as a whole.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Types of Data Collected</h3>
              <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and contact information provided during support requests or account creation</li>
                <li><strong>Payment Data:</strong> Transaction details processed through our secure payment gateway for PYQ purchases (we do not store your complete payment card information)</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, and navigation patterns</li>
                <li><strong>Device Data:</strong> Information about the device you use to access our site, including device type, operating system, and browser type</li>
                <li><strong>Cookies and Tracking Data:</strong> Data collected through cookies, web beacons, and similar technologies to enhance your experience</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-zinc-300 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services. This includes processing transactions for PYQ purchases, responding to your support requests and inquiries, sending you updates about new content and features, and personalizing your experience on our platform. We also use your information to analyze usage patterns and improve the functionality and user experience of our website.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Specifically, we may use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-zinc-300 space-y-2 mt-4">
                <li>To provide and deliver the services you request, including processing downloads and purchases</li>
                <li>To send you technical notices, updates, security alerts, and support messages</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To communicate with you about products, services, offers, and events</li>
                <li>To monitor and analyze trends, usage, and activities on our platform</li>
                <li>To detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>To personalize and improve your experience on our website</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Advertising</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse uses cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files that are placed on your device when you visit a website. We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device until they expire or you delete them.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and other sites on the Internet. You may opt out of personalized advertising by visiting Google&apos;s Ads Settings at www.google.com/settings/ads.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Third-party vendors, including Google, use cookies to serve ads based on your visits to this and other websites. You can opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting www.aboutads.info/choices or by using browser settings to manage cookie preferences.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly and cannot be disabled</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="text-zinc-300 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information in certain circumstances. We may share information with service providers who assist us in operating our website, conducting our business, or serving our users, as long as those parties agree to keep this information confidential.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We may also disclose your information when we believe it is necessary to comply with the law, enforce our site policies, or protect our or others&apos; rights, property, or safety. Non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of that transaction. We will notify you via email and through a prominent notice on our website of any change in ownership or uses of your personal information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-zinc-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit, secure storage of personal information, regular security assessments, and access controls to limit who can access your data.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure. We cannot guarantee the absolute security of your data, but we are committed to implementing industry-standard practices to protect your information to the best of our ability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
              <p className="text-zinc-300 leading-relaxed">
                You have certain rights regarding your personal information. You can access, update, or delete your personal information by contacting us through our support channels. You can opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages. You can also manage your cookie preferences through your browser settings.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                If you are a resident of the European Economic Area or other jurisdictions with similar data protection laws, you may have additional rights such as the right to data portability, the right to restrict processing, and the right to object to processing. To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse is intended for college and university students, typically aged 18 and above. We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-zinc-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            <section className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-zinc-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none text-zinc-300 space-y-2 mt-4">
                <li><strong>Email:</strong> princesrijan77@gmail.com</li>
                <li><strong>Email:</strong> prathvishsinghyadavgwl@gmail.com</li>
                <li><strong>Website:</strong> StudyVerse Helpline Center</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We will respond to your inquiry within a reasonable timeframe and work to address any concerns you may have about our privacy practices.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <AdSense />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
