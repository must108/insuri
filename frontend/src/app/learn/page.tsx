import React, { useState } from 'react';
import BeginnerButton from '../components/Buttons/BeginnerButton';
import CarAccidentInfoButton from '../components/Buttons/CarAccidentButton';
import LowerInsuranceButton from '../components/Buttons/LowerInsuranceButton';
import Image from "next/image";

export default function LearnPage() {
        
    return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
        <div className="gap-10">
          <p className="text-5xl font-bold text-center">
            Own Your Insurance Decisions
          </p>
          <p className="text-xl text-center">
          Step into the driver's seat of your insurance journey. Discover strategies to protect, save, and win in every situation.
          </p>
        </div>
        
        <div className="flex w-fit items-center justify-center gap-4 btn-primary">
            <BeginnerButton />
            <LowerInsuranceButton />
            <CarAccidentInfoButton />
        </div>

        <Image src="/logo.svg" alt="Logo" width={120} height={120} />
    </div>
    )
}