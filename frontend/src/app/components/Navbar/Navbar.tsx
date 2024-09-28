'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const DotIcon = () => {
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
		<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
	  </svg>
	)
  }

const CustomPage = () => {
	return (
		<div>
			<h1>Custom Profile Page</h1>
			<p>This is the custom profile page</p>
		</div>
	)
}

function LinkButton({ link, label }: { link: string, label: string }) {
	return <Link href={link}>
		<p className="hover:opacity-60">{label}</p>
	</Link>
}

export default function Navbar() {
	return <>
		<div className="fixed w-full h-16 bg-[--background] flex">
			<div className="flex flex-row flex-1 max-w-5xl mx-auto p-2\4 justify-evenly items-center">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={80} height={80} />
				</Link>

				<div className="flex flex-row gap-4 items-center">
					<LinkButton link="/about" label="About" />
					<LinkButton link="/terms" label="Terms" />
					<LinkButton link="/myclaims" label="My Claims" />
				</div>

				<div className="">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<div className="block">
							<UserButton>
								<UserButton.UserProfilePage label="Custom Page" url="custom" labelIcon={<DotIcon />}>
									<CustomPage />
								</UserButton.UserProfilePage>
								<UserButton.UserProfileLink label="Homepage" url="/" labelIcon={<DotIcon />} />
								<UserButton.UserProfilePage label="account" />
								<UserButton.UserProfilePage label="security" />
							</UserButton>
						</div>
					</SignedIn>
				</div>

			</div>
		</div>
	</>
}