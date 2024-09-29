import React, { useState } from 'react';
import BeginnerButton from '../components/Buttons/BeginnerButton';
import CarAccidentInfoButton from '../components/Buttons/CarAccidentButton';
import LowerInsuranceButton from '../components/Buttons/LowerInsuranceButton';
import Chatbot from "./Chatbot/Chatbot";

export default function LearnPage() {
        
    return (
    <div className="flex justify-center items-center min-h-screen gap-4 w-1/2 mx-auto">
        <BeginnerButton />
        <CarAccidentInfoButton />
        <LowerInsuranceButton />
        <Chatbot />
    </div>
    )
}