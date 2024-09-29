import React, { useState } from 'react';
import Image from "next/image";

export default function LowerInsurance() {
        
    return (
    <div >
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
          <div className="gap-10">
            <p className="text-5xl font-bold text-center">
              How to Lower Your Car Insurance Premium
            </p>
            <p className="text-xl text-center">
              If you need to save some money, we have you covered.
            </p>
          </div>
          
          <Image src="/logo.svg" alt="Logo" width={120} height={120} />
        </div>

        

        <div className="flex flex-col items-start p-8 pb-20 gap-12 sm:p-20 max-w-4xl mx-auto">     
          <ol className="list-decimal ml-4 space-y-4">
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