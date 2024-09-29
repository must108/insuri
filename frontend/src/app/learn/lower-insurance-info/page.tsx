"use client";
import React, { useState, useRef} from 'react';
import Image from "next/image";

export default function LowerInsurance() {
    const nextSectionRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
      if (nextSectionRef.current) {
        // Scroll to the next section
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
    <div >
        <div className="flex flex-col items-center justify-between p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
          <div className="gap-10 flex-grow flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-center">
              How to Lower Your Car Insurance Premium
            </p>
            <p className="text-xl text-center">
              If you need to save some money, we have you covered.
            </p>
            
            <Image src="/logo.svg" alt="Logo" width={120} height={120} />
          </div>
          
          <div className="main__action mt-auto">
            <a className="main__scroll atype" href="#">
              <div className="main__scroll-box animate-bounce" onClick={handleScroll}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgba(28,28,30,1)">
                  </path>
              </svg>
              </div>

              <span className="main__scroll-text">Scroll</span>
            </a>
          </div>
        </div>

        

        <div ref={nextSectionRef} className="min-h-screen flex flex-col items-start p-8 pb-20 gap-12 sm:p-20 max-w-4xl mx-auto">     
          <ol className="list-decimal ml-4 space-y-4 mt-[4rem]">
            <li>
              <span className="font-bold">Shop Around</span>
              <p>Compare quotes from different companies to find the best rate.</p>
            </li>

            <li>
              <span className="font-bold">Raise Your Deductible</span>
              <p>A higher deductible can lower your premium but ensure you can afford it.</p>
            </li>

            <li>
              <span className="font-bold">Ask About Discounts</span>
              <p>Look for discounts for safe driving, good grades, safety features, or bundling policies.</p>
            </li>

            <li>
              <span className="font-bold">Drive Less</span>
              <p>Fewer miles driven can reduce your premium or consider a pay-per-mile policy.</p>
            </li>

            <li>
              <span className="font-bold">Maintain Good Credit</span>
              <p>A better credit score can lead to lower premiums.</p>
            </li>

            <li>
              <span className="font-bold">Keep a Clean Driving Record</span>
              <p>Avoid accidents and tickets to get better rates.</p>
            </li>

            <li>
              <span className="font-bold">Choose the Right Car</span>
              <p>Safer, affordable cars typically have lower insurance costs.</p>
            </li>

            <li>
              <span className="font-bold">Cut Unnecessary Coverage</span>
              <p>Drop coverage you don’t need, but ensure you meet state requirements.</p>
            </li>

            <li>
              <span className="font-bold">Improve Safety Features</span>
              <p>Install anti-theft devices and safety features to lower your premium.</p>
            </li>

            <li>
              <span className="font-bold">Bundle Policies</span>
              <p>Combine home and auto insurance for a discount.</p>
            </li>

            <li>
              <span className="font-bold">Pay Annually</span>
              <p>Paying your premium yearly can save on monthly fees.</p>
            </li>

            <li>
              <span className="font-bold">Review Regularly</span>
              <p>Reassess your policy yearly to adjust coverage and potentially lower costs.</p>
            </li>
          </ol>
        </div>
    </div>
    )
}