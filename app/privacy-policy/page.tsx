 'use client';
 import Link from 'next/link';

 export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                PRIVACY POLICY
            </h1>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                At <strong className="text-blue-600">TEDTOOLS</strong>, we respect your privacy and are committed to protecting your personal information. <br />
                This Privacy Policy explains how we collect, use, and safeguard your data <br /> 
                when you use our website (
                    <Link href="https://tedtools.com/" target="_blank" className="text-blue-600 underline">
                    https://tedtools.com
                    </Link> 
                    ) and related services.
            </p>

            <div>
                <section>
                    <h2 className="font-semibold text-xl mb-2">
                        1. Information we collect
                        </h2>

                    <p className='mb-2'>
                        When you use our invoice generation tools, we may collect:
                    </p >

                    <ul className='list-disc list-inside space-y1'>
                        <li>Personal details such as name, email address, and contact information (if provided).</li>
                        <li>Business information added to invoices, such as company name, address, and payment details.</li>
                        <li>Technical data like IP address, browser type, and device information for site functionality and security.</li>
                    </ul>
                </section>

                <br />

                <section>
                <h2 className='font-semibold text-xl mb-2'>
                    2. How we use your information
                    </h2>

                <p className='mb-2'>
                    We use the collected data to:
                    </p>

                <ul className='list-disc list-inside space-y1'>
                <li>
                    Provide and improve our invoicing services.
                    </li>

                <li>
                    Generate and manage your invoices.
                </li>

                <li>
                    Ensure security and prevent unauthorized access.
                    </li>

                <li>
                    Communicate with you regarding updates, support, or important notices.
                    </li>
                </ul>
                </section>
                <br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        3. Data sharing & disclosure
                    </h2>

                    <p className='mb-2'>
                        We do not sell, rent, or trade your personal data. We may only share information:
                        </p>

                        <ul className='list-disc list-inside space-y1'>
                            <li>
                                When required by UAE law or legal processes.
                            </li>

                            <li>
                                With trusted service providers for hosting, analytics, or support, under strict confidentiality agreements.
                            </li>
                        </ul>

                </section>
<br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        4. Data security
                    </h2>

                    <p>We use industry-standard security measures to protect your personal information. <br />
                    However, please note that no method of data transmission or storage is 100% secure.</p>

                </section>
<br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        5. Your rights
                    </h2>

                    <p className='mb-2'>
                        As a user in the UAE, you have the right to:
                    </p>

                    <ul className='list-disc list-inside space-y-1'>
                        <li>Access, correct, or update your personal information.</li>
                        <li>
                            Request deletion of your data, where applicable.
                        </li>
                        <li>
                            Opt out of marketing communications at any time.
                        </li>
                    </ul>
                </section>
<br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        6. Cookies
                    </h2>
                    <p>
                        Our website may use cookies to enhance user experience and improve site performance. <br /> 
                        You can manage your cookie preferences through your browser settings.
                    </p>
                </section>
<br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        7. Third-party links
                    </h2>
                    
                    <p className='mb-2'>
                        Our website may contain links to third-party websites. <br />
                        We are not responsible for their privacy practices, and we encourage you to review their policies.
                     </p>

                </section>
<br />

                <section>
                    <h2 className='font-semibold text-xl mb-2'>
                        8. Changes to this policy
                    </h2>

                    <p className='mb-2'>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page <br />
                        with an updated &quot;Last Updated&quot; date.
                    </p>
                </section>
<br />

                <section>
                    <h2 className= 'font-semibold text-xl mb-2'>
                        9. Contact us
                        </h2>

                        <p className='mb-2'>
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                            <br />
                            Email: 
                           <Link href="mailto:support@tedtools.com" className='text-blue-600 underline'>
                           support@tedtools.com
                           </Link>
                            </p>
                </section>
            </div>
        </main>
    )
}        