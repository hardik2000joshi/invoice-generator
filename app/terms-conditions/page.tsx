'use client';
import Link from 'next/link';

export default function TermsandConditions() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                TERMS & CONDITIONS
                </h1>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                Welcome to <strong>TEDTOOLS!</strong> These Terms & Conditions (“Terms”) govern your use of our website <br />
                (<Link href="https://tedtools.com/">https://tedtools.com</Link>
                ) and services. By accessing or using our platform, you agree to comply with <br />
                these Terms.

            </p>

            <div>
            <section>
                <h2 className="font-semibold text-xl mb-2">
                    1. Use of services
                </h2>
                <ul className='list-disc list-inside space-y1'>
                    <li>
                        Eligibility:
                        <p className='mb-2'>
                            You must be at least 18 years old to use our services.
                        </p>
                        </li>

                        <li>
                            License:
                            <p className='mb-2'>
                                <strong>TEDTOOLS</strong> grants you a limited, non-exclusive, non-transferable license to use our free <br />
                                invoice generation tools for lawful purposes.
                            </p>
                        </li>

                        <li>
                            Prohibited Use: 
                            <p className='mb-2'>
                                You agree not to misuse the platform for fraudulent, illegal, or unauthorized <br />
                                purposes.
                            </p>
                        </li>
                </ul>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    2. Account & data
                </h2>
                <ul className='list-disc list-inside space-y-1'>
                    <li>
                        You are responsible for the accuracy of all information entered into the platform, including <br /> 
                        personal and business data.
                    </li>

                    <li>
                        Any content you generate using <strong>TEDTOOLS</strong> (such as invoices) is your sole responsibility.
                    </li>
                </ul>

            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    3. Fees & Payments
                </h2>
                <ul className='list-disc list-inside space-y-1'>
                    <li>
                        <strong>TEDTOOLS</strong> provides free invoice generation services. Should premium features be introduced, users will be informed in advance.
                    </li>
                </ul>
            </section>
            <br />

            <section>
               <h2 className='font-semibold text-xl mb-2'>
                4. Intellectual Property
                </h2> 
                <ul className='list-disc list-inside space-y-1'>
                    <li>
                        All content, design, and software on <strong>TEDTOOLS</strong> are the property of the company and are <br />
                        protected by applicable copyright and trademark laws.
                    </li>

                    <li>
                        You may not copy, modify, distribute, or reverse-engineer any part of our platform.
                    </li>

                </ul>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    5. Privacy
                </h2>
                <p className='mb-2'>
                    Your use of our platform is also governed by our Privacy Policy. Please review it to understand how <br /> 
                    we handle your data.
                </p>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    6. Third-Party links
                </h2>
                <p className='mb-2'>
                   Our website may contain links to third-party services. <strong>TEDTOOLS</strong> is not responsible for the content, <br />
                   policies, or practices of these external websites. 
                </p>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    7. Limitation of liability
                </h2>
                <ul className='list-disc list-inside space-y-1'>
                    <li>
                        <strong>TEDTOOLS</strong> provides services “as is” without warranties of any kind.
                    </li>

                    <li>
                        We are not liable for any direct, indirect, or incidental damages resulting from the use or inability <br /> 
                        to use our platform.
                    </li>
                </ul>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    8. Termination
                </h2>
                <p className='mb-2'>
                    We reserve the right to suspend or terminate access to our platform if you violate these Terms or <br />
                    engage in unlawful activities.
                </p>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    9. Changes to terms
                </h2>
                <p className='mb-2'>
                    We may update these Terms from time to time. Continued use of the platform after changes implies <br /> 
                your acceptance of the updated Terms.
                </p>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    10. Governing law
                </h2>
                <p className='mb-2'>
                    These Terms are governed by the laws of the <strong>United Arab Emirates (UAE)</strong> . Any disputes shall be <br /> 
                    resolved in the courts of the UAE.
                </p>
            </section>
            <br />

            <section>
                <h2 className='font-semibold text-xl mb-2'>
                    11. Contact us
                </h2>
                <p>
                    For questions or concerns regarding these Terms, contact us at: <br />
                    <strong>Email:</strong> <Link href="mailto:support@tedtools.com" className='text-blue-600 underline'>support@tedtools.com</Link>
                </p>
            </section>

             </div>
        </main>
    )
}