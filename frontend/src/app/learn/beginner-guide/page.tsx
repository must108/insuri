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
        <p>
            1. What is Car Insurance? <br />
            Car insurance is an agreement where you pay a premium, and the insurance company helps cover costs if your car is damaged, stolen, or you're in an accident.<br />
            2. Why Do I Need Car Insurance?<br />
            It’s legally required in most states. Without it, you could face fines, penalties, or lose your license. <br />
            3. What Does Car Insurance Cover?<br />
            •	Liability Insurance: Covers damage/injury to others if you're at fault.<br />
            •	Collision Coverage: Helps repair your car after an accident, no matter who's at fault.<br />
            •	Comprehensive Coverage: Covers theft, fire, or storm damage.<br />
            •	Personal Injury Protection (PIP): Helps with medical expenses after an accident.<br />
            •	Uninsured/Underinsured Motorist: Protects you if the other driver doesn’t have insurance.<br />
            4. How Does Car Insurance Work?<br />
            You pay a regular premium to keep your insurance, when you file a claim you pay a deductible before and the insurance covers the rest.<br />
            5. How Much Does Car Insurance Cost?<br />
            It depends on:<br />
            •	Your age and driving history.<br />
            •	The car you drive.<br />
            •	Your coverage choices.<br />
            •	Where you live.<br />
            6. How Do I Choose the Right Coverage?<br />
            First meet your state’s minimum requirements, in addition consider factors like your car’s value, budget, and driving habits.<br />
            7. How Do I Buy Car Insurance?<br />
            Through insurance agents or online directly from insurance companies.<br />
            8. What Should I Do After I Buy Insurance?<br />
            Carry your proof of insurance in your car and review your policy to understand what’s covered.<br />
            9. What Happens if I Get in an Accident?<br />
            You pay a deductible and your premium increases.<br />
        </p>
        </div>
    </div>
    )
}