import Image from "next/image";
import Link from "next/link";
import FileClaimButton from "./components/Buttons/FileClaimButton";
import LearnMoreButton from "./components/Buttons/LearnMoreButton";


import React from "react";



export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 md:pb-20 gap-8 md:gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">

        <div className="flex flex-col gap-4">
          <p className="text-3xl md:text-5xl font-bold text-center">
            Simplified Auto Insurance Claims
          </p>
          <p className="text-lg md:text-xl text-center">
            Streamline your auto insurance claims and master your insurance journey with our easy-to-use platform. Trust us to help you get back on the road faster.
          </p>
        </div>

        <div className="flex w-fit flex-wrap items-center justify-center gap-4 btn-primary">
          <FileClaimButton />
          <LearnMoreButton />
        </div>

        <Image src="/logo.svg" alt="Logo" width={120} height={120} />

      </div>

      <div className="bg-secondary flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 min-h-screen">
        
      </div>
    </div>

  );
}
