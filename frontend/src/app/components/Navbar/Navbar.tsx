'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function LinkButton({ link, label }: { link: string, label: string }) {
	return <Link href={link}>
		<p className="hover:opacity-60 text-xs sm:text-sm ">{label}</p>
	</Link>
}

export default function Navbar() {
	return <>
		<div className="fixed w-full h-16 bg-[--background] flex">
			<div className="flex flex-row flex-1 max-w-5xl mx-auto p-2\4 justify-between px-4 sm:px-8 md:px-16 items-center">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={80} height={80} />
				</Link>

				<div className="flex flex-row gap-4 items-center">
					<LinkButton link="/learn" label="Learn" />
					<LinkButton link="/terms" label="Terms" />
					<LinkButton link="/my-claims" label="My Claims" />
					<LinkButton link="/about" label="About" />
				</div>

				<div className="">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<div className="block ml-8">
							<UserButton>
								<UserButton.UserProfilePage label="account" />
								<UserButton.UserProfilePage label="security" />
								<UserButton.MenuItems>
									<UserButton.Action label="signOut" />
									<UserButton.Action label="manageAccount" />
								</UserButton.MenuItems>
							</UserButton>
						</div>
					</SignedIn>
				</div>

			</div>
		</div>
	</>
}