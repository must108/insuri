"use client";
import React, { useState, useRef } from 'react';
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
    <div>
      <div className="flex flex-col items-center justify-between p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
        <div className="gap-10 flex-grow flex flex-col items-center justify-center">
          <p className="text-5xl font-bold text-center">
            How to Lower Your Car Insurance Premium
          </p>
          <p className="text-xl text-center">
            Need to save some money? We've got you covered.
          </p>

          <Image src="/logo.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="main__action mt-auto">
          <a className="main__scroll atype" href="#">
            <div className="main__scroll-box animate-bounce" onClick={handleScroll}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgba(28,28,30,1)">
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
            <p>Compare quotes from different companies to find the best rate. Use online comparison tools to save time.</p>
          </li>

          <li>
            <span className="font-bold">Raise Your Deductible</span>
            <p>A higher deductible can lower your premium, but make sure you can afford it in case of an accident.</p>
          </li>

          <li>
            <span className="font-bold">Ask About Discounts</span>
            <p>Look for discounts for safe driving, good grades, safety features, or bundling policies. Many insurers offer student discounts!</p>
          </li>

          <li>
            <span className="font-bold">Drive Less</span>
            <p>Fewer miles driven can reduce your premium. Consider a pay-per-mile policy if you don't drive much.</p>
          </li>

          <li>
            <span className="font-bold">Maintain Good Credit</span>
            <p>A better credit score can lead to lower premiums. Pay your bills on time and keep your credit utilization low.</p>
          </li>

          <li>
            <span className="font-bold">Keep a Clean Driving Record</span>
            <p>Avoid accidents and tickets to get better rates. Safe driving can lead to significant discounts over time.</p>
          </li>

          <li>
            <span className="font-bold">Choose the Right Car</span>
            <p>Safer, affordable cars typically have lower insurance costs. Consider this when buying your next car.</p>
          </li>

          <li>
            <span className="font-bold">Cut Unnecessary Coverage</span>
            <p>Drop coverage you don’t need, but ensure you meet state requirements. For example, if your car is old, you might not need comprehensive coverage.</p>
          </li>

          <li>
            <span className="font-bold">Improve Safety Features</span>
            <p>Install anti-theft devices and safety features to lower your premium. Features like airbags, anti-lock brakes, and alarms can help.</p>
          </li>

          <li>
            <span className="font-bold">Bundle Policies</span>
            <p>Combine home and auto insurance for a discount. If you rent, consider bundling your renter's insurance with your car insurance.</p>
          </li>

          <li>
            <span className="font-bold">Pay Annually</span>
            <p>Paying your premium yearly can save on monthly fees. If you can afford it, this can be a great way to save money.</p>
          </li>

          <li>
            <span className="font-bold">Review Regularly</span>
            <p>Reassess your policy yearly to adjust coverage and potentially lower costs. Life changes like moving or getting married can affect your rates.</p>
          </li>
        </ol>
      </div>
    </div>
  )
}