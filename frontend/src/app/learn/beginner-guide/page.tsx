"use client";
import React, { useState, useRef } from 'react';
import Image from "next/image";

export default function BeginnerGuide() {
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
            Car Insurance 101
          </p>
          <p className="text-xl text-center">
            Your go-to resource for understanding car insurance.
          </p>

          <Image src="/logo.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="main__action">
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

      <div ref={nextSectionRef} className="flex flex-col items-start p-8 pb-20 gap-12 sm:p-20 max-w-4xl mx-auto">
        <ol className="list-decimal ml-4 space-y-4">
          <li>
            <span className="font-bold">What is Car Insurance?</span>
            <p>Think of car insurance as a safety net. You pay a premium, and if something happens to your car—like an accident or theft—the insurance company helps cover the costs.</p>
          </li>

          <li>
            <span className="font-bold">Why Do I Need Car Insurance?</span>
            <p>It's not just a good idea; it's the law in most states. Without it, you could face fines, lose your license, or worse. Plus, it gives you peace of mind when you're driving to class or a weekend road trip.</p>
          </li>

          <li>
            <span className="font-bold">What Does Car Insurance Cover?</span>
            <ul className="list-disc ml-6 space-y-1">
              <li><span className="font-bold">Liability Insurance:</span> Covers damage/injury to others if you're at fault.</li>
              <li><span className="font-bold">Collision Coverage:</span> Helps repair your car after an accident, no matter who's at fault.</li>
              <li><span className="font-bold">Comprehensive Coverage:</span> Covers theft, fire, or storm damage.</li>
              <li><span className="font-bold">Personal Injury Protection (PIP):</span> Helps with medical expenses after an accident.</li>
              <li><span className="font-bold">Uninsured/Underinsured Motorist:</span> Protects you if the other driver doesn’t have insurance.</li>
            </ul>
          </li>

          <li>
            <span className="font-bold">How Does Car Insurance Work?</span>
            <p>You pay a regular premium to keep your insurance active. If you need to file a claim, you'll pay a deductible first, and then the insurance covers the rest.</p>
          </li>

          <li>
            <span className="font-bold">How Much Does Car Insurance Cost?</span>
            <p>It depends on several factors:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Your age and driving history.</li>
              <li>The car you drive.</li>
              <li>Your coverage choices.</li>
              <li>Where you live.</li>
            </ul>
            <p>As a college student, you might get discounts for good grades or being a safe driver.</p>
          </li>

          <li>
            <span className="font-bold">How Do I Choose the Right Coverage?</span>
            <p>First, meet your state’s minimum requirements. Then, think about your car’s value, your budget, and your driving habits. Do you drive a lot or just occasionally?</p>
          </li>

          <li>
            <span className="font-bold">How Do I Buy Car Insurance?</span>
            <p>You can buy car insurance through agents or directly online from insurance companies. Compare different options to find the best deal for you.</p>
          </li>

          <li>
            <span className="font-bold">What Should I Do After I Buy Insurance?</span>
            <p>Always carry your proof of insurance in your car. Review your policy to understand what’s covered and what’s not.</p>
          </li>

          <li>
            <span className="font-bold">What Happens if I Get in an Accident?</span>
            <p>First, make sure everyone is safe. Then, exchange information with the other driver and file a claim with your insurance company. You'll pay a deductible, and your premium might increase.</p>
          </li>
        </ol>

        <div className="mt-12">
          <h2 className="text-3xl font-bold">Key Terms to Know</h2>
          <ul className="list-disc ml-6 space-y-4 mt-4">
            <li>
              <span className="font-bold">Premium:</span> The amount you pay for your insurance policy, usually monthly or annually.
            </li>
            <li>
              <span className="font-bold">Deductible:</span> The amount you pay out of pocket before your insurance covers the rest.
            </li>
            <li>
              <span className="font-bold">Liability Insurance:</span> Covers damage or injury to others if you're at fault in an accident.
            </li>
            <li>
              <span className="font-bold">Collision Coverage:</span> Helps repair your car after an accident, regardless of who is at fault.
            </li>
            <li>
              <span className="font-bold">Comprehensive Coverage:</span> Covers non-collision-related incidents like theft, fire, or storm damage.
            </li>
            <li>
              <span className="font-bold">Personal Injury Protection (PIP):</span> Helps cover medical expenses for you and your passengers after an accident.
            </li>
            <li>
              <span className="font-bold">Uninsured/Underinsured Motorist:</span> Protects you if the other driver doesn’t have enough insurance.
            </li>
            <li>
              <span className="font-bold">Claim:</span> A request you make to your insurance company for payment after an incident.
            </li>
            <li>
              <span className="font-bold">Policy:</span> The contract between you and your insurance company detailing coverage, premiums, and deductibles.
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold">Next Steps</h2>
          <p>Ready to learn more? Check out these resources:</p>
          <ul className="list-disc ml-6 space-y-4 mt-4">
            <li>
              <a href="https://www.insureuonline.org/" target="_blank" rel="noopener noreferrer" className="link link-primary">Insure U</a> - Insurance information for consumers from the National Association of Insurance Commissioners.
            </li>
            <li>
              <a href="https://www.iii.org/" target="_blank" rel="noopener noreferrer" className="link link-primary">Insurance Information Institute</a> - Facts and statistics about insurance.
            </li>
            <li>
              <a href="https://www.consumerreports.org/cro/car-insurance.htm" target="_blank" rel="noopener noreferrer" className="link link-primary">Consumer Reports</a> - Car insurance buying guide.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}