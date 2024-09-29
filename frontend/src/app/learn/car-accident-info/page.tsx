import React, { useState } from 'react';
import Image from "next/image";

export default function CarAccident() {
        
    return (
    <div>
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
            <div className="gap-10">
            <p className="text-5xl font-bold text-center">
                What to Do After a Car Accident: Simple Steps
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
                <span className="font-bold">Stay Calm and Check for Injuries:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Breathe.</li>
                        <li>Check for injuries.</li>
                        <li>Call 911 if needed.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Move to Safety:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Turn on hazard lights.</li>
                        <li>If possible, move the car to a safe spot.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Call for Help:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Report the accident to 911.</li>
                        <li>File a police report.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Exchange Info:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Get the other driver’s name, number, and insurance details.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Take Photos:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Capture pictures of the cars, damage, and the scene.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Don’t Admit Fault:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Avoid saying anything that could imply fault.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Call Your Insurance:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Report the accident to your insurer right away.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Get Medical Attention:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>See a doctor even if you feel fine.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Keep Records:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Save all documents like reports, bills, and repair estimates.</li>
                    </ol>
                </li>

                <li>
                <span className="font-bold">Consider Legal Help:</span>
                    <ol className="list-[lower-alpha] ml-6 space-y-1">
                        <li>Consult a lawyer if there are disputes or injuries.</li>
                    </ol>
                </li>
            </ol>
        </div>  
    </div>
    )
}