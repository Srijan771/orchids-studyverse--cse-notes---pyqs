import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { AdSense } from "@/components/AdSense"

export const metadata = {
  title: "Terms & Conditions - StudyVerse",
  description: "Terms and Conditions for using StudyVerse. Read our terms of service, user guidelines, and policies for using our educational platform.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-zinc-300 leading-relaxed">
                Welcome to StudyVerse. These Terms and Conditions constitute a legally binding agreement between you and StudyVerse governing your access to and use of our website and services. By accessing or using StudyVerse, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not access or use our platform.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                StudyVerse is an educational platform that provides free study notes and affordable previous year question solutions for BTech Computer Science and Engineering students. Our services are intended for educational purposes only, and by using our platform, you agree to use the materials in accordance with these terms and applicable laws.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
              <p className="text-zinc-300 leading-relaxed">
                By using StudyVerse, you represent and warrant that you are at least 18 years of age or have the consent of a parent or guardian to use this platform. You also represent that you have the legal capacity to enter into this agreement and that you will use our services in compliance with all applicable laws and regulations.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Our platform is designed primarily for college and university students pursuing BTech Computer Science and Engineering or related courses. While anyone may access our free resources, certain features such as purchasing PYQ solutions may require verification of your identity or payment information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">User Account and Responsibilities</h2>
              <p className="text-zinc-300 leading-relaxed">
                When you use certain features of our platform, such as submitting reviews or making purchases, you may be required to provide personal information. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information when using our services.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                You agree not to share your account credentials with others, use another person&apos;s account without permission, or engage in any activity that could compromise the security of our platform. You must notify us immediately if you become aware of any unauthorized use of your account or any other breach of security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use Policy</h2>
              <p className="text-zinc-300 leading-relaxed">
                You agree to use StudyVerse only for lawful purposes and in accordance with these Terms. The study materials provided on our platform are intended for personal educational use only. You may download and use our free notes for your own study purposes, but you may not redistribute, sell, or commercially exploit our content without our express written permission.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                When using our platform, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-zinc-300 space-y-2 mt-4">
                <li>Redistribute, resell, or share purchased PYQ solutions with others who have not purchased them</li>
                <li>Upload our content to other websites, file-sharing platforms, or social media without permission</li>
                <li>Use our materials for any commercial purpose without authorization</li>
                <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                <li>Interfere with or disrupt the integrity or performance of our platform</li>
                <li>Engage in any activity that could damage, disable, or impair our services</li>
                <li>Use automated systems or software to extract data from our website</li>
                <li>Submit false information or impersonate others when using our services</li>
                <li>Post or transmit any content that is defamatory, obscene, or otherwise objectionable</li>
                <li>Violate any applicable laws or regulations while using our platform</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
              <p className="text-zinc-300 leading-relaxed">
                All content on StudyVerse, including but not limited to text, graphics, logos, images, study notes, PYQ solutions, and software, is the property of StudyVerse or our content contributors and is protected by copyright, trademark, and other intellectual property laws. The compilation of all content on this platform is the exclusive property of StudyVerse.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                You are granted a limited, non-exclusive, non-transferable license to access and use the materials on our platform for personal educational purposes only. This license does not include the right to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any content obtained from our platform without our prior written consent.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                The study notes and PYQ solutions available on our platform have been created by students and contributors who have granted us the right to distribute these materials. While we strive to ensure originality, if you believe that any content on our platform infringes upon your intellectual property rights, please contact us immediately with details of the alleged infringement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Purchases and Payments</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse offers PYQ solutions for purchase at affordable prices. All prices are displayed in Indian Rupees and include applicable taxes. When you make a purchase, you agree to pay the full price indicated at the time of purchase. We accept payments through secure payment gateways, and all transactions are processed in accordance with the terms of our payment providers.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Upon successful payment, you will receive instant access to download the purchased materials. All purchases are final, and we generally do not offer refunds for digital products that have been downloaded. However, if you experience technical issues preventing you from accessing your purchased content, please contact our support team, and we will work to resolve the issue.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We reserve the right to modify our pricing at any time without prior notice. Any price changes will not affect purchases that have already been completed. We also reserve the right to refuse or cancel any order if we suspect fraudulent activity or violation of these terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Content Accuracy and Disclaimer</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse strives to provide accurate and helpful study materials. However, the notes and solutions on our platform are created by students and may contain errors or omissions. We do not guarantee the accuracy, completeness, or reliability of any content on our platform. You should use our materials as supplementary study aids and verify important information from official sources such as your course textbooks and university guidelines.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                The content provided on StudyVerse is for informational and educational purposes only and should not be considered as professional or academic advice. We are not responsible for any academic decisions you make based on our materials, and we encourage you to consult with your professors and academic advisors for guidance on your studies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-zinc-300 leading-relaxed">
                To the fullest extent permitted by applicable law, StudyVerse and its founders, employees, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our platform, any content obtained from our platform, or any conduct or content of any third party on our platform.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Our total liability to you for all claims arising out of or relating to these terms or your use of our platform shall not exceed the amount you have paid to us in the twelve months preceding the claim. Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
              <p className="text-zinc-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless StudyVerse and its founders, employees, and contributors from and against any claims, liabilities, damages, losses, costs, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of our platform, your violation of these terms, your violation of any third-party rights, or any content you submit to our platform.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">User-Generated Content</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse allows users to submit reviews and feedback about our platform and materials. By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, display, reproduce, modify, and distribute your content in connection with our services. You represent and warrant that you own or have the necessary rights to submit such content and that your content does not infringe upon the rights of any third party.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We reserve the right to remove or modify any user-generated content that we deem inappropriate, offensive, or in violation of these terms. We do not endorse any user-generated content and are not responsible for its accuracy or reliability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
              <p className="text-zinc-300 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time at our sole discretion. If we make material changes to these terms, we will notify you by posting the updated terms on our website and updating the &quot;Last updated&quot; date. Your continued use of our platform after any such changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-zinc-300 leading-relaxed">
                We reserve the right to suspend or terminate your access to our platform at any time, with or without cause, and with or without notice. Upon termination, your right to use our platform will immediately cease. All provisions of these terms that by their nature should survive termination shall survive, including but not limited to intellectual property rights, disclaimers, limitations of liability, and indemnification.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-zinc-300 leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or relating to these terms or your use of our platform shall be resolved exclusively in the courts located in India.
              </p>
            </section>

            <section className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-zinc-300 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="list-none text-zinc-300 space-y-2 mt-4">
                <li><strong>Email:</strong> princesrijan77@gmail.com</li>
                <li><strong>Email:</strong> prathvishsinghyadavgwl@gmail.com</li>
                <li><strong>Website:</strong> StudyVerse Helpline Center</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We will respond to your inquiry and address any concerns you may have about our terms of service.
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
