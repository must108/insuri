import React from "react";

export default function Terms() {
    return (
        <div className='max-w-4xl w-full mx-auto px-8 md:px-16 py-16'>
            <p className='mt-[8rem] text-3xl font-bold text-center'>
                Terms of Service
            </p>
            <div className='mt-8 space-y-6'>
                <section>
                    <h2 className='text-2xl font-semibold'>1. Introduction</h2>
                    <p>
                        Welcome to our generative AI-powered auto insurance claims website. By accessing or using our service, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our service.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>2. Use of Service</h2>
                    <p>
                        You must be at least 18 years old to use our service. You agree to use our service only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>3. Privacy Policy</h2>
                    <p>
                        Your use of our service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding your personal information.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>4. Intellectual Property</h2>
                    <p>
                        All content, features, and functionality on our service, including but not limited to text, graphics, logos, and software, are the exclusive property of our company and are protected by copyright, trademark, and other intellectual property laws.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>5. Limitation of Liability</h2>
                    <p>
                        Our service is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that our service will be uninterrupted or error-free. To the fullest extent permitted by law, we disclaim all warranties and will not be liable for any damages arising from the use of our service.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>6. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new terms on our website. Your continued use of our service after any changes constitutes your acceptance of the new terms.
                    </p>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold'>7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at support@example.com.
                    </p>
                </section>
            </div>

            <p className='mt-[10rem] text-3xl font-bold text-center'>
                Disclaimer
            </p>
            <div className='mt-8 space-y-6'>
                <section>
                    <h2 className='text-2xl font-semibold'>Disclaimer</h2>
                    <p>
                        This website is made for educational purposes as part of a hackathon project. It uses OpenAI technology to power its generative AI features. Please note that the information and services provided on this website are not intended for commercial use.
                    </p>
                    <p>
                        We collect public email addresses from Google and GitHub through authentication for the purpose of identifying users. We do not share this information with third parties.
                    </p>
                </section>
            </div>
        </div>
    );
}