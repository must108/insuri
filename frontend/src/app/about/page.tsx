import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

export function TeamCard({ name, role, linkedin, github, image }: { name: string, role: string, linkedin: string, github: string, image: string }) {
    return (
        <div className='flex flex-col gap-2 w-[16rem] p-4 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] transition-shadow duration-300 hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_8px_12px_-2px,_rgba(255,_255,_255,_0.1)_0px_2px_1px_inset]'>
            <Image src={image} alt={name} width={180} height={180} className="object-cover rounded-full aspect-square w-full p-4" />

            <div>
                <p className='text-xl font-bold'>{name}</p>
                <p className='text-lg opacity-60'>{role}</p>
            </div>

            <div className='flex flex-row gap-2'>
                <Link href={linkedin} target='_blank'>
                    <Icon icon='akar-icons:linkedin-fill' className='w-6 h-6 hover:scale-105 hover:rotate-2' />
                </Link>

                <Link href={github} target='_blank'>
                    <Icon icon='akar-icons:github-fill' className='w-6 h-6 hover:scale-105 hover:-rotate-2' />
                </Link>
            </div>

        </div>
    );
}

const team = [
	{
		name: "Noah Gerard",
		role: "Lead Fullstack Developer",
		linkedin: "https://www.linkedin.com/in/noah-gerard/",
		github: "https://github.com/noahgerard",
		image: "/team/noah.jpeg"
	},
	{
		name: "Mustaaen Ahmed",
		role: "Lead ML Engineer",
		linkedin: "https://www.linkedin.com/in/mustaeenahmed/",
		github: "https://github.com/must108",
		image: "/team/mustaaen.jpeg"
	},
	{
		name: "Lucca Carvalho Assuncao",
		role: "Frontend Developer",
		linkedin: "https://www.linkedin.com/in/luccaassuncao/",
		github: "https://github.com/luccaassuncao1",
		image: "/team/lucca.png"
	},
	{
		name: "Derian Comas",
		role: "Backend Developer",
		linkedin: "https://www.linkedin.com/in/deriancomas/",
		github: "https://github.com/dcomas1",
		image: "/team/derian.jpeg"
	}
]

export default function AboutPage() {
	return (
		<div className='max-w-4xl w-full mx-auto px-8 md:px-16'>
			<div className='w-fit mx-auto'>
				<p className='mt-[10rem] text-3xl font-bold p-8 sm:px-20'>
					Meet the Team
				</p>
				<div className="flex flex-col items-center justify-center px-8 pb-20 gap-12 sm:px-20 max-w-5xl mx-auto">
					<div className='grid md:grid-cols-2 gap-8 justify-items-center items-center'>
						{team.map((member, index) => (
							<TeamCard key={index} {...member} />
						))}
					</div>

				</div>
			</div>

		</div>

	);
}