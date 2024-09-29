import React, { useState } from 'react';
import Image from "next/image";

export default function CarAccident() {
        
    return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto mt-32">
        <div>
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
        
        <div className='w-128 text-left'>    
            <p>
                1. Stay Calm and Check for Injuries:<br />
                a- Breathe.<br />
                b- Check for injuries.<br />
                c- Call 911 if needed.<br />
                2. Move to Safety:<br />
                a- Turn on hazard lights.<br />
                b- If possible, move the car to a safe spot<br />
                3. Call for Help:<br />
                a- Report the accident to 911. <br />
                b- File a police report.<br />
                4. Exchange Info: <br />
                a- Get the other driver’s name, number, and insurance details.<br />
                5. Take Photos: <br />
                a- Capture pictures of the cars, damage, and the scene.<br />
                6. Don’t Admit Fault: <br />
                a- Avoid saying anything that could imply fault.<br />
                7. Call Your Insurance: <br />
                a- Report the accident to your insurer right away.<br />
                8. Get Medical Attention:<br />
                a- See a doctor even if you feel fine.<br />
                9. Keep Records: <br />
                a- Save all documents like reports, bills, and repair estimates.<br />
                10. Consider Legal Help: <br />
                a- Consult a lawyer if there are disputes or injuries.<br />
            </p>
        </div>  
    </div>
    )
}