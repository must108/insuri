import React, { useState } from 'react';
import Image from "next/image";

export default function LowerInsurance() {
        
    return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto mt-32">
        <div className="gap-10">
          <p className="text-5xl font-bold text-center">
            How to Lower Your Car Insurance Premium
          </p>
          <p className="text-xl text-center">
            If you need to save some money, we have you covered.
          </p>
        </div>

        <Image src="/logo.svg" alt="Logo" width={120} height={120} />

        <div className='w-128 text-left'> 
        <p>
            1. Shop Around<br />
            Compare quotes from different companies to find the best rate.<br />
            2. Raise Your Deductible<br />
            A higher deductible can lower your premium but ensure you can afford it.<br />
            3. Ask About Discounts<br />
            Look for discounts for safe driving, good grades, safety features, or bundling policies.<br />
            4. Drive Less<br />
            Fewer miles driven can reduce your premium or consider a pay-per-mile policy.<br />
            5. Maintain Good Credit<br />
            A better credit score can lead to lower premiums.<br />
            6. Keep a Clean Driving Record<br />
            Avoid accidents and tickets to get better rates.<br />
            7. Choose the Right Car<br />
            Safer, affordable cars typically have lower insurance costs.<br />
            8. Cut Unnecessary Coverage<br />
            Drop coverage you don’t need, but ensure you meet state requirements.<br />
            9. Improve Safety Features<br />
            Install anti-theft devices and safety features to lower your premium.<br />
            10. Bundle Policies<br />
            Combine home and auto insurance for a discount.<br />
            11. Pay Annually<br />
            Paying your premium yearly can save on monthly fees.<br />
            12. Review Regularly<br />
            Reassess your policy yearly to adjust coverage and potentially lower costs.<br />
        </p>
        </div>
    </div>
    )
}