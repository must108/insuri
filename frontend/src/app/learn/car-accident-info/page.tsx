"use client";
import React, { useState, useRef } from 'react';
import Image from "next/image";

export default function CarAccident() {
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
            What to Do After a Car Accident: Essential Steps
          </p>
          <p className="text-xl text-center">
            Follow these steps to ensure your safety and protect your interests.
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
            <span className="font-bold">Stay Calm and Check for Injuries:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Take a deep breath to stay calm.</li>
              <li>Check yourself and passengers for injuries.</li>
              <li>Call 911 if there are any injuries or if the accident is serious.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Move to Safety:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Turn on your hazard lights to alert other drivers.</li>
              <li>If possible, move your vehicle to a safe location out of traffic.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Call for Help:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Report the accident to 911 and provide them with accurate information.</li>
              <li>Wait for the police to arrive and file a report.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Exchange Information:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Get the other driver’s name, phone number, and insurance details.</li>
              <li>Provide your information to the other driver as well.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Document the Scene:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Take clear photos of the vehicles, damages, and the accident scene.</li>
              <li>Note down the time, date, and location of the accident.</li>
              <li>Collect contact information from any witnesses.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Avoid Admitting Fault:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Do not admit fault or make statements that could be interpreted as admitting fault.</li>
              <li>Let the authorities and insurance companies determine fault.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Notify Your Insurance Company:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Report the accident to your insurance company as soon as possible.</li>
              <li>Provide them with all the necessary details and documentation.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Seek Medical Attention:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Visit a doctor even if you feel fine, as some injuries may not be immediately apparent.</li>
              <li>Follow up on any recommended treatments or check-ups.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Keep Detailed Records:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Save all documents related to the accident, including police reports, medical bills, and repair estimates.</li>
              <li>Keep a record of all communications with your insurance company.</li>
            </ol>
          </li>

          <li>
            <span className="font-bold">Consider Legal Assistance:</span>
            <ol className="list-[lower-alpha] ml-6 space-y-1">
              <li>Consult with a lawyer if there are disputes, significant damages, or injuries.</li>
              <li>Legal advice can help protect your rights and ensure fair compensation.</li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}