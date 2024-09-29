import React, { useState } from 'react';
import Image from "next/image";

export default function BeginnerGuide() {
        
    return (
    <div>
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
          <div className="gap-10">
            <p className="text-5xl font-bold text-center">
              Car Insurance 101: A Beginner's Guide
            </p>
            <p className="text-xl text-center">
              Your first stop shop for all things Insurance.
            </p>
          </div>
        
          <Image src="/logo.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="flex flex-col items-start p-8 pb-20 gap-12 sm:p-20 max-w-4xl mx-auto">  
        <ol className="list-decimal ml-4 space-y-4">
        <li>
          <span className="font-bold">What is Car Insurance?</span>
          <p>Car insurance is an agreement where you pay a premium, and the insurance company helps cover costs if your car is damaged, stolen, or you're in an accident.</p>
        </li>

        <li>
          <span className="font-bold">Why Do I Need Car Insurance?</span>
          <p>It’s legally required in most states. Without it, you could face fines, penalties, or lose your license.</p>
        </li>

        <li>
          <span className="font-bold">What Does Car Insurance Cover?</span>
          <ul className="list-disc ml-6 space-y-1">
            <li>Liability Insurance: Covers damage/injury to others if you're at fault.</li>
            <li>Collision Coverage: Helps repair your car after an accident, no matter who's at fault.</li>
            <li>Comprehensive Coverage: Covers theft, fire, or storm damage.</li>
            <li>Personal Injury Protection (PIP): Helps with medical expenses after an accident.</li>
            <li>Uninsured/Underinsured Motorist: Protects you if the other driver doesn’t have insurance.</li>
          </ul>
        </li>

        <li>
          <span className="font-bold">How Does Car Insurance Work?</span>
          <p>You pay a regular premium to keep your insurance, and when you file a claim, you pay a deductible before the insurance covers the rest.</p>
        </li>

        <li>
          <span className="font-bold">How Much Does Car Insurance Cost?</span>
          <p>It depends on:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Your age and driving history.</li>
            <li>The car you drive.</li>
            <li>Your coverage choices.</li>
            <li>Where you live.</li>
          </ul>
        </li>

        <li>
          <span className="font-bold">How Do I Choose the Right Coverage?</span>
          <p>First, meet your state’s minimum requirements, and then consider factors like your car’s value, budget, and driving habits.</p>
        </li>

        <li>
          <span className="font-bold">How Do I Buy Car Insurance?</span>
          <p>Through insurance agents or online directly from insurance companies.</p>
        </li>

        <li>
          <span className="font-bold">What Should I Do After I Buy Insurance?</span>
          <p>Carry your proof of insurance in your car and review your policy to understand what’s covered.</p>
        </li>

        <li>
          <span className="font-bold">What Happens if I Get in an Accident?</span>
          <p>You pay a deductible and your premium increases.</p>
        </li>
      </ol>
        </div>
    </div>
    )
}